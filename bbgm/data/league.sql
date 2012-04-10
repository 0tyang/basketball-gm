CREATE TABLE league_conferences (
conference_id INTEGER PRIMARY KEY,
name VARCHAR(255));
INSERT INTO league_conferences (conference_id,name) VALUES(0,'Eastern Conference');
INSERT INTO league_conferences (conference_id,name) VALUES(1,'Western Conference');

CREATE TABLE league_divisions (
division_id INTEGER PRIMARY KEY,
conference_id INTEGER,
name VARCHAR(255));
INSERT INTO league_divisions (division_id,conference_id,name) VALUES(0,0,'Atlantic');
INSERT INTO league_divisions (division_id,conference_id,name) VALUES(1,0,'Central');
INSERT INTO league_divisions (division_id,conference_id,name) VALUES(2,0,'Southeast');
INSERT INTO league_divisions (division_id,conference_id,name) VALUES(3,1,'Southwest');
INSERT INTO league_divisions (division_id,conference_id,name) VALUES(4,1,'Northwest');
INSERT INTO league_divisions (division_id,conference_id,name) VALUES(5,1,'Pacific');

CREATE TABLE game_attributes (
team_id INTEGER,
season INTEGER,
phase INTEGER,
schedule TEXT,
games_in_progress BOOLEAN DEFAULT 0,
pm_status VARCHAR(255),
pm_phase VARCHAR(255),
pm_options TEXT,
version VARCHAR(255));
INSERT INTO game_attributes (team_id, season, phase, version) VALUES(3, 2012, 0, '2.0.0alpha');

CREATE TABLE player_attributes (
player_id INTEGER PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255),
team_id INTEGER,
position VARCHAR(2),
height INTEGER, -- inches
weight INTEGER, -- pounds
born_date INTEGER, -- YYYY for birth year
born_location VARCHAR(255), -- City, State/Country
college VARCHAR(255), -- or HS or country, if applicable
draft_year INTEGER,
draft_round INTEGER,
draft_pick INTEGER,
draft_team_id INTEGER,
contract_amount INTEGER,
contract_expiration INTEGER,
free_agent_times_asked FLOAT DEFAULT 0.0,
years_free_agent INTEGER DEFAULT 0);

CREATE TABLE released_players_salaries (
player_id INTEGER PRIMARY KEY,
team_id INTEGER,
contract_amount INTEGER,
contract_expiration INTEGER);

CREATE TABLE player_ratings (
player_id INTEGER PRIMARY KEY AUTO_INCREMENT,
roster_position INTEGER,
overall INTEGER,
height INTEGER,
strength INTEGER,
speed INTEGER,
jumping INTEGER,
endurance INTEGER,
shooting_inside INTEGER,
shooting_layups INTEGER,
shooting_free_throws INTEGER,
shooting_two_pointers INTEGER,
shooting_three_pointers INTEGER,
blocks INTEGER,
steals INTEGER,
dribbling INTEGER,
passing INTEGER,
rebounding INTEGER,
potential INTEGER);

CREATE TABLE player_stats (
player_id INTEGER,
team_id INTEGER,
game_id INTEGER,
season INTEGER,
is_playoffs BOOLEAN,
starter INTEGER,
minutes INTEGER,
field_goals_made INTEGER,
field_goals_attempted INTEGER,
three_pointers_made INTEGER,
three_pointers_attempted INTEGER,
free_throws_made INTEGER,
free_throws_attempted INTEGER,
offensive_rebounds INTEGER,
defensive_rebounds INTEGER,
assists INTEGER,
turnovers INTEGER,
steals INTEGER,
blocks INTEGER,
personal_fouls INTEGER,
points INTEGER);

-- team_attributes is created in league.py by copying teams from core.sql

CREATE TABLE team_stats (
team_id INTEGER,
opponent_team_id INTEGER,
game_id INTEGER,
season INTEGER,
is_playoffs BOOLEAN,
won BOOLEAN,
home BOOLEAN,
minutes INTEGER,
field_goals_made INTEGER,
field_goals_attempted INTEGER,
three_pointers_made INTEGER,
three_pointers_attempted INTEGER,
free_throws_made INTEGER,
free_throws_attempted INTEGER,
offensive_rebounds INTEGER,
defensive_rebounds INTEGER,
assists INTEGER,
turnovers INTEGER,
steals INTEGER,
blocks INTEGER,
personal_fouls INTEGER,
points INTEGER,
opponent_points INTEGER,
attendance INTEGER,
cost INTEGER);

CREATE TABLE active_playoff_series (
series_id INTEGER,
series_round INTEGER,
team_id_home INTEGER,
team_id_away INTEGER,
seed_home INTEGER,
seed_away INTEGER,
won_home INTEGER,
won_away INTEGER);

CREATE TABLE draft_results (
season INTEGER,
draft_round INTEGER,
pick INTEGER,
team_id INTEGER,
abbreviation VARCHAR(3),
player_id INTEGER,
name VARCHAR(255),
position VARCHAR(2),
born_date INTEGER, -- YYYY for birth year
overall INTEGER,
potential INTEGER);

CREATE INDEX a ON team_attributes(team_id, season, division_id, region);
CREATE INDEX b ON player_stats(player_id, season, is_playoffs);
CREATE INDEX c ON team_attributes(season, division_id, won, lost);
CREATE INDEX d ON player_stats(player_id, game_id, team_id, starter, minutes);
CREATE INDEX e ON team_stats(team_id, season);
CREATE INDEX f ON team_stats(game_id, team_id);
CREATE INDEX g ON player_ratings(player_id, overall);
CREATE INDEX h ON player_attributes(player_id, team_id);
CREATE INDEX i ON league_divisions(conference_id);
CREATE INDEX j ON active_playoff_series(series_id, series_round);
CREATE INDEX k ON released_players_salaries(team_id);

