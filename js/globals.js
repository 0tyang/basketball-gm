var g = {};

g.startingSeason = 2012;
g.ticketPrice = 45;
g.numTeams = 30;
g.confs = [{cid: 0, name: "Eastern Conference"}, {cid: 1, name: "Western Conference"}];
g.divs = [{did: 0, cid: 0, name: "Atlantic"}, {did: 1, cid: 0, name: "Central"}, {did: 2, cid: 0, name: "Southeast"}, {did: 3, cid: 1, name: "Southwest"}, {did: 4, cid: 1, name: "Northwest"}, {did: 5, cid: 1, name: "Pacific"}];


var c = {};

c.PHASE_PRESEASON = 0;
c.PHASE_REGULAR_SEASON = 1;
c.PHASE_AFTER_TRADE_DEADLINE = 2;
c.PHASE_PLAYOFFS = 3;
c.PHASE_BEFORE_DRAFT = 4;
c.PHASE_DRAFT = 5;
c.PHASE_AFTER_DRAFT = 6;
c.PHASE_RESIGN_PLAYERS = 7;
c.PHASE_FREE_AGENCY = 8;

c.PLAYER_FREE_AGENT = -1;
c.PLAYER_UNDRAFTED = -2;
c.PLAYER_RETIRED = -3;
