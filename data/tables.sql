CREATE TABLE league_conferences (
conference_id INTEGER PRIMARY KEY,
name TEXT);

CREATE TABLE league_divisions (
division_id INTEGER PRIMARY KEY,
conference_id INTEGER,
name TEXT);

CREATE TABLE game_attributes (
team_id INTEGER,
season INTEGER,
phase INTEGER,
schedule TEXT,
version TEXT);
INSERT INTO "game_attributes" (team_id, season, phase, version) VALUES(3, 2011, 0, '1.0.0alpha');

CREATE TABLE player_attributes (
player_id INTEGER PRIMARY KEY,
name TEXT,
team_id INTEGER,
position TEXT,
height INTEGER, -- inches
weight INTEGER, -- pounds
born_date INTEGER, -- YYYY for birth year
born_location TEXT, -- City, State/Country
college TEXT, -- or HS or country, if applicable
draft_year INTEGER,
draft_round INTEGER,
draft_pick INTEGER,
draft_team_id INTEGER,
contract_amount INTEGER,
contract_expiration INTEGER,
free_agent_times_asked INTEGER DEFAULT 0,
years_free_agent INTEGER DEFAULT 0);

CREATE TABLE released_players_salaries (
player_id INTEGER PRIMARY KEY,
team_id INTEGER,
contract_amount INTEGER,
contract_expiration INTEGER);

CREATE TABLE player_ratings (
player_id INTEGER PRIMARY KEY,
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

CREATE TABLE team_attributes (
ind INTEGER PRIMARY KEY,
team_id INTEGER,
division_id INTEGER,
region TEXT,
name TEXT,
abbreviation TEXT,
season INTEGER,
won REAL DEFAULT 0,
lost REAL DEFAULT 0,
won_div INTEGER DEFAULT 0,
lost_div INTEGER DEFAULT 0,
won_conf INTEGER DEFAULT 0,
lost_conf INTEGER DEFAULT 0,
cash INTEGER DEFAULT 0,
playoffs BOOLEAN DEFAULT 0,
won_conference BOOLEAN DEFAULT 0,
won_championship BOOLEAN DEFAULT 0);

CREATE TABLE team_stats (
team_id INTEGER,
opponent_team_id INTEGER,
game_id INTEGER,
season INTEGER,
is_playoffs BOOLEAN,
won BOOLEAN,
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

CREATE TABLE enum_w_l (
key INTEGER,
val TEXT);
INSERT INTO "enum_w_l" VALUES(0,'L');
INSERT INTO "enum_w_l" VALUES(1,'W');

CREATE TABLE active_playoff_series (
series_id INTEGER,
series_round INTEGER,
team_id_home INTEGER,
team_id_away INTEGER,
seed_home INTEGER,
seed_away INTEGER,
won_home INTEGER,
won_away INTEGER);

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

