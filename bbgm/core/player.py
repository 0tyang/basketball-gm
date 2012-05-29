# -*- coding: utf-8 -*-
import csv
import random
import re
import string

from flask import g

from bbgm import app
from bbgm.util import fast_random
import bbgm.util.const as c

class Player:
    def load(self, pid):
        self.id = pid

        r = g.dbex('SELECT * FROM player_ratings WHERE pid = :pid AND season = :season', pid=pid, season=g.season)
        self.rating = dict(r.fetchone())
        r = g.dbex('SELECT * FROM player_attributes WHERE pid = :pid', pid=pid)
        self.attribute = dict(r.fetchone())

    def save(self):
        query = 'UPDATE player_ratings SET overall = :overall, hgt = :hgt, stre = :stre, spd = :spd, jmp = :jmp, end = :end, ins = :ins, dnk = :dnk, ft = :ft, fg = :fg, tp = :tp, blk = :blk, stl = :stl, drb = :drb, pss = :pss, reb = :reb, pot = :pot WHERE pid = :pid AND season = :season'
        g.dbex(query, overall=self.overall_rating(), hgt=self.rating['hgt'], stre=self.rating['stre'], spd=self.rating['spd'], jmp=self.rating['jmp'], end=self.rating['end'], ins=self.rating['ins'], dnk=self.rating['dnk'], ft=self.rating['ft'], fg=self.rating['fg'], tp=self.rating['tp'], blk=self.rating['blk'], stl=self.rating['stl'], drb=self.rating['drb'], pss=self.rating['pss'], reb=self.rating['reb'], pot=self.rating['pot'], pid=self.id, season=g.season)

    def develop(self, years=1):
        # Make sure age is always defined
        if not hasattr(g, 'season'):
            age = g.starting_season - self.attribute['born_year']
        else:
            age = g.season - self.attribute['born_year']

        for i in range(years):
            age += 1
            pot = fast_random.gauss(self.rating['pot'], 5)
            overall = self.overall_rating()

            for key in ('stre', 'spd', 'jmp', 'end', 'ins', 'dnk', 'ft', 'fg', 'tp', 'blk', 'stl', 'drb', 'pss', 'reb'):
                plus_minus = 28 - age
                if plus_minus > 0:
                    if pot > overall:
                        # Cap potential growth
                        if pot - overall < 20:
                            plus_minus *= (pot - overall) / 20.0 + 0.5
                        else:
                            plus_minus *= 1.5
                    else:
                        plus_minus *= 0.5
                else:
                    plus_minus *= 30.0 / pot
                increase = fast_random.gauss(1, 2) * plus_minus
                #increase = plus_minus
                self.rating[key] += increase
                self.rating[key] = self._limit_rating(self.rating[key])

            # Update potential
            overall = self.overall_rating()
            self.rating['pot'] += -2 + int(fast_random.gauss(0, 2))
            if overall > self.rating['pot'] or age > 28:
                self.rating['pot'] = overall

    def bonus(self, amount):
        """Add or subtract from all ratings"""

        for key in ('stre', 'spd', 'jmp', 'end', 'ins', 'dnk', 'ft', 'fg', 'tp', 'blk', 'stl', 'drb', 'pss', 'reb', 'pot'):
            self.rating[key] = self._limit_rating(self.rating[key] + amount)

    def _limit_rating(self, rating):
        if rating > 100:
            return 100
        elif rating < 0:
            return 0
        else:
            return int(rating)

    def overall_rating(self):
        return (self.rating['hgt'] + self.rating['stre'] + self.rating['spd'] + self.rating['jmp'] + self.rating['end'] + self.rating['ins'] + self.rating['dnk'] + self.rating['ft'] + self.rating['fg'] + self.rating['tp'] + self.rating['blk'] + self.rating['stl'] + self.rating['drb'] + self.rating['pss'] + self.rating['reb']) / 15

    def contract(self, randomize_expiration = False):
        # Limits on yearly contract amount, in $1000's
        min_amount = 500
        max_amount = 20000

        overall = self.overall_rating()
        # Scale amount from 500k to 15mil, proportional to (overall*2 + pot)*0.5 120-210
        amount = ((2.0 * overall + self.rating['pot']) * 0.85 - 120) / (210 - 120)  # Scale from 0 to 1 (approx)
        amount = amount * (max_amount - min_amount) + min_amount  # Scale from 500k to 15mil
        amount *= fast_random.gauss(1, 0.1)  # Randomize

        # Expiration
        # Players with high potentials want short contracts
        potential_difference = round((self.rating['pot'] - overall) / 4.0)
        years = 5 - potential_difference
        if years < 2:
            years = 2
        # Bad players can only ask for short deals
        if self.rating['pot'] < 40:
            years = 1
        elif self.rating['pot'] < 50:
            years = 2
        elif self.rating['pot'] < 60:
            years = 3

        # Randomize expiration for contracts generated at beginning of new game
        if randomize_expiration:
            years = random.randrange(1, years+1)


        if not hasattr(g, 'season'):
            expiration = g.starting_season + years - 1
        else:
            expiration = g.season + years - 1
        if amount < min_amount:
            amount = min_amount
        elif amount > max_amount:
            amount = max_amount
        else:
            amount = 50 * round(amount / 50.0)  # Make it a multiple of 50k

        return amount, expiration

    def add_to_free_agents(self, phase=None):
        """Adds a player to the free agents list.

        This should be THE ONLY way that players are added to the free agents
        list, because this will also calculate their demanded contract. But
        currently, the free agents generated at the beginning of the game don't
        use this function.
        """
        if phase == None:
            phase = g.phase

        # Player's desired contract
        amount, expiration = self.contract()

        # During regular season, or before season starts, allow contracts for
        # just this year.
        if g.phase > c.PHASE_AFTER_TRADE_DEADLINE:
            expiration += 1

        g.dbex('UPDATE player_attributes SET tid = :tid, contract_amount = :contract_amount, contract_expiration = :contract_expiration, free_agent_times_asked = 0 WHERE pid = :pid', tid=c.PLAYER_FREE_AGENT, contract_amount=amount, contract_expiration=expiration, pid=self.id)

    def release(self):
        """Release player.

        This keeps track of what the player's current team owes him, and then
        calls add_to_free_agents.
        """

        # Keep track of player salary even when he's off the team
        r = g.dbex('SELECT contract_amount, contract_expiration, tid FROM player_attributes WHERE pid = :pid', pid=self.id)
        contract_amount, contract_expiration, tid = r.fetchone()
        g.dbex('INSERT INTO released_players_salaries (pid, tid, contract_amount, contract_expiration) VALUES (:pid, :tid, :contract_amount, :contract_expiration)', pid=self.id, tid=tid, contract_amount=contract_amount, contract_expiration=contract_expiration)

        self.add_to_free_agents()


class GeneratePlayer(Player):
    '''
    Class to generate random players
    self.attributes: row to insert in the player_attributes table
    self.ratings: row to insert in the player_ratings table
    '''

    def __init__(self):
        # First name data
        fn_reader = csv.reader(app.open_resource('data/first_names.txt'))
        self.fn_data = []
        for row in fn_reader:
            self.fn_data.append(row)

        # Last name data (This data has been truncated to make the file smaller)
        ln_reader = csv.reader(app.open_resource('data/last_names.txt'))
        self.ln_data = []
        for row in ln_reader:
            self.ln_data.append(row)

        # Nationality data
        nat_reader = csv.reader(app.open_resource('data/nationalities.txt'))
        self.nat_data = []
        for row in nat_reader:
            self.nat_data.append(row)
        self.nat_max = 100

    def new(self, pid, tid, age, profile, base_rating, pot, draft_year, player_nat=""):
        self.id = pid

        self.rating = {}
        self.rating['pot'] = pot
        self.attribute = {}
        self.attribute['tid'] = tid
        self.attribute['roster_order'] = pid
        self.attribute['draft_year'] = draft_year
        self.generate_ratings(profile, base_rating)
        self.generate_attributes(age, player_nat)

    def develop(self, years=1):
        """Develop and age a player.

        This just calls Player.develop and then adds the appropriate number of
        years to the player's born_year.
        """
        Player.develop(self, years)
        if not hasattr(g, 'season'):
            age = g.starting_season - self.attribute['born_year'] + years
            self.attribute['born_year'] = g.starting_season - age
        else:
            age = g.season - self.attribute['born_year'] + years
            self.attribute['born_year'] = g.season - age

    def generate_ratings(self, profile, base_rating):
        if profile == 'Point':
            profile_id = 1
        elif profile == 'Wing':
            profile_id = 2
        elif profile == 'Big':
            profile_id = 3
        else:
            profile_id = 0

        # Each row should sum to ~150
        profiles = [[10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10],  # Base 
                    [-30, -10, 40,  15,  0,   0,   0,   10,  15,  0,   0,   20,  40,  40,  0],   # Point Guard
                    [10,  10,  15,  15,  0,   0,   25,  15,  15,  5,   0,   10,  15,  0,   15],  # Wing
                    [40,  30,  -10, -10, 10,  30,  30,  0,   -10, -20, 30,  0,   -10, -10, 30]]  # Big
        sigmas = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
        base_rating = fast_random.gauss(base_rating, 5)

        ratings = profiles[profile_id]
        for i in range(len(ratings)):
            ratings[i] += base_rating

        ratings = map(fast_random.gauss, ratings, sigmas)
        ratings = map(self._limit_rating, ratings)

        i = 0
        for key in ('hgt', 'stre', 'spd', 'jmp', 'end', 'ins', 'dnk', 'ft', 'fg', 'tp', 'blk', 'stl', 'drb', 'pss', 'reb'):
            self.rating[key] = ratings[i]
            i += 1

    # Call generate_ratings before this method!
    def generate_attributes(self, age, player_nat):
        min_hgt = 71  # 5'11"
        max_hgt = 89  # 7'5"
        min_weight = 150
        max_weight = 290

        self.attribute['pos'] = self._pos()  # Position (PG, SG, SF, PF, C, G, GF, FC)
        self.attribute['hgt'] = int(fast_random.gauss(1, 0.02) * (self.rating['hgt'] * (max_hgt - min_hgt) / 100 + min_hgt))  # Height in inches (from min_hgt to max_hgt)
        self.attribute['weight'] = int(fast_random.gauss(1, 0.02) * ((self.rating['hgt'] + 0.5 * self.rating['stre']) * (max_weight - min_weight) / 150 + min_weight))  # Weight in pounds (from min_weight to max_weight)
        if not hasattr(g, 'season'):
            self.attribute['born_year'] = g.starting_season - age
        else:
            self.attribute['born_year'] = g.season - age

        #If the nationality isn't given, randomly choose one.	
        if player_nat == "":
            nationality_rand = random.uniform(0, self.nat_max)
            for row in self.nat_data:
                if float(row[2]) >= nationality_rand:
                    break
            nationality = row[0]
            self.fn_max = float(row[4])
            self.ln_max = float(row[5])
        else:
            nationality = player_nat
            for row in self.nat_data:
                if row[0].upper() == nationality.upper():
                    break
            self.fn_max = float(row[4])
            self.ln_max = float(row[5])

        self.attribute['born_location'] = nationality
        self.attribute['name'] = self._name(nationality)        

        self.attribute['college'] = 0
        self.attribute['draft_round'] = 0
        self.attribute['draft_pick'] = 0
        self.attribute['draft_tid'] = 0
        self.attribute['contract_amount'], self.attribute['contract_expiration'] = self.contract()

    def _name(self, nationality):
        # First name
        fn_rand = random.uniform(0, self.fn_max)
        for row in self.fn_data:
            if row[4].upper() == nationality.upper():
                if float(row[2]) >= fn_rand:
                    break
        fn = string.capitalize(row[0])

        # Last name
        ln_rand = random.uniform(0, self.ln_max)
        for row in self.ln_data:
            if row[4].upper() == nationality.upper():
                if float(row[2]) >= ln_rand:
                #   if (random.random() < 0.3):  # This is needed because there are some duplicate CDF's in last_names.txt
                    break
        ln = string.capitalize(row[0])
        # McWhatever
        if len(ln) > 3:
            ln = re.sub('^Mc(\w)', 'Mc' + ln[2].upper(), ln)

        return '%s %s' % (fn, ln)

    def _pos(self):
        '''
        Assign a position (PG, SG, SF, PF, C, G, GF, FC) based on ratings
        '''
        g = False
        pg = False
        sg = False
        sf = False
        pf = False
        c = False

        # Default position
        if self.rating['drb'] >= 50:
            pos = 'GF'
        else:
            pos = 'F'

        if self.rating['hgt'] <= 30 or self.rating['spd'] >= 85:
            g = True
            if (self.rating['pss'] + self.rating['drb']) >= 100:
                pg = True
            if self.rating['hgt'] >= 30:
                sg = True
        if self.rating['hgt'] >= 50 and self.rating['hgt'] <= 65 and self.rating['spd'] >= 40:
            sf = True
        if self.rating['hgt'] >= 70:
            pf = True
        if (self.rating['hgt'] + self.rating['stre']) >= 130:
            c = True

        if pg and not sg and not sf and not pf and not c:
            pos = 'PG'
        elif not pg and (g or sg) and not sf and not pf and not c:
            pos = 'SG'
        elif not pg and not sg and sf and not pf and not c:
            pos = 'SF'
        elif not pg and not sg and not sf and pf and not c:
            pos = 'PF'
        elif not pg and not sg and not sf and not pf and c:
            pos = 'C'

        # Multiple poss
        if (pf or sf) and g:
            positon = 'GF'
        elif c and (pf or sf):
            pos = 'FC'
        elif pg and sg:
            pos = 'G'

        if pos is 'F' and self.rating['drb'] <= 20:
            pos = 'PF'

        return pos

    def get_attributes(self):
        d = self.attribute
        d['pid'] = self.id
        return d

    def get_ratings(self):
        d = self.rating
        if not hasattr(g, 'season'):
            d['season'] = g.starting_season
        else:
            d['season'] = g.season
        d['overall'] = self.overall_rating()
        d['pid'] = self.id
        return d
