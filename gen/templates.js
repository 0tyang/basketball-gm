(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['boxScore'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, self=this, escapeExpression=this.escapeExpression, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n  <h3><a href=\"/l/"
    + escapeExpression(((stack1 = depth1.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = depth0.abbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = ((stack1 = depth1.game),stack1 == null || stack1 === false ? stack1 : stack1.season)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.region),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></h2>\n  <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\">\n  <thead>\n    <tr><th>Name</th><th>Pos</th><th>Min</th><th>FG</th><th>3Pt</th><th>FT</th><th>Off</th><th>Reb</th><th>Ast</th><th>TO</th><th>Stl</th><th>Blk</th><th>PF</th><th>Pts</th></tr>\n  </thead>\n  <tbody>\n  ";
  stack2 = ((stack1 = ((stack1 = depth0.players),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </tbody>\n  <tfoot>\n    <tr><td>Total</td><td></td><td>"
    + escapeExpression(((stack1 = depth0.min),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.fg),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = depth0.fga),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.tp),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = depth0.tpa),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.ft),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = depth0.fta),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.orb),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.trb),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.ast),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.tov),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.stl),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.blk),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.pf),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.pts),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td></tr>\n  </tfoot>\n  </table>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <tr";
  stack1 = helpers['if'].call(depth0, depth0.separator, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><td>"
    + escapeExpression(helpers.playerNameLabels.call(depth0, depth0.pid, depth0.name, depth0.injury, depth0.skills, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.pos),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.min, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.fg),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = depth0.fga),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.tp),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = depth0.tpa),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.ft),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = depth0.fta),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.orb),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.trb),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.ast),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.tov),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.stl),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.blk),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.pf),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.pts),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td></tr>\n  ";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return " class=\"separator\"";
  }

  buffer += "<h2><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.game),stack1 == null || stack1 === false ? stack1 : stack1.won)),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = ((stack1 = depth0.game),stack1 == null || stack1 === false ? stack1 : stack1.season)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.game),stack1 == null || stack1 === false ? stack1 : stack1.won)),stack1 == null || stack1 === false ? stack1 : stack1.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.game),stack1 == null || stack1 === false ? stack1 : stack1.won)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a> "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.game),stack1 == null || stack1 === false ? stack1 : stack1.won)),stack1 == null || stack1 === false ? stack1 : stack1.pts)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ", <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.game),stack1 == null || stack1 === false ? stack1 : stack1.lost)),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = ((stack1 = depth0.game),stack1 == null || stack1 === false ? stack1 : stack1.season)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.game),stack1 == null || stack1 === false ? stack1 : stack1.lost)),stack1 == null || stack1 === false ? stack1 : stack1.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.game),stack1 == null || stack1 === false ? stack1 : stack1.lost)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a> "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.game),stack1 == null || stack1 === false ? stack1 : stack1.lost)),stack1 == null || stack1 === false ? stack1 : stack1.pts)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(((stack1 = depth0.overtime),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h2>\n";
  stack2 = ((stack1 = ((stack1 = ((stack1 = depth0.game),stack1 == null || stack1 === false ? stack1 : stack1.teams)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n";
  return buffer;
  });
templates['draftSummary'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <option value=\""
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  stack2 = helpers['if'].call(depth0, depth0.selected, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " season</option>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";
  }

  buffer += "<form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/draft\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"draft-select-season\" name=\"season\" class=\"season\">\n    ";
  stack2 = ((stack1 = ((stack1 = depth0.seasons),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </select>\n</form>\n\n<h1>Draft Summary "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n<p>\n  <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"draft-results\">\n  <thead>\n    <tr><th colspan=\"3\"></th><th colspan=\"5\" style=\"text-align: center\">At Draft</th><th colspan=\"5\" style=\"text-align: center\">Current</th><th colspan=\"5\" style=\"text-align: center\">Career Stats</th></tr>\n    <tr><th>Pick</th><th>Name</th><th title=\"Position\">Pos</th><th>Team</th><th>Age</th><th title=\"Overall rating\">Ovr</th><th title=\"Potential rating\">Pot</th><th>Skills</th><th>Team</th><th>Age</th><th title=\"Overall rating\">Ovr</th><th title=\"Potential rating\">Pot</th><th>Skills</th><th title=\"Games Played\">GP</th><th title=\"Minutes Per Game\">Min</th><th title=\"Points Per Game\">PPG</th><th title=\"Rebounds Per Game\">Reb</th><th title=\"Assists Per Game\">Ast</th><th title=\"Player Efficiency Rating\">PER</th></tr>\n  </thead>\n  </table>\n</p>\n";
  return buffer;
  });
templates['leagueLayout'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"contentwrapper\">\n  <div id=\"league_content\" data-id=\"\">\n  </div>\n</div>\n\n<div id=\"league_menu\" data-lid=\""
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n  <div class=\"well sidebar-nav\">\n    <ul class=\"nav nav-list\" id=\"league_sidebar\">\n      <li id=\"nav_league_dashboard\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">Dashboard</a></li>\n      <li id=\"nav_inbox\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/inbox\">Inbox</a></li>\n      <li class=\"nav-header\">League</li>\n      <li id=\"nav_standings\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/standings\">Standings</a></li>\n      <li id=\"nav_playoffs\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/playoffs\">Playoffs</a></li>\n      <li id=\"nav_league_finances\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/league_finances\">Finances</a></li>\n      <li id=\"nav_history\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/history\">History</a></li>\n      <li class=\"nav-header\">Team</li>\n      <li id=\"nav_roster\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster\">Roster</a></li>\n      <li id=\"nav_schedule\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/schedule\">Schedule</a></li>\n      <li id=\"nav_team_finances\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/team_finances\">Finances</a></li>\n      <li id=\"nav_team_history\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/team_history\">History</a></li>\n      <li class=\"nav-header\">Players</li>\n      <li id=\"nav_free_agents\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/free_agents\">Free Agents</a></li>\n      <li id=\"nav_trade\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/trade\">Trade</a></li>\n      <li id=\"nav_draft\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/draft\">Draft</a></li>\n      <li class=\"nav-header\">Stats</li>\n      <li id=\"nav_game_log\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/game_log\">Game Log</a></li>\n      <li id=\"nav_leaders\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/leaders\">League Leaders</a></li>\n      <li id=\"nav_player_ratings\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player_ratings\">Player Ratings</a></li>\n      <li id=\"nav_player_stats\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player_stats\">Player Stats</a></li>\n      <li id=\"nav_team_stats\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/team_stats\">Team Stats</a></li>\n    </ul>\n  </div>\n</div>\n";
  return buffer;
  });
templates['freeAgents'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<h1>Free Agents "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n\n<p>You currently have <strong>$"
    + escapeExpression(helpers.round.call(depth0, depth0.capSpace, {hash:{},data:data}))
    + "M</strong> in cap space. <i class=\"icon-question-sign\" id=\"help-salary-cap\" data-placement=\"bottom\"></i></p>\n\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"free-agents\">\n<thead>\n  <tr><th>Name</th><th title=\"Position\">Pos</th><th>Age</th><th title=\"Overall\">Ovr</th><th title=\"Potential\">Pot</th><th title=\"Minutes Per Game\">Min</th><th title=\"Points Per Game\">Pts</th><th title=\"Rebounds Per Game\">Reb</th><th title=\"Assists Per Game\">Ast</th><th title=\"Player Efficiency Rating\">PER</th><th>Asking for</th><th>Negotiate</th></tr>\n</thead>\n</table>\n";
  return buffer;
  });
templates['leaders'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <option value=\""
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  stack2 = helpers['if'].call(depth0, depth0.selected, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " season</option>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";
  }

function program4(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, depth0.newRow, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <div class=\"span4\">\n      <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed leaders\">\n      <thead>\n        <tr><th>"
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th><th title=\""
    + escapeExpression(((stack1 = depth0.title),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.stat),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th></tr>\n      </thead>\n      <tbody>\n        ";
  stack2 = ((stack1 = ((stack1 = depth0.data),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program7, data, depth1),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </tbody>\n      </table>\n    </div>\n  ";
  return buffer;
  }
function program5(depth0,data) {
  
  
  return "\n</div>\n<p></p>\n<div class=\"row-fluid\">\n    ";
  }

function program7(depth0,data,depth2) {
  
  var buffer = "", stack1;
  buffer += "\n          <tr";
  stack1 = helpers['if'].call(depth0, depth0.userTeam, {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><td>"
    + escapeExpression(((stack1 = depth0['i']),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ". "
    + escapeExpression(helpers.playerNameLabels.call(depth0, depth0.pid, depth0.name, depth0.injury, ((stack1 = depth0.ratings),stack1 == null || stack1 === false ? stack1 : stack1.skills), {hash:{},data:data}))
    + ", <a href=\"/l/"
    + escapeExpression(((stack1 = depth2.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = depth0.abbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = depth2.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.abbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.stat, 1, {hash:{},data:data}))
    + "</tr>\n        ";
  return buffer;
  }
function program8(depth0,data) {
  
  
  return " class=\"alert-info\"";
  }

  buffer += "<form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/leaders\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"leaders-select-season\" name=\"season\" class=\"season\">\n    ";
  stack2 = ((stack1 = ((stack1 = depth0.seasons),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </select>\n</form>\n\n<h1>League Leaders "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n\n<p>Only eligible players are shown (<i>e.g.</i> a player shooting 2 for 2 on the season is not eligible for the league lead in FG%).</p>\n\n<p></p>\n<div class=\"row-fluid\">\n  ";
  stack2 = ((stack1 = ((stack1 = depth0.categories),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program4, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</div>";
  return buffer;
  });
templates['browserError'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<h1>Error</h1>\n\n<p>Your browser is not modern enough to run Basketball GM.</p>\n\n<p>Currently, <a href=\"http://www.firefox.com/\">Mozilla Firefox</a> and <a href=\"http://www.google.com/chrome/\">Google Chrome</a> work best with Basketball GM.</p>";
  });
templates['playerStats'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<form id=\"player-stats-dropdown\" class=\"form-inline pull-right\"></form>\n\n<h1>Player Stats "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n<p>More: <a data-bind=\"attrLeagueUrl: {href: ['player_shot_locations', season]}\">Shot Locations</a> | <a data-bind=\"attrLeagueUrl: {href: ['dist_player_stats', season]}\">Stat Distributions</a></p>\n\n<p class=\"clearfix\">\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"player-stats\">\n<thead>\n  <tr><th colspan=\"6\"></th><th colspan=\"3\" style=\"text-align: center\" title=\"Field Goals\">FG</th><th colspan=\"3\" style=\"text-align: center\" title=\"Three-Pointers\">3PT</th><th colspan=\"3\" style=\"text-align: center\" title=\"Free Throws\">FT</th><th colspan=\"3\" style=\"text-align: center\" title=\"Rebounds\">Reb</th><th colspan=\"6\"></th></tr>\n  <tr><th>Name</th><th title=\"Position\">Pos</th><th>Team</th><th title=\"Games Played\">GP</th><th title=\"Games Started\">GS</th><th title=\"Minutes\">Min</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Offensive\">Off</th><th title=\"Defensive\">Def</th><th title=\"Total\">Tot</th><th title=\"Assists\">Ast</th><th title=\"Turnovers\">TO</th><th title=\"Steals\">Stl</th><th title=\"Blocks\">Blk</th><th title=\"Personal Fouls\">PF</th><th title=\"Points\">Pts</th><th title=\"Player Efficiency Rating\">PER</th></tr>\n</thead>\n</table>\n</p>";
  return buffer;
  });
templates['trade'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<h1>Trade "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n\n<div class=\"row-fluid\">\n  <div class=\"span7\">\n    <form id=\"rosters\">\n      <p><select id=\"trade-select-team\" name=\"team\" class=\"team form-inline\" data-bind=\"foreach: teams\">\n        <option data-bind=\"attr: {value: abbrev, selected: selected}, text: region + ' ' + name\"></option>\n      </select>\n      <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"roster-other\">\n      <thead>\n        <tr><th></th><th>Name</th><th title=\"Position\">Pos</th><th>Age</th><th title=\"Overall Rating\">Ovr</th><th title=\"Potential Rating\">Pot</th><th>Contract</th><th title=\"Minutes Per Game\">Min</th><th title=\"Points Per Game\">Pts</th><th title=\"Rebounds Per Game\">Reb</th><th title=\"Assists Per Game\">Ast</th><th title=\"Player Efficiency Rating\">PER</th></tr>\n      </thead>\n      </table>\n      </p>\n\n      <h2 data-bind=\"text: userTeamName\"></h2>\n      <p>\n      <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"roster-user\">\n      <thead>\n        <tr><th></th><th>Name</th><th title=\"Position\">Pos</th><th>Age</th><th title=\"Overall Rating\">Ovr</th><th title=\"Potential Rating\">Pot</th><th>Contract</th><th title=\"Minutes Per Game\">Min</th><th title=\"Points Per Game\">Pts</th><th title=\"Rebounds Per Game\">Reb</th><th title=\"Assists Per Game\">Ast</th><th title=\"Player Efficiency Rating\">PER</th></tr>\n      </thead>\n      </table>\n      </p>\n    </form>\n  </div>\n  <div class=\"span5\" id=\"trade-summary\">\n    <h3>Trade Summary</h3>\n    <div class=\"row-fluid\" data-bind=\"foreach: summary.teams\">\n      <div class=\"span6\">\n        <h4 data-bind=\"text: name\"></h4>\n        <h5>Trade Away:</h5>\n        <ul>\n          <!-- ko foreach: trade -->\n            <li><a data-bind=\"attrLeagueUrl: {href: ['player', pid]}, text: name\"></a> (<span data-bind=\"currency: [contract.amount, 'M']\"></span>)</li>\n          <!-- /ko -->\n          <li><span data-bind=\"currency: [total, 'M']\"></span> Total</li>\n        </ul>\n        <h5>Receive:</h5>\n        <ul>\n          <!-- ko foreach: other.trade -->\n            <li><a data-bind=\"attrLeagueUrl: {href: ['player', pid]}, text: name\"></a> (<span data-bind=\"currency: [contract.amount, 'M']\"></span>)</li>\n          <!-- /ko -->\n          <li><span data-bind=\"currency: [other.total, 'M']\"></span></li>\n        </ul>\n        <h5>Payroll after trade: <span data-bind=\"currency: [payrollAfterTrade, 'M']\"></span></h5>\n        <h5>Salary cap: <span data-bind=\"currency: [$parent.salaryCap, 'M']\"></span></h5>\n      </div>\n    </div>\n\n    <br>\n    <p class=\"alert alert-error\" data-bind=\"visible: summary.warning\"><strong>Warning!</strong> <span data-bind=\"text: summary.warning\"></span></p>\n    <p class=\"alert alert-info\" data-bind=\"visible: message, text: message\"></p>\n\n    <center>\n      <form method=\"POST\" id=\"propose-trade\" data-bind=\"attrLeagueUrl: {action: ['trade']}\">\n        <input type=\"hidden\" name=\"propose\" value=\"1\">\n        <button type=\"submit\" class=\"btn btn-large btn-primary\" data-bind=\"enable: summary.enablePropose\">Propose Trade</button>\n      </form>\n\n      <form method=\"POST\" id=\"clear-trade\" data-bind=\"attrLeagueUrl: {action: ['trade']}\">\n        <input type=\"hidden\" name=\"clear\" value=\"1\">\n        <button type=\"submit\" class=\"btn\">Clear Trade</button>\n      </form>\n    </center>\n  </div>\n</div>";
  return buffer;
  });
templates['tradeSummary'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n        <li><a href=\"/l/"
    + escapeExpression(((stack1 = depth1.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player/"
    + escapeExpression(((stack1 = depth0.pid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a> ("
    + escapeExpression(helpers.currency.call(depth0, ((stack1 = depth0.contract),stack1 == null || stack1 === false ? stack1 : stack1.amount), "M", {hash:{},data:data}))
    + ")</li>\n      ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<p class=\"alert alert-error\"><strong>Warning!</strong> "
    + escapeExpression(((stack1 = ((stack1 = depth0.summary),stack1 == null || stack1 === false ? stack1 : stack1.warning)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return " disabled=\"disabled\"";
  }

  buffer += "<h3>Trade Summary</h3>\n<div class=\"row-fluid\">\n  <div class=\"span6\">\n    <h4>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = depth0.summary),stack1 == null || stack1 === false ? stack1 : stack1.teams)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h4>\n    <h5>Trade Away:</h5>\n    <ul>\n      ";
  stack2 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = depth0.summary),stack1 == null || stack1 === false ? stack1 : stack1.teams)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.trade)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      <li>"
    + escapeExpression(helpers.currency.call(depth0, ((stack1 = ((stack1 = ((stack1 = depth0.summary),stack1 == null || stack1 === false ? stack1 : stack1.teams)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.total), "M", {hash:{},data:data}))
    + " Total</li>\n    </ul>\n    <h5>Receive:</h5>\n    <ul>\n      ";
  stack2 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = depth0.summary),stack1 == null || stack1 === false ? stack1 : stack1.teams)),stack1 == null || stack1 === false ? stack1 : stack1[1])),stack1 == null || stack1 === false ? stack1 : stack1.trade)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      <li>"
    + escapeExpression(helpers.currency.call(depth0, ((stack1 = ((stack1 = ((stack1 = depth0.summary),stack1 == null || stack1 === false ? stack1 : stack1.teams)),stack1 == null || stack1 === false ? stack1 : stack1[1])),stack1 == null || stack1 === false ? stack1 : stack1.total), "M", {hash:{},data:data}))
    + " Total</li>\n    </ul>\n    <h5>Payroll after trade: "
    + escapeExpression(helpers.currency.call(depth0, ((stack1 = ((stack1 = ((stack1 = depth0.summary),stack1 == null || stack1 === false ? stack1 : stack1.teams)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.payrollAfterTrade), "M", {hash:{},data:data}))
    + "</h5>\n    <h5>Salary cap: "
    + escapeExpression(helpers.currency.call(depth0, ((stack1 = depth0.summary),stack1 == null || stack1 === false ? stack1 : stack1.salaryCap), "M", {hash:{},data:data}))
    + "</h5>\n  </div>\n  <div class=\"span6\">\n    <h4>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = depth0.summary),stack1 == null || stack1 === false ? stack1 : stack1.teams)),stack1 == null || stack1 === false ? stack1 : stack1[1])),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h4>\n    <h5>Trade Away:</h5>\n    <ul>\n      ";
  stack2 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = depth0.summary),stack1 == null || stack1 === false ? stack1 : stack1.teams)),stack1 == null || stack1 === false ? stack1 : stack1[1])),stack1 == null || stack1 === false ? stack1 : stack1.trade)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      <li>"
    + escapeExpression(helpers.currency.call(depth0, ((stack1 = ((stack1 = ((stack1 = depth0.summary),stack1 == null || stack1 === false ? stack1 : stack1.teams)),stack1 == null || stack1 === false ? stack1 : stack1[1])),stack1 == null || stack1 === false ? stack1 : stack1.total), "M", {hash:{},data:data}))
    + " Total</li>\n    </ul>\n    <h5>Receive:</h5>\n    <ul>\n      ";
  stack2 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = depth0.summary),stack1 == null || stack1 === false ? stack1 : stack1.teams)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.trade)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      <li>"
    + escapeExpression(helpers.currency.call(depth0, ((stack1 = ((stack1 = ((stack1 = depth0.summary),stack1 == null || stack1 === false ? stack1 : stack1.teams)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.total), "M", {hash:{},data:data}))
    + " Total</li>\n    </ul>\n    <h5>Payroll after trade: "
    + escapeExpression(helpers.currency.call(depth0, ((stack1 = ((stack1 = ((stack1 = depth0.summary),stack1 == null || stack1 === false ? stack1 : stack1.teams)),stack1 == null || stack1 === false ? stack1 : stack1[1])),stack1 == null || stack1 === false ? stack1 : stack1.payrollAfterTrade), "M", {hash:{},data:data}))
    + "</h5>\n    <h5>Salary cap: "
    + escapeExpression(helpers.currency.call(depth0, ((stack1 = depth0.summary),stack1 == null || stack1 === false ? stack1 : stack1.salaryCap), "M", {hash:{},data:data}))
    + "</h5>\n  </div>\n</div>\n\n<br>\n";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.summary),stack1 == null || stack1 === false ? stack1 : stack1.warning), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n<p class=\"alert alert-info\" data-bind=\"text: message\"></p>\n\n<center>\n  <form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/trade\" method=\"POST\" id=\"propose-trade\">\n    <input type=\"hidden\" name=\"propose\" value=\"1\">\n    <button type=\"submit\" class=\"btn btn-large btn-primary\"";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.summary),stack1 == null || stack1 === false ? stack1 : stack1.disablePropose), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">Propose Trade</button>\n  </form>\n\n  <form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/trade\" method=\"POST\" id=\"clear-trade\">\n    <input type=\"hidden\" name=\"clear\" value=\"1\">\n    <button type=\"submit\" class=\"btn\">Clear Trade</button>\n  </form>\n</center>\n";
  return buffer;
  });
templates['leagueDashboard'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, depth0.streakLong, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += ", "
    + escapeExpression(((stack1 = depth0.streakLong),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <b>"
    + escapeExpression(((stack1 = depth0.seriesTitle),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b><br>\n        "
    + escapeExpression(helpers.matchup.call(depth0, 0, 0, {hash:{},data:data}))
    + "<br>\n      ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        "
    + escapeExpression(((stack1 = depth0.rank),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "th place in conference<br>\n        (Top 8 teams make the playoffs)<br>\n      ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/playoffs\">» Playoffs</a>\n      ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/playoffs\">» Playoffs Projections</a>\n      ";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        Next Game: ";
  stack1 = helpers.unless.call(depth0, depth0.nextGameHome, {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = depth0.nextGameAbbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.nextGameAbbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a><br>\n      ";
  return buffer;
  }
function program13(depth0,data) {
  
  
  return "@";
  }

function program15(depth0,data) {
  
  
  return "No completed games yet this season.<br>";
  }

function program17(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        ";
  stack1 = helpers.unless.call(depth0, depth0.home, {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<a href=\"/l/"
    + escapeExpression(((stack1 = depth1.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = depth0.oppAbbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.oppAbbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>, ";
  stack2 = helpers['if'].call(depth0, depth0.won, {hash:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += " <a href=\"/l/"
    + escapeExpression(((stack1 = depth1.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/game_log/"
    + escapeExpression(((stack1 = depth1.abbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = depth1.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = depth0.gid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.pts),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = depth0.oppPts),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(((stack1 = depth0.overtime),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a><br>\n      ";
  return buffer;
  }
function program18(depth0,data) {
  
  
  return "won";
  }

function program20(depth0,data) {
  
  
  return "lost";
  }

function program22(depth0,data) {
  
  
  return "None yet.<br>";
  }

function program24(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        <a href=\"/l/"
    + escapeExpression(((stack1 = depth1.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = depth1.abbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>: <a href=\"/l/"
    + escapeExpression(((stack1 = depth1.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/standings/"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.won),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = depth0.lost),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>";
  stack2 = helpers['if'].call(depth0, depth0.extraText, {hash:{},inverse:self.noop,fn:self.programWithDepth(program25, data, depth1),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "<br>\n      ";
  return buffer;
  }
function program25(depth0,data,depth2) {
  
  var buffer = "", stack1;
  buffer += ", <a href=\"/l/"
    + escapeExpression(((stack1 = depth2.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/playoffs/"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.extraText),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>";
  return buffer;
  }

function program27(depth0,data) {
  
  
  return "None.<br>";
  }

function program29(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n        <a href=\"/l/"
    + escapeExpression(((stack1 = depth1.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player/"
    + escapeExpression(((stack1 = depth0.pid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>: "
    + escapeExpression(((stack1 = depth0.age),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " yo, "
    + escapeExpression(((stack1 = depth0.ovr),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ovr, "
    + escapeExpression(((stack1 = depth0.pot),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " pot</span><br>\n      ";
  return buffer;
  }

function program31(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n        <a href=\"/l/"
    + escapeExpression(((stack1 = depth1.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player/"
    + escapeExpression(((stack1 = depth0.pid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>: "
    + escapeExpression(((stack1 = depth0.age),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " yo, "
    + escapeExpression(helpers.currency.call(depth0, depth0.contractAmount, "M", {hash:{},data:data}))
    + "<br>\n        <span style=\"margin-left: 2em\">"
    + escapeExpression(helpers.round.call(depth0, depth0.pts, 1, {hash:{},data:data}))
    + " pts, "
    + escapeExpression(((stack1 = depth0.ovr),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ovr, "
    + escapeExpression(((stack1 = depth0.pot),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " pot</span><br>\n      ";
  return buffer;
  }

  buffer += "<h1>"
    + escapeExpression(((stack1 = depth0.region),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " Dashboard "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n\n<div class=\"row-fluid\">\n  <div class=\"span4\">\n    <h3>Current Record</h3>\n    <p>\n      "
    + escapeExpression(((stack1 = depth0.won),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = depth0.lost),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack2 = helpers.unless.call(depth0, depth0.playoffsStarted, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "<br>\n      <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/standings\">» Standings</a>\n    </p>\n\n    <h3>Playoffs</h3>\n    <p>\n      ";
  stack2 = helpers['if'].call(depth0, depth0.showPlayoffSeries, {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers['if'].call(depth0, depth0.playoffsStarted, {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </p>\n\n    <h3>Recent Games</h3>\n    <p>\n      ";
  stack2 = helpers['if'].call(depth0, depth0.nextGameAbbrev, {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers.unless.call(depth0, depth0.recentGames, {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = ((stack1 = ((stack1 = depth0.recentGames),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program17, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/game_log\">» Game Log</a><br>\n      <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/standings\">» Schedule</a>\n    </p>\n\n    <h3>Recent History</h3>\n    <p>\n      ";
  stack2 = helpers.unless.call(depth0, depth0.recentHistory, {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = ((stack1 = ((stack1 = depth0.recentHistory),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program24, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/team_history\">» Team History</a><br>\n      <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/history\">» League History</a>\n    </p>\n\n  </div>\n  <div class=\"span4\">\n    <h3>Team Stats</h3>\n    <p>\n      Points: "
    + escapeExpression(helpers.round.call(depth0, depth0.pts, 1, {hash:{},data:data}))
    + " ("
    + escapeExpression(((stack1 = depth0.ptsRank),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "th)<br>\n      Allowed: "
    + escapeExpression(helpers.round.call(depth0, depth0.oppPts, 1, {hash:{},data:data}))
    + " ("
    + escapeExpression(((stack1 = depth0.oppPtsRank),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "th)<br>\n      Rebounds: "
    + escapeExpression(helpers.round.call(depth0, depth0.trb, 1, {hash:{},data:data}))
    + " ("
    + escapeExpression(((stack1 = depth0.trbRank),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "th)<br>\n      Assists: "
    + escapeExpression(helpers.round.call(depth0, depth0.ast, 1, {hash:{},data:data}))
    + " ("
    + escapeExpression(((stack1 = depth0.astRank),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "th)<br>\n      <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/team_stats\">» Team Stats</a>\n    </p>\n\n    <h3>Team Leaders</h3>\n    <p>\n      <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.teamLeaders),stack1 == null || stack1 === false ? stack1 : stack1.pts)),stack1 == null || stack1 === false ? stack1 : stack1.pid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.teamLeaders),stack1 == null || stack1 === false ? stack1 : stack1.pts)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>: "
    + escapeExpression(helpers.round.call(depth0, ((stack1 = ((stack1 = depth0.teamLeaders),stack1 == null || stack1 === false ? stack1 : stack1.pts)),stack1 == null || stack1 === false ? stack1 : stack1.stat), 1, {hash:{},data:data}))
    + " pts<br>\n      <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.teamLeaders),stack1 == null || stack1 === false ? stack1 : stack1.trb)),stack1 == null || stack1 === false ? stack1 : stack1.pid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.teamLeaders),stack1 == null || stack1 === false ? stack1 : stack1.trb)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>: "
    + escapeExpression(helpers.round.call(depth0, ((stack1 = ((stack1 = depth0.teamLeaders),stack1 == null || stack1 === false ? stack1 : stack1.trb)),stack1 == null || stack1 === false ? stack1 : stack1.stat), 1, {hash:{},data:data}))
    + " reb<br>\n      <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.teamLeaders),stack1 == null || stack1 === false ? stack1 : stack1.ast)),stack1 == null || stack1 === false ? stack1 : stack1.pid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.teamLeaders),stack1 == null || stack1 === false ? stack1 : stack1.ast)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>: "
    + escapeExpression(helpers.round.call(depth0, ((stack1 = ((stack1 = depth0.teamLeaders),stack1 == null || stack1 === false ? stack1 : stack1.ast)),stack1 == null || stack1 === false ? stack1 : stack1.stat), 1, {hash:{},data:data}))
    + " ast<br>\n      <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster\">» Full Roster</a>\n    </p>\n\n    <h3>League Leaders</h3>\n    <p>\n      <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.leagueLeaders),stack1 == null || stack1 === false ? stack1 : stack1.pts)),stack1 == null || stack1 === false ? stack1 : stack1.pid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.leagueLeaders),stack1 == null || stack1 === false ? stack1 : stack1.pts)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>, <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.leagueLeaders),stack1 == null || stack1 === false ? stack1 : stack1.pts)),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.leagueLeaders),stack1 == null || stack1 === false ? stack1 : stack1.pts)),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>: "
    + escapeExpression(helpers.round.call(depth0, ((stack1 = ((stack1 = depth0.leagueLeaders),stack1 == null || stack1 === false ? stack1 : stack1.pts)),stack1 == null || stack1 === false ? stack1 : stack1.stat), 1, {hash:{},data:data}))
    + " pts<br>\n      <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.leagueLeaders),stack1 == null || stack1 === false ? stack1 : stack1.trb)),stack1 == null || stack1 === false ? stack1 : stack1.pid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.leagueLeaders),stack1 == null || stack1 === false ? stack1 : stack1.trb)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>, <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.leagueLeaders),stack1 == null || stack1 === false ? stack1 : stack1.trb)),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.leagueLeaders),stack1 == null || stack1 === false ? stack1 : stack1.trb)),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>: "
    + escapeExpression(helpers.round.call(depth0, ((stack1 = ((stack1 = depth0.leagueLeaders),stack1 == null || stack1 === false ? stack1 : stack1.trb)),stack1 == null || stack1 === false ? stack1 : stack1.stat), 1, {hash:{},data:data}))
    + " reb<br>\n      <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.leagueLeaders),stack1 == null || stack1 === false ? stack1 : stack1.ast)),stack1 == null || stack1 === false ? stack1 : stack1.pid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.leagueLeaders),stack1 == null || stack1 === false ? stack1 : stack1.ast)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>, <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.leagueLeaders),stack1 == null || stack1 === false ? stack1 : stack1.ast)),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.leagueLeaders),stack1 == null || stack1 === false ? stack1 : stack1.ast)),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>: "
    + escapeExpression(helpers.round.call(depth0, ((stack1 = ((stack1 = depth0.leagueLeaders),stack1 == null || stack1 === false ? stack1 : stack1.ast)),stack1 == null || stack1 === false ? stack1 : stack1.stat), 1, {hash:{},data:data}))
    + " ast<br>\n      <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/leaders\">» League Leaders</a><br>\n      <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player_stats\">» Player Stats</a>\n    </p>\n  </div>\n  <div class=\"span4\">\n    <h3>Finances</h3>\n    <p>\n      Avg Attendance: "
    + escapeExpression(helpers.numberWithCommas.call(depth0, depth0.att, {hash:{},data:data}))
    + "<br>\n      Revenue (YTD): "
    + escapeExpression(helpers.currency.call(depth0, depth0.revenue, "M", {hash:{},data:data}))
    + "<br>\n      Profit (YTD): "
    + escapeExpression(helpers.currency.call(depth0, depth0.profit, "M", {hash:{},data:data}))
    + "<br>\n      Cash: "
    + escapeExpression(helpers.currency.call(depth0, depth0.cash, "M", {hash:{},data:data}))
    + "<br>\n      Payroll: "
    + escapeExpression(helpers.currency.call(depth0, depth0.payroll, "M", {hash:{},data:data}))
    + "<br>\n      Salary Cap: "
    + escapeExpression(helpers.currency.call(depth0, depth0.salaryCap, "M", {hash:{},data:data}))
    + "<br>\n      <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/finances\">» League Finances</a>\n    </p>\n\n    <h3>Top Free Agents</h3>\n    <p>\n      ";
  stack2 = helpers.unless.call(depth0, depth0.freeAgents, {hash:{},inverse:self.noop,fn:self.program(27, program27, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = ((stack1 = ((stack1 = depth0.freeAgents),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program29, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      (You have "
    + escapeExpression(((stack1 = depth0.numRosterSpots),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " open roster spots)<br>\n      <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/free_agents\">» Free Agents</a>\n    </p>\n\n    <h3>Expiring Contracts</h3>\n    <p>\n      ";
  stack2 = helpers.unless.call(depth0, depth0.expiring, {hash:{},inverse:self.noop,fn:self.program(27, program27, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = ((stack1 = ((stack1 = depth0.expiring),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program31, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster\">» Full Roster</a>\n    </p>\n  </div>\n</div>";
  return buffer;
  });
templates['distTeamStats'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <option value=\""
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  stack2 = helpers['if'].call(depth0, depth0.selected, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " season</option>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";
  }

  buffer += "<form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/dist_team_stats\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"dist-team-stats-select-season\" name=\"season\" class=\"season\">\n    ";
  stack2 = ((stack1 = ((stack1 = depth0.seasons),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </select>\n</form>\n\n<h1>Team Stat Distributions "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n<p>More: <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/team_stats\">Main Stats</a> | <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/team_shot_locations\">Shot Locations</a></p>\n\n<p>These <a href=\"http://en.wikipedia.org/wiki/Box_plot\">box plots</a> show the league-wide distributions of team stats for the selected season. Black plots are for this league and blue plots are from the 2010-2011 NBA season, for comparison. The five vertical lines in each plot represent the minimum of the scale, the minimum, the first <a href=\"http://en.wikipedia.org/wiki/Quartile\">quartile</a>, the median, the third quartile, the maximum, and the maximum of the scale.</p>\n\n<p>\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" id=\"dist-team-stats\">\n  <tbody></tbody>\n</table>\n</p>\n";
  return buffer;
  });
templates['standings'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <option value=\""
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  stack2 = helpers['if'].call(depth0, depth0.selected, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " season</option>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";
  }

function program4(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n  <h2>"
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h2>\n  <div class=\"row-fluid\">\n    <div class=\"span9\">\n      ";
  stack2 = ((stack1 = ((stack1 = depth0.divs),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program5, data, depth1),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n\n    <div class=\"span3\">\n      <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\">\n      <thead>\n        <tr><th width=\"100%\">Team</th><th align=\"right\">GB</th></tr>\n      </thead>\n      <tbody>\n      ";
  stack2 = ((stack1 = ((stack1 = depth0.teams),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program8, data, depth1),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </tbody>\n      </table>\n    </div>\n  </div>\n";
  return buffer;
  }
function program5(depth0,data,depth2) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n          <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\">\n          <thead>\n            <tr><th width=\"100%\">"
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th><th>W</th><th>L</th><th>Pct</th><th>GB</th><th>Home</th><th>Road</th><th>Div</th><th>Conf</th><th>Streak</th><th>L10</th></tr>\n          </thead>\n          <tbody>\n          ";
  stack2 = ((stack1 = ((stack1 = depth0.teams),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program6, data, depth2),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          </tbody>\n          </table>\n      ";
  return buffer;
  }
function program6(depth0,data,depth3) {
  
  var buffer = "", stack1;
  buffer += "\n            <tr><td><a href=\"/l/"
    + escapeExpression(((stack1 = depth3.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = depth0.abbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = depth3.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.region),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></td><td>"
    + escapeExpression(((stack1 = depth0.won),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.lost),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(helpers.roundWinp.call(depth0, depth0.winp, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.gb),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.wonHome),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = depth0.lostHome),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.wonAway),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = depth0.lostAway),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.wonDiv),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = depth0.lostDiv),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.wonConf),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = depth0.lostConf),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.streak),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.lastTen),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td></tr>\n          ";
  return buffer;
  }

function program8(depth0,data,depth2) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr";
  stack1 = helpers['if'].call(depth0, depth0.separator, {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><td>"
    + escapeExpression(((stack1 = depth0.rank),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ". <a href=\"/l/"
    + escapeExpression(((stack1 = depth2.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = depth0.abbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = depth2.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.region),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></td><td align=\"right\">"
    + escapeExpression(((stack1 = depth0.gb),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td></tr>\n      ";
  return buffer;
  }
function program9(depth0,data) {
  
  
  return " class=\"separator\"";
  }

  buffer += "<form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/standings\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"standings-select-season\" name=\"season\" class=\"season\">\n    ";
  stack2 = ((stack1 = ((stack1 = depth0.seasons),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </select>\n</form>\n\n<h1>Standings "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n\n";
  stack2 = ((stack1 = ((stack1 = depth0.confs),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program4, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  return buffer;
  });
templates['playoffs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <option value=\""
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  stack2 = helpers['if'].call(depth0, depth0.selected, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " season</option>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";
  }

function program4(depth0,data) {
  
  
  return "<p>This is what the playoff matchups would be if the season ended right now.</p>";
  }

  buffer += "<form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/playoffs\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"playoffs-select-season\" name=\"season\" class=\"season\">\n    ";
  stack2 = ((stack1 = ((stack1 = depth0.seasons),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </select>\n</form>\n\n<h1>Playoffs "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n\n";
  stack2 = helpers.unless.call(depth0, depth0.finalMatchups, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n<p>\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table-condensed\" width=\"100%\">\n<tbody>\n  <tr>\n    <td width=\"14.28%\">\n      "
    + escapeExpression(helpers.matchup.call(depth0, 0, 0, {hash:{},data:data}))
    + "\n    </td>\n    <td rowspan=\"2\" width=\"14.28%\">\n      "
    + escapeExpression(helpers.matchup.call(depth0, 1, 0, {hash:{},data:data}))
    + "\n    </td>\n    <td rowspan=\"4\" width=\"14.28%\">\n      "
    + escapeExpression(helpers.matchup.call(depth0, 2, 0, {hash:{},data:data}))
    + "\n    </td>\n    <td rowspan=\"4\" width=\"14.28%\">\n      "
    + escapeExpression(helpers.matchup.call(depth0, 3, 0, {hash:{},data:data}))
    + "\n    </td>\n    <td rowspan=\"4\" width=\"14.28%\">\n      "
    + escapeExpression(helpers.matchup.call(depth0, 2, 1, {hash:{},data:data}))
    + "\n    </td>\n    <td rowspan=\"2\" width=\"14.28%\">\n      "
    + escapeExpression(helpers.matchup.call(depth0, 1, 2, {hash:{},data:data}))
    + "\n    </td>\n    <td width=\"14.28%\">\n      "
    + escapeExpression(helpers.matchup.call(depth0, 0, 4, {hash:{},data:data}))
    + "\n    </td>\n  </tr>\n  <tr>\n    <td>\n      "
    + escapeExpression(helpers.matchup.call(depth0, 0, 1, {hash:{},data:data}))
    + "\n    </td>\n    <td>\n      "
    + escapeExpression(helpers.matchup.call(depth0, 0, 5, {hash:{},data:data}))
    + "\n    </td>\n  </tr>\n  <tr>\n    <td>\n      "
    + escapeExpression(helpers.matchup.call(depth0, 0, 2, {hash:{},data:data}))
    + "\n    </td>\n    <td rowspan=\"2\">\n      "
    + escapeExpression(helpers.matchup.call(depth0, 1, 1, {hash:{},data:data}))
    + "\n    </td>\n    <td rowspan=\"2\">\n      "
    + escapeExpression(helpers.matchup.call(depth0, 1, 3, {hash:{},data:data}))
    + "\n    </td>\n    <td>\n      "
    + escapeExpression(helpers.matchup.call(depth0, 0, 6, {hash:{},data:data}))
    + "\n    </td>\n  </tr>\n  <tr>\n    <td>\n      "
    + escapeExpression(helpers.matchup.call(depth0, 0, 3, {hash:{},data:data}))
    + "\n    </td>\n    <td>\n      "
    + escapeExpression(helpers.matchup.call(depth0, 0, 7, {hash:{},data:data}))
    + "\n    </td>\n  </tr>\n</tbody>\n</table>\n</p>\n";
  return buffer;
  });
templates['teamStats'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<form id=\"team-stats-dropdown\" class=\"form-inline pull-right\"></form>\n\n<h1>Team Stats "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n<p>More: <a data-bind=\"attrLeagueUrl: {href: ['team_shot_locations', season]}\">Shot Locations</a> | <a data-bind=\"attrLeagueUrl: {href: ['dist_team_stats', season]}\">Stat Distributions</a></p>\n\n<p class=\"clearfix\">\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"team-stats\">\n<thead>\n  <tr><th colspan=\"4\"></th><th colspan=\"3\" style=\"text-align: center\" title=\"Field Goals\">FG</th><th colspan=\"3\" style=\"text-align: center\" title=\"Three-Pointers\">3PT</th><th colspan=\"3\" style=\"text-align: center\" title=\"Free Throws\">FT</th><th colspan=\"3\" style=\"text-align: center\" title=\"Rebounds\">Reb</th><th colspan=\"7\"></th></tr>\n  <tr><th>Team</th><th title=\"Games Played\">GP</th><th title=\"Won\">W</th><th title=\"Lost\">L</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Offensive\">Off</th><th title=\"Defensive\">Def</th><th title=\"Total\">Tot</th><th title=\"Assists\">Ast</th><th title=\"Turnovers\">TO</th><th title=\"Steals\">Stl</th><th title=\"Blocks\">Blk</th><th title=\"Personal Fouls\">PF</th><th title=\"Points\">Pts</th><th title=\"Opponent's Points\">OPts</th></tr>\n</thead>\n</table>\n</p>";
  return buffer;
  });
templates['dropdown'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <option value=\""
    + escapeExpression(((stack1 = depth0.key),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  stack2 = helpers['if'].call(depth0, depth0.selected, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">"
    + escapeExpression(((stack1 = depth0.val),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";
  }

  buffer += "  <select id=\""
    + escapeExpression(((stack1 = depth0.fieldId),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\""
    + escapeExpression(((stack1 = depth0.field),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    ";
  stack2 = ((stack1 = ((stack1 = depth0.options),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </select>";
  return buffer;
  });
templates['manualOverview'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<h1>Basketball GM Manual</h1>\n\n<p>Basketball GM is a completely free sports management simulation game. You are the general manager of a basketball team, tasked with building your roster to compete for a championship while managing your finances. As of now, your goal can be whatever you want: winning the most championships, making the most profit, developing players from rookies to stars, etc. You can make an unlimited number of different leagues from <a href=\"/\">the dashboard</a>, each one with a different set of random players.</p>\n\n<h2>User Interface</h2>\n\n<p>From within a league, the most important user interface element is the Play Menu, which you can access with the big blue Play button at the top of the screen. Any context-dependent action, like playing a game or moving from one phase to another, is done from the Play Menu. Everything else about the user interface should (hopefully) be self-explanitory.</p>\n\n<h2>Gameplay Overview</h2>\n\n<p>Each season of the game is divided into several phases:</p>\n\n<ul>\n  <li><b>Preaseason.</b> Players develop/age (<i>i.e.</i> their ratings change). Young players tend to get better, old players tend to get worse.</li>\n  <li><b>Regular season.</b> Regular season games are played, at the pace you choose through the Play menu.</li>\n  <li><b>Playoffs.</b> Teams that made the playoffs (top 8 in each conference) progress through the bracket playing best-of-7 series until a champion emerges.</li>\n  <li><b>Pre-draft.</b> After the playoffs end, you have one more chance to make changes to your roster before the draft, such as releasing a player to make room on your roster for a new player.</li>\n  <li><b>Draft.</b> Similar to the NBA draft (although there is no lottery), teams are ordered from worst to best for two rounds.</li>\n  <li><b>Post-draft.</b> After the draft, you have one more chance to make changes to your roster before free agency.</li>\n  <li><b>Free agency.</b> Contracts expire. For players on your team, you will have the chance to negotiate a new contract with each player whose contract expires. Otherwise, players with expiring contracts become free agents. The same thing happens for the other teams, so the free agents list is most richly populated at this time.</li>\n</ul>\n\n<h2>League Rules</h2>\n\n<p>League rules are generally modeled on the NBA, but simplified.</p>\n\n<h3>Salary cap</h3>\n\n<p>The salary cap is $60 million. This is a soft cap, in the sense that even if you are over the salary cap, you can still:</p>\n\n<ul>\n  <li>Draft players and add their salaries</li>\n  <li>Resign your current players (like the <a href=\"http://en.wikipedia.org/wiki/NBA_salary_cap#Larry_Bird_exception\">Larry Bird exception</a>)</li>\n  <li>Sign free agents to minimum contracts ($500k)</li>\n</ul>\n\n<h3>Contracts</h3>\n\n<p>The maximum contract amount is $20 million per year and the maximum contract length is 5 years.</p>\n\n<p>The minimum contract amount is $500 thousand per year and the minimum contract length is 1 year (or, until the end of the season, if the season is already in progress).</p>\n\n<p>When a contract expires, you have the opportunity to negotiate a new contract with the player. If you don't come to an agreement, the player becomes a free agent. This is important because, based on the salary cap rules, you can go over the cap to resign your own players but you can't go over the cap to sign a free agent.</p>\n\n<h3>Roster</h3>\n\n<p>The maximum roster size is 15. You can never exceed this, except during the draft. But right after that, you'll have to release or buy out enough players to get under the limit.</p>\n\n<p>The minimum roster size is 5. You must be above this limit to play games.</p>\n\n<h2>Player Ratings</h2>\n\n<p>Player ratings for a variety of categories (shooting, rebounding, passing, dribbling, etc.) are on a scale from 0-100. The whole scale is used, so a typical value for a rating is 50. Roughly, the overall (average) player ratings mean:</p>\n\n<ul>\n  <li><b>90s:</b> All-time great</li>\n  <li><b>80s:</b> MVP candidate</li>\n  <li><b>70s:</b> All League candidate</li>\n  <li><b>60s:</b> Good starter</li>\n  <li><b>50s:</b> Role player</li>\n  <li><b>40s and lower:</b> Bench</li>\n</ul>\n\n<p>However, the overall ratings aren't a guarantee of performance. The particular mix of ratings plays into success (<i>e.g.</i> a short player having a 100 shot blocking rating doesn't do much), as do a player's teammates (<i>e.g.</i> a good rebounder doesn't help your team as much if you already have a few other good rebounders).</p>\n\n<h2>How does it work?</h2>\n\n<p>There are no accounts, no passwords, no nothing. All the game data is stored locally on your computer using <a href=\"https://www.google.com/search?q=indexeddb\">IndexedDB</a>. This has advantages and disadvantages. The main advantage is that it is really cheap to run this game, since simulations can occur in your web browser rather than a central server; this is what allows the game to be free and unlimited. The two main disadvantages are (1) doing simulations in your web browser incurs some performance restrictions (but it's not that bad), and (2) since the games are stored on your computer and not on a server, you can't access the same leagues on different computers (eventually this will be possible though).</p>\n\n<h2>Performance</h2>\n\n<p>Game simulation can be taxing on your computer, particularly as additional seasons are simulated and the database grows. There are a couple of tricks you can use to speed this up:</p>\n\n<ol>\n  <li>Don't open multiple windows/tabs viewing while you are simulating games. If you do, then all of the windows will try to update their content every day, which takes valuable computing resources away from actually simulating the games.</li>\n  <li>Don't have a complicated page (such as the league dashboard) open when you simulate games. As the simulation progresses, the content of whatever you're viewing updates each day. If you're viewing something complex, this can be a little slow. For the fastest performance, view something old like the standings from a previous season which does not have to update ever.</li>\n</ol>\n\n<h2>Make Basketball GM better!</h2>\n\n<p>Basketball GM is open source. That means you can copy/edit/improve/redistribute the game. <a href=\"https://github.com/jdscheff/basketball-gm\">The code is on GitHub</a>, avaliable under the <a href=\"http://www.gnu.org/licenses/agpl-3.0.html\">GNU Affero General Public License</a>. If you want to help make Basketball GM better, there are tons of ways you can help. You can start hacking on anything you want or <a href=\"mailto:jdscheff@gmail.com\">send me an email</a> if you want to discuss things first.</p>\n\n<h2>Still not sure about something?</h2>\n\n<p>If you have a question or think you found a bug or you want to request a feature, either <a href=\"mailto:commissioner@basketball-gm.com\">send an email</a> (commissioner@basketball-gm.com) or <a href=\"https://github.com/jdscheff/basketball-gm/issues\">submit an issue on GitHub</a>.</p>";
  });
templates['history'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <option value=\""
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  stack2 = helpers['if'].call(depth0, depth0.selected, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " season</option>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";
  }

function program4(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <b>"
    + escapeExpression(((stack1 = depth0.title),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b><br>\n      ";
  stack2 = ((stack1 = ((stack1 = depth0.players),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program5, data, depth1),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    ";
  return buffer;
  }
function program5(depth0,data,depth2) {
  
  var buffer = "", stack1;
  buffer += "\n        <a href=\"/l/"
    + escapeExpression(((stack1 = depth2.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player/"
    + escapeExpression(((stack1 = depth0.pid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a> (<a href=\"/l/"
    + escapeExpression(((stack1 = depth2.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = depth0.abbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = depth2.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.abbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>)<br>\n      ";
  return buffer;
  }

function program7(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n      <a href=\"/l/"
    + escapeExpression(((stack1 = depth1.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player/"
    + escapeExpression(((stack1 = depth0.pid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a> (overall rating: "
    + escapeExpression(((stack1 = ((stack1 = depth0.ratings),stack1 == null || stack1 === false ? stack1 : stack1.ovr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "; age: "
    + escapeExpression(((stack1 = depth0.age),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")<br>\n    ";
  return buffer;
  }

  buffer += "<form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/history\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"history-select-season\" name=\"season\" class=\"season\">\n    ";
  stack2 = ((stack1 = ((stack1 = depth0.seasons),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </select>\n</form>\n\n<h1>Season Summary "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n\n<p></p>\n<div class=\"row-fluid\">\n  <div class=\"span4\">\n    <h4>League Champions</h4>\n    <p><strong><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = ((stack1 = depth0.champ),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.champ),stack1 == null || stack1 === false ? stack1 : stack1.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = depth0.champ),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></strong><br>\n    <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/playoffs/"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">Playoffs Bracket</a></p>\n    <h4>Best Record</h4>\n    <p>East: <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.bre)),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.bre)),stack1 == null || stack1 === false ? stack1 : stack1.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.bre)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a> ("
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.bre)),stack1 == null || stack1 === false ? stack1 : stack1.won)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.bre)),stack1 == null || stack1 === false ? stack1 : stack1.lost)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")<br>\n    West: <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.brw)),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.brw)),stack1 == null || stack1 === false ? stack1 : stack1.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.brw)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a> ("
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.brw)),stack1 == null || stack1 === false ? stack1 : stack1.won)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.brw)),stack1 == null || stack1 === false ? stack1 : stack1.lost)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")<br></p>\n    <h4>Most Valueable Player</h4>\n    <p><strong><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.mvp)),stack1 == null || stack1 === false ? stack1 : stack1.pid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.mvp)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></strong> (<a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.mvp)),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.mvp)),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>)<br>\n    "
    + escapeExpression(helpers.round.call(depth0, ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.mvp)),stack1 == null || stack1 === false ? stack1 : stack1.pts), 1, {hash:{},data:data}))
    + " pts, "
    + escapeExpression(helpers.round.call(depth0, ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.mvp)),stack1 == null || stack1 === false ? stack1 : stack1.trb), 1, {hash:{},data:data}))
    + " reb, "
    + escapeExpression(helpers.round.call(depth0, ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.mvp)),stack1 == null || stack1 === false ? stack1 : stack1.ast), 1, {hash:{},data:data}))
    + " ast</p>\n    <h4>Defensive Player of the Year</h4>\n    <p><strong><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.dpoy)),stack1 == null || stack1 === false ? stack1 : stack1.pid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.dpoy)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></strong> (<a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.dpoy)),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.dpoy)),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>)<br>\n    "
    + escapeExpression(helpers.round.call(depth0, ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.dpoy)),stack1 == null || stack1 === false ? stack1 : stack1.trb), 1, {hash:{},data:data}))
    + " reb, "
    + escapeExpression(helpers.round.call(depth0, ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.dpoy)),stack1 == null || stack1 === false ? stack1 : stack1.blk), 1, {hash:{},data:data}))
    + " blk, "
    + escapeExpression(helpers.round.call(depth0, ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.dpoy)),stack1 == null || stack1 === false ? stack1 : stack1.stl), 1, {hash:{},data:data}))
    + " stl</p>\n    <h4>Sixth Man of the Year</h4>\n    <p><strong><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.smoy)),stack1 == null || stack1 === false ? stack1 : stack1.pid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.smoy)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></strong> (<a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.smoy)),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.smoy)),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>)<br>\n    "
    + escapeExpression(helpers.round.call(depth0, ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.smoy)),stack1 == null || stack1 === false ? stack1 : stack1.pts), 1, {hash:{},data:data}))
    + " pts, "
    + escapeExpression(helpers.round.call(depth0, ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.smoy)),stack1 == null || stack1 === false ? stack1 : stack1.trb), 1, {hash:{},data:data}))
    + " reb, "
    + escapeExpression(helpers.round.call(depth0, ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.smoy)),stack1 == null || stack1 === false ? stack1 : stack1.ast), 1, {hash:{},data:data}))
    + " ast</p>\n    <h4>Rookie of the Year</h4>\n    <p><strong><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.roy)),stack1 == null || stack1 === false ? stack1 : stack1.pid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.roy)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></strong> (<a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.roy)),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.roy)),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>)<br>\n    "
    + escapeExpression(helpers.round.call(depth0, ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.roy)),stack1 == null || stack1 === false ? stack1 : stack1.pts), 1, {hash:{},data:data}))
    + " pts, "
    + escapeExpression(helpers.round.call(depth0, ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.roy)),stack1 == null || stack1 === false ? stack1 : stack1.trb), 1, {hash:{},data:data}))
    + " reb, "
    + escapeExpression(helpers.round.call(depth0, ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.roy)),stack1 == null || stack1 === false ? stack1 : stack1.ast), 1, {hash:{},data:data}))
    + " ast</p>\n  </div>\n  <div class=\"span4\">\n    <h4>All-League Teams</h4>\n    ";
  stack2 = ((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.allLeague)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program4, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </div>\n  <div class=\"span4\">\n    <h4>All-Defensive Teams</h4>\n    ";
  stack2 = ((stack1 = ((stack1 = ((stack1 = depth0.awards),stack1 == null || stack1 === false ? stack1 : stack1.allDefensive)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program4, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </div>\n</div>\n<div class=\"row-fluid\">\n  <div class=\"span12\">\n    <h4>Retired Players</h4>\n    ";
  stack2 = ((stack1 = ((stack1 = depth0.retiredPlayers),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program7, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </div>\n</div>";
  return buffer;
  });
templates['playButton'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li><a href=\""
    + escapeExpression(((stack1 = depth0.url),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\""
    + escapeExpression(((stack1 = depth0.id),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.label),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></li>\n      ";
  return buffer;
  }

  buffer += "<ul class=\"nav btn btn-primary\">\n  <li class=\"dropdown\">\n    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" id=\"play-button-link\">Play <b class=\"caret\"></b></a>\n    <ul class=\"dropdown-menu\">\n      ";
  stack2 = ((stack1 = ((stack1 = depth0.options),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </ul>\n  </li>\n</ul>\n";
  return buffer;
  });
templates['inbox'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, self=this, functionType="function", escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "<p class=\"text-error\">You have a new message from the owner. Read it before continuing.</p>";
  }

function program3(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n      <tr";
  stack1 = helpers.unless.call(depth0, depth0.read, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><td class=\"year\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth1.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/message/"
    + escapeExpression(((stack1 = depth0.mid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.year),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td class=\"from\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth1.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/message/"
    + escapeExpression(((stack1 = depth0.mid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.from),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></td><td class=\"text\"><a href=\"/l/"
    + escapeExpression(((stack1 = depth1.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/message/"
    + escapeExpression(((stack1 = depth0.mid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.text),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></td></tr>\n    ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return " class=\"unread\"";
  }

  buffer += "<h1>Inbox</h1>\n";
  stack1 = helpers['if'].call(depth0, depth0.anyUnread, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<p>\n<table class=\"table table-striped table-bordered table-condensed\" id=\"messages\">\n  <tbody>\n    ";
  stack2 = ((stack1 = ((stack1 = depth0.messages),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program3, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </tbody>\n</table>\n</p>";
  return buffer;
  });
templates['schedule'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n  <li><a href=\"/l/"
    + escapeExpression(((stack1 = depth1.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.teams),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.teams),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.teams),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n  "
    + escapeExpression(((stack1 = depth0.vsat),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  <a href=\"/l/"
    + escapeExpression(((stack1 = depth1.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.teams),stack1 == null || stack1 === false ? stack1 : stack1[1])),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.teams),stack1 == null || stack1 === false ? stack1 : stack1[1])),stack1 == null || stack1 === false ? stack1 : stack1.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.teams),stack1 == null || stack1 === false ? stack1 : stack1[1])),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n";
  return buffer;
  }

  buffer += "<h1>Upcoming Schedule "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n\n<ol>\n";
  stack2 = ((stack1 = ((stack1 = depth0.games),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</ol>\n";
  return buffer;
  });
templates['error'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h1>Error</h1>\n\n"
    + escapeExpression(((stack1 = depth0.error),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n";
  return buffer;
  });
templates['newLeague'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <option value=\""
    + escapeExpression(((stack1 = depth0.tid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.region),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n      ";
  return buffer;
  }

  buffer += "<h1>Create New League</h1>\n<p>\n<form action=\"/new_league\" method=\"POST\">\n  <fieldset>\n    <label>League name</label>\n    <input type=\"text\" name=\"name\" value=\""
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"><br><br>\n    <label>Which team do you want to manage?</label>\n    <select name=\"tid\">\n      ";
  stack2 = ((stack1 = ((stack1 = depth0.teams),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </select>\n   <span class=\"help-block\" id=\"pop-text\"></span><br>\n    <!--<label><select name=\"players\">\n      <option value=\"random\" selected=\"selected\">Random Players</option>\n      <option value=\"nba2012\">2012 NBA Players</option>\n    </select></label><br>-->\n    <button type=\"submit\" class=\"btn\" id=\"create-new-league\">Create New League</button>\n  </fieldset>\n</form>\n</p>";
  return buffer;
  });
templates['dashboard'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li>\n      <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"btn league\" title=\""
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ". "
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"><strong>"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ". "
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br></strong><span class=\"clearfix\">"
    + escapeExpression(((stack1 = depth0.region),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = depth0.teamName),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br></span><span class=\"clearfix\">"
    + escapeExpression(((stack1 = depth0.phaseText),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></a>\n      <form action=\"/delete_league\" method=\"POST\" class=\"delete\"><input type=\"hidden\" name=\"lid\" value=\""
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"><button class=\"btn btn-mini\">Delete</button></form>\n    </li>\n  ";
  return buffer;
  }

  buffer += "<ul class=\"dashboard_league\">\n  ";
  stack2 = ((stack1 = ((stack1 = depth0.leagues),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n  <li class=\"dashboard_league_new\"><a href=\"/new_league\" class=\"btn btn-primary league\"><h2 style=\"\">Create new league</h2></a></li>\n</ul>";
  return buffer;
  });
templates['playerShotLocations'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <option value=\""
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  stack2 = helpers['if'].call(depth0, depth0.selected, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " season</option>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";
  }

  buffer += "<form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player_shot_locations\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"player-shot-locations-select-season\" name=\"season\" class=\"season\">\n    ";
  stack2 = ((stack1 = ((stack1 = depth0.seasons),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </select>\n</form>\n\n<h1>Player Shot Locations "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n<p>More: <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player_stats\">Main Stats</a> | <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/dist_player_stats\">Stat Distributions</a></p>\n\n<p class=\"clearfix\">\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"player-shot-locations\">\n<thead>\n  <tr><th colspan=\"6\"></th><th colspan=\"3\" style=\"text-align: center\" title=\"At Rim\">At Rim</th><th colspan=\"3\" style=\"text-align: center\" title=\"Low Post\">Low Post</th><th colspan=\"3\" style=\"text-align: center\" title=\"Mid-Range\">Mid-Range</th><th colspan=\"3\" style=\"text-align: center\" title=\"Three-Pointers\">3PT</th></tr>\n  <tr><th>Name</th><th title=\"Position\">Pos</th><th>Team</th><th title=\"Games Played\">GP</th><th title=\"Games Started\">GS</th><th title=\"Minutes\">Min</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th></tr>\n</thead>\n</table>\n</p>";
  return buffer;
  });
templates['negotiation'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <p>You are allowed to go over the salary cap to make this deal because you are resigning <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player/"
    + escapeExpression(((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.pid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a> to a contract extension. <strong>If you do not come to an agreement here, <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player/"
    + escapeExpression(((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.pid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a> will become a free agent.</strong> He will then be able to sign with any team, and you won't be able to go over the salary cap to sign him.</p>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <p>You are not allowed to go over the salary cap to make this deal because <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player/"
    + escapeExpression(((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.pid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a> is a free agent.</p>\n";
  return buffer;
  }

  buffer += "<h1>Contract Negotiation "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n\n";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.negotiation),stack1 == null || stack1 === false ? stack1 : stack1.resigning), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n<div class=\"row-fluid\">\n  <div class=\"span6\">\n    <h2>"
    + escapeExpression(((stack1 = ((stack1 = depth0.team),stack1 == null || stack1 === false ? stack1 : stack1.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = depth0.team),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h2>\n    <p>Current Payroll: "
    + escapeExpression(helpers.currency.call(depth0, depth0.payroll, "M", {hash:{},data:data}))
    + "</p>\n    <p>Salary Cap: "
    + escapeExpression(helpers.currency.call(depth0, depth0.salaryCap, "M", {hash:{},data:data}))
    + "</p>\n    <h2>Your Proposal</h2>\n    <form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/negotiation/"
    + escapeExpression(((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.pid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"form-horizontal\" method=\"POST\">\n      <input type=\"text\" name=\"teamYears\" id=\"teamYears\" class=\"span1\" value=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.negotiation),stack1 == null || stack1 === false ? stack1 : stack1.team)),stack1 == null || stack1 === false ? stack1 : stack1.years)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"> years\n      <p><div class=\"input-prepend input-append\">\n        <span class=\"add-on\">$</span><input type=\"text\" name=\"teamAmount\" id=\"teamAmount\" class=\"span5\" value=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.negotiation),stack1 == null || stack1 === false ? stack1 : stack1.team)),stack1 == null || stack1 === false ? stack1 : stack1.amount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"><span class=\"add-on\">M</span> per year\n      </div></p>\n      <button type=\"submit\" class=\"btn btn-large btn-primary\">Submit Proposal</button>  \n    </form>\n\n    <form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/negotiation/"
    + escapeExpression(((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.pid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"form-horizontal\" method=\"POST\">\n      <input type=\"hidden\" name=\"cancel\" value=\"1\">\n      <button type=\"submit\" class=\"btn btn-danger\">Can't reach a deal? End negotiation</button>\n    </form>\n\n  </div>\n  <div class=\"span6\">\n    <h2><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player/"
    + escapeExpression(((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.pid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></h2>\n    <p>Mood: ";
  stack2 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.mood)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</p>\n    <p>Overal: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.ratings)),stack1 == null || stack1 === false ? stack1 : stack1.ovr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "; Potential: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.ratings)),stack1 == null || stack1 === false ? stack1 : stack1.pot)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n    <h2>Player Proposal</h2>\n    <p>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.negotiation),stack1 == null || stack1 === false ? stack1 : stack1.player)),stack1 == null || stack1 === false ? stack1 : stack1.years)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " years (through "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.negotiation),stack1 == null || stack1 === false ? stack1 : stack1.player)),stack1 == null || stack1 === false ? stack1 : stack1.expiration)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</p>\n    <p>$"
    + escapeExpression(helpers.round.call(depth0, ((stack1 = ((stack1 = depth0.negotiation),stack1 == null || stack1 === false ? stack1 : stack1.player)),stack1 == null || stack1 === false ? stack1 : stack1.amount), 3, {hash:{},data:data}))
    + "M per year</p>\n    <form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/negotiation/"
    + escapeExpression(((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.pid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"form-horizontal\" method=\"POST\">\n      <input type=\"hidden\" name=\"accept\" value=\"1\">\n      <button type=\"submit\" class=\"btn btn-large btn-primary\" id=\"accept\">Accept Player Proposal</button>\n    </form>\n  </div>\n</div>\n";
  return buffer;
  });
templates['negotiationList'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<h1>Players With Expiring Contracts</h1>\n\n<p>You are allowed to go over the salary cap to resign your players before they become free agents. If you do not resign them before free agency begins, they will be free to sign with any team, and you won't be able to go over the salary cap to sign them.</p>\n\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"negotiation-list\">\n<thead>\n  <tr><th>Name</th><th title=\"Position\">Pos</th><th>Age</th><th title=\"Overall\">Ovr</th><th title=\"Potential\">Pot</th><th title=\"Minutes Per Game\">Min</th><th title=\"Points Per Game\">Pts</th><th title=\"Rebounds Per Game\">Reb</th><th title=\"Assists Per Game\">Ast</th><th title=\"Player Efficiency Rating\">PER</th><th>Asking for</th><th>Negotiate</th></tr>\n</thead>\n</table>";
  });
templates['distPlayerRatings'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <option value=\""
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  stack2 = helpers['if'].call(depth0, depth0.selected, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " season</option>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";
  }

  buffer += "<form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/dist_player_ratings\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"dist-player-ratings-select-season\" name=\"season\" class=\"season\">\n    ";
  stack2 = ((stack1 = ((stack1 = depth0.seasons),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </select>\n</form>\n\n<h1>Player Rating Distributions "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n<p>More: <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player_ratings\">Main Ratings</a></p>\n\n<p>These <a href=\"http://en.wikipedia.org/wiki/Box_plot\">box plots</a> show the league-wide distributions of player ratings for all active players in the selected season. The five vertical lines in each plot represent the minimum of the scale (0), the minimum, the first <a href=\"http://en.wikipedia.org/wiki/Quartile\">quartile</a>, the median, the third quartile, the maximum, and the maximum of the scale (100).</p>\n\n<p>\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" id=\"dist-player-ratings\">\n  <tbody></tbody>\n</table>\n</p>\n";
  return buffer;
  });
templates['deleteLeague'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h1>Delete League "
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "?</h1>\n\n<p>Are you <em>absolutely</em> sure you want to delete League "
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "? You will <em>permanently</em> lose any record of all "
    + escapeExpression(((stack1 = depth0.numSeasons),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " seasons, "
    + escapeExpression(helpers.numberWithCommas.call(depth0, depth0.numPlayers, {hash:{},data:data}))
    + " players, and "
    + escapeExpression(helpers.numberWithCommas.call(depth0, depth0.numGames, {hash:{},data:data}))
    + " games from this league (well... unless you have backup somewhere).</p>\n\n<form action=\"/delete_league\" method=\"post\" style=\"float: left; margin-right: 1em\">\n  <input type=\"hidden\" name=\"lid\" value=\""
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n  <input type=\"hidden\" name=\"confirm\" value=\"1\">\n  <button class=\"btn btn-danger\">Yes, I am sure! Delete League "
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".</button>\n</form>\n<form action=\"/\" method=\"get\">\n  <button class=\"btn\">Cancel</button>\n</form>";
  return buffer;
  });
templates['playerRatings'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <option value=\""
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  stack2 = helpers['if'].call(depth0, depth0.selected, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " season</option>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";
  }

  buffer += "<form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player_ratings\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"player-ratings-select-season\" name=\"season\" class=\"season\">\n    ";
  stack2 = ((stack1 = ((stack1 = depth0.seasons),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </select>\n</form>\n\n<h1>Player Ratings "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n<p>More: <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/dist_player_ratings\">Rating Distributions</a></p>\n\n\n<p class=\"clearfix\">\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"player-ratings\">\n<thead>\n  <tr><th>Name</th><th title=\"Position\">Pos</th><th>Team</th><th>Age</th><th title=\"Overall\">Ovr</th><th title=\"Potential\">Pot</th><th title=\"Height\">Hgt</th><th title=\"Strength\">Str</th><th title=\"Speed\">Spd</th><th title=\"Jumping\">Jmp</th><th title=\"Endurance\">End</th><th title=\"Inside Scoring\">Ins</th><th title=\"Dunks/Layups\">Dnk</th><th title=\"Free Throw Shooting\">FT</th><th title=\"Two-Point Shooting\">2Pt</th><th title=\"Three-Point Shooting\">3Pt</th><th title=\"Blocks\">Blk</th><th title=\"Steals\">Stl</th><th title=\"Dribbling\">Drb</th><th title=\"Passing\">Pss</th><th title=\"Rebounding\">Reb</th></tr>\n</thead>\n</table>\n</p>";
  return buffer;
  });
templates['leagueFinances'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <option value=\""
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  stack2 = helpers['if'].call(depth0, depth0.selected, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " season</option>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";
  }

  buffer += "<form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/league_finances\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"league-finances-select-season\" name=\"season\" class=\"season\">\n    ";
  stack2 = ((stack1 = ((stack1 = depth0.seasons),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </select>\n</form>\n\n<h1>League Finances "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n\n<p>\n  Salary cap: <strong>$"
    + escapeExpression(helpers.round.call(depth0, depth0.salaryCap, {hash:{},data:data}))
    + "M</strong> (teams over this amount cannot sign free agents for more than the minimum contract)<br>\n  Minimum payroll limit: <strong>$"
    + escapeExpression(helpers.round.call(depth0, depth0.minPayroll, {hash:{},data:data}))
    + "M</strong> (teams with payrolls below this limit will be assessed a fine equal to the difference at the end of the season)<br>\n  Luxury tax limit: <strong>$"
    + escapeExpression(helpers.round.call(depth0, depth0.luxuryPayroll, {hash:{},data:data}))
    + "M</strong> (teams with payrolls above this limit will be assessed a fine equal to "
    + escapeExpression(((stack1 = depth0.luxuryTax),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " times the difference at the end of the season)\n</p>\n\n<p>\n  <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"league-finances\">\n  <thead>\n    <tr><th>Team</th><th>Avg Attendance</th><th>Revenue (YTD)</th><th>Profit (YTD)</th><th>Cash</th><th>Payroll</th></tr>\n  </thead>\n  </table>\n</p>";
  return buffer;
  });
templates['gameLog'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<form id=\"game-log-dropdown\" class=\"form-inline pull-right\"></form>\n\n<h1>Game Log "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n<p>More: <a data-bind=\"attrLeagueUrl: {href: ['roster', abbrev, season]\">Roster</a> | <a data-bind=\"attrLeagueUrl: {href: ['finances', abbrev]}\">Finances</a></p>\n\n<p>\n<div class=\"row-fluid\">\n  <div class=\"span9\" id=\"box-score\" data-bind=\"html: boxScore.html\">\n    <p></p>\n  </div>\n\n  <div class=\"span3\" id=\"game-log-list\">\n    <table id=\"game_log_list\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\">\n    <thead>\n      <tr><th>Opp</th><th>W/L</th><th>Score</th></tr>\n    </thead>\n    <tbody data-bind=\"foreach: gamesList.games\">\n      <tr data-bind=\"attr: {class: selected ? 'alert-info' : ''}\">\n        <td><a data-bind=\"attr: {href: url}, text: (home ? '' : '@') + oppAbbrev\"></a></td>\n        <td><a data-bind=\"attr: {href: url}, text: won ? 'W' : 'L'\"></a></td>\n        <td><a data-bind=\"attr: {href: url}, text: pts + '-' + oppPts + overtime\"></a></td>\n      </tr>\n    </tbody>\n    <tr data-bind=\"visible: gamesList.loading()\"><td colspan=\"3\" style=\"padding: 4px 5px;\">Loading...</td></tr>\n    </table>\n  </div>\n</div>\n</p>\n";
  return buffer;
  });
templates['teamFinances'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <option value=\""
    + escapeExpression(((stack1 = depth0.abbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  stack2 = helpers['if'].call(depth0, depth0.selected, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">"
    + escapeExpression(((stack1 = depth0.region),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <option value=\""
    + escapeExpression(((stack1 = depth0.show),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  stack2 = helpers['if'].call(depth0, depth0.selected, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">"
    + escapeExpression(((stack1 = depth0.text),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n    ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <h4>Revenue Settings <i class=\"icon-question-sign\" id=\"help-revenue-settings\" data-placement=\"bottom\"></i></h4>\n      <p class=\"text-error\"></p>\n      <div class=\"row\">\n        <div class=\"pull-left finances-settings-label\">Ticket Price</div>\n        <div class=\"input-prepend pull-left finances-settings-field\">\n          <span class=\"add-on\">$</span><input type=\"text\" name=\"budget[ticketPrice]\" class=\"ticket-price\" value=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.budget),stack1 == null || stack1 === false ? stack1 : stack1.ticketPrice)),stack1 == null || stack1 === false ? stack1 : stack1.amount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" disabled=\"disabled\">\n        </div>\n        <div class=\"pull-left finances-settings-text\">(#"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.budget),stack1 == null || stack1 === false ? stack1 : stack1.ticketPrice)),stack1 == null || stack1 === false ? stack1 : stack1.rank)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " leaguewide)</div>\n      </div>\n      <p></p>\n      <h4>Expense Settings <i class=\"icon-question-sign\" id=\"help-expense-settings\" data-placement=\"bottom\"></i></h4>\n      <p class=\"text-error\"></p>\n      <div class=\"row\">\n        <div class=\"pull-left finances-settings-label\">Scouting</div>\n        <div class=\"input-prepend input-append pull-left finances-settings-field\">\n          <span class=\"add-on\">$</span><input type=\"text\" name=\"budget[scouting]\" class=\"ticket-price\" value=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.budget),stack1 == null || stack1 === false ? stack1 : stack1.scouting)),stack1 == null || stack1 === false ? stack1 : stack1.amount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" disabled=\"disabled\"><span class=\"add-on\">M</span>\n        </div>\n        <div class=\"pull-left finances-settings-text-small\">Current spending rate: #"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.budget),stack1 == null || stack1 === false ? stack1 : stack1.scouting)),stack1 == null || stack1 === false ? stack1 : stack1.rank)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>Spent this season: #"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.expenses),stack1 == null || stack1 === false ? stack1 : stack1.scouting)),stack1 == null || stack1 === false ? stack1 : stack1.rank)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n      </div>\n      <div class=\"row\">\n        <div class=\"pull-left finances-settings-label\">Coaching</div>\n        <div class=\"input-prepend input-append pull-left finances-settings-field\">\n          <span class=\"add-on\">$</span><input type=\"text\" name=\"budget[coaching]\" class=\"ticket-price\" value=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.budget),stack1 == null || stack1 === false ? stack1 : stack1.coaching)),stack1 == null || stack1 === false ? stack1 : stack1.amount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" disabled=\"disabled\"><span class=\"add-on\">M</span>\n        </div>\n        <div class=\"pull-left finances-settings-text-small\">Current spending rate: #"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.budget),stack1 == null || stack1 === false ? stack1 : stack1.coaching)),stack1 == null || stack1 === false ? stack1 : stack1.rank)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>Spent this season: #"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.expenses),stack1 == null || stack1 === false ? stack1 : stack1.coaching)),stack1 == null || stack1 === false ? stack1 : stack1.rank)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n      </div>\n      <div class=\"row\">\n        <div class=\"pull-left finances-settings-label\">Health</div>\n        <div class=\"input-prepend input-append pull-left finances-settings-field\">\n          <span class=\"add-on\">$</span><input type=\"text\" name=\"budget[health]\" class=\"ticket-price\" value=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.budget),stack1 == null || stack1 === false ? stack1 : stack1.health)),stack1 == null || stack1 === false ? stack1 : stack1.amount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" disabled=\"disabled\"><span class=\"add-on\">M</span>\n        </div>\n        <div class=\"pull-left finances-settings-text-small\">Current spending rate: #"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.budget),stack1 == null || stack1 === false ? stack1 : stack1.health)),stack1 == null || stack1 === false ? stack1 : stack1.rank)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>Spent this season: #"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.expenses),stack1 == null || stack1 === false ? stack1 : stack1.health)),stack1 == null || stack1 === false ? stack1 : stack1.rank)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n      </div>\n      <div class=\"row\">\n        <div class=\"pull-left finances-settings-label\">Facilities</div>\n        <div class=\"input-prepend input-append pull-left finances-settings-field\">\n          <span class=\"add-on\">$</span><input type=\"text\" name=\"budget[facilities]\" class=\"ticket-price\" value=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.budget),stack1 == null || stack1 === false ? stack1 : stack1.facilities)),stack1 == null || stack1 === false ? stack1 : stack1.amount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" disabled=\"disabled\"><span class=\"add-on\">M</span>\n        </div>\n        <div class=\"pull-left finances-settings-text-small\">Current spending rate: #"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.budget),stack1 == null || stack1 === false ? stack1 : stack1.facilities)),stack1 == null || stack1 === false ? stack1 : stack1.rank)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>Spent this season: #"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.expenses),stack1 == null || stack1 === false ? stack1 : stack1.facilities)),stack1 == null || stack1 === false ? stack1 : stack1.rank)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n      </div>\n      <br>\n      <p align=\"center\"><button class=\"btn btn-large btn-primary\" style=\"line-height: 1.5em\">Save Revenue and<br> Expense Settings</button></p>\n      ";
  return buffer;
  }

  buffer += "<form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/team_finances\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"team-finances-select-team\" name=\"team\" class=\"team\">\n    ";
  stack2 = ((stack1 = ((stack1 = depth0.teams),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </select>\n  <select id=\"team-finances-select-show\" name=\"show\" class=\"past-x\">\n    ";
  stack2 = ((stack1 = ((stack1 = depth0.shows),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </select>\n</form>\n\n<h1>"
    + escapeExpression(((stack1 = ((stack1 = depth0.team),stack1 == null || stack1 === false ? stack1 : stack1.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = depth0.team),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " Finances "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n<p>More: <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = ((stack1 = depth0.team),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">Roster</a> | <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/game_log/"
    + escapeExpression(((stack1 = ((stack1 = depth0.team),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">Game Log</a></p>\n\n<p class=\"clearfix\">The current payroll (<strong>"
    + escapeExpression(helpers.currency.call(depth0, depth0.payroll, "M", {hash:{},data:data}))
    + "</strong>) is "
    + escapeExpression(((stack1 = ((stack1 = depth0.aboveBelow),stack1 == null || stack1 === false ? stack1 : stack1.minPayroll)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " the minimum payroll limit (<strong>"
    + escapeExpression(helpers.currency.call(depth0, depth0.minPayroll, "M", {hash:{},data:data}))
    + "</strong>), "
    + escapeExpression(((stack1 = ((stack1 = depth0.aboveBelow),stack1 == null || stack1 === false ? stack1 : stack1.salaryCap)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " the salary cap (<strong>"
    + escapeExpression(helpers.currency.call(depth0, depth0.salaryCap, "M", {hash:{},data:data}))
    + "</strong>), and "
    + escapeExpression(((stack1 = ((stack1 = depth0.aboveBelow),stack1 == null || stack1 === false ? stack1 : stack1.luxuryPayroll)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " the luxury tax limit (<strong>"
    + escapeExpression(helpers.currency.call(depth0, depth0.luxuryPayroll, "M", {hash:{},data:data}))
    + "</strong>). <i class=\"icon-question-sign\" id=\"help-payroll-limits\" data-placement=\"bottom\"></i></p>\n\n<div class=\"row-fluid\">\n  <div class=\"span2\">\n    <h4>Wins</h4>\n    <div id=\"bar-graph-won\" class=\"bar-graph-small\"></div><br><br>\n    <span class=\"clickover\"><h4>Hype <i class=\"icon-question-sign\" id=\"help-hype\" data-placement=\"right\"></i></h4></span>\n    <div id=\"bar-graph-hype\" class=\"bar-graph-small\"></div><br><br>\n    <h4>Region Population</h4>\n    <div id=\"bar-graph-pop\" class=\"bar-graph-small\"></div><br><br>\n    <h4>Average Attendance</h4>\n    <div id=\"bar-graph-att\" class=\"bar-graph-small\"></div>\n  </div>\n  <div class=\"span4\">\n    <div class=\"row-fluid\">\n      <h4>Revenue</h4>\n      <div id=\"bar-graph-revenue\" class=\"bar-graph-large\"></div><br><br>\n      <h4>Expenses</h4>\n      <div id=\"bar-graph-expenses\" class=\"bar-graph-large\"></div><br><br>\n      <h4>Cash</h4>\n      <div id=\"bar-graph-cash\" class=\"bar-graph-medium\"></div>\n    </div>\n  </div>\n  <div class=\"span6\">\n    <form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/team_finances\" method=\"POST\" id=\"finances-settings\">\n      ";
  stack2 = helpers['with'].call(depth0, depth0.team, {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </form>\n  </div>\n</div>\n<p class=\"clearfix\"></p>\n\n<h2>Player Salaries</h2>\n\n<p>You can release or buy out players from <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster\">your roster</a>. Released players who are still owed money are <i>shown in italics</i>.</p>\n\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"player-salaries\">\n<thead>\n  <tr><th>Name</th><th>"
    + escapeExpression(((stack1 = ((stack1 = depth0.salariesSeasons),stack1 == null || stack1 === false ? stack1 : stack1[0])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th><th>"
    + escapeExpression(((stack1 = ((stack1 = depth0.salariesSeasons),stack1 == null || stack1 === false ? stack1 : stack1[1])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th><th>"
    + escapeExpression(((stack1 = ((stack1 = depth0.salariesSeasons),stack1 == null || stack1 === false ? stack1 : stack1[2])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th><th>"
    + escapeExpression(((stack1 = ((stack1 = depth0.salariesSeasons),stack1 == null || stack1 === false ? stack1 : stack1[3])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th><th>"
    + escapeExpression(((stack1 = ((stack1 = depth0.salariesSeasons),stack1 == null || stack1 === false ? stack1 : stack1[4])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th></tr>\n</thead>\n<tbody>\n</tbody>\n<tfoot>\n  <tr><th>Totals</th><th>"
    + escapeExpression(helpers.currency.call(depth0, ((stack1 = depth0.contractTotals),stack1 == null || stack1 === false ? stack1 : stack1[0]), "M", {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.currency.call(depth0, ((stack1 = depth0.contractTotals),stack1 == null || stack1 === false ? stack1 : stack1[1]), "M", {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.currency.call(depth0, ((stack1 = depth0.contractTotals),stack1 == null || stack1 === false ? stack1 : stack1[2]), "M", {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.currency.call(depth0, ((stack1 = depth0.contractTotals),stack1 == null || stack1 === false ? stack1 : stack1[3]), "M", {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.currency.call(depth0, ((stack1 = depth0.contractTotals),stack1 == null || stack1 === false ? stack1 : stack1[4]), "M", {hash:{},data:data}))
    + "</th></tr>\n</tfoot>\n</table>";
  return buffer;
  });
templates['roster'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<form id=\"roster-dropdown\" class=\"form-inline pull-right\"></form>\n\n<h1><span data-bind=\"text: team.region\"></span> <span data-bind=\"text: team.name\"></span> Roster "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n<p>More: <a data-bind=\"attrLeagueUrl: {href: ['finances', abbrev]}\">Finances</a> | <a data-bind=\"attrLeagueUrl: {href: ['game_log', abbrev, season]}\">Game Log</a></p>\n\n<p data-bind=\"visible: isCurrentSeason\">\n  <span data-bind=\"text: numRosterSpots\"></span> open roster spots<br>\n  Payroll: <span data-bind=\"currency: [payroll, 'M']\"></span><br>\n  Salary cap: <span data-bind=\"currency: [salaryCap, 'M']\"></span><br>\n  Cash: <span data-bind=\"currency: [team.cash, 'M']\"></span> (used for buying out players)\n</p>\n\n<!-- ko if: editable -->\n  <p>Drag and drop row handles to move players between the starting lineup (<span class=\"roster_gs\">&#9632;</span>) and the bench (<span class=\"roster_bench\">&#9632;</span>).</p>\n  <p><button class=\"btn\" id=\"roster-auto-sort\">Auto sort roster</button></p>\n<!-- /ko -->\n\n<p>\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"roster\">\n<thead>\n  <tr><th data-bind=\"visible: editable\"></th><th>Name</th><th title=\"Position\">Pos</th><th>Age</th><th title=\"Overall Rating\">Ovr</th><th title=\"Potential Rating\">Pot</th><th data-bind=\"visible: isCurrentSeason\">Contract</th><th title=\"Minutes Per Game\">Min</th><th title=\"Points Per Game\">Pts</th><th title=\"Rebounds Per Game\">Reb</th><th title=\"Assists Per Game\">Ast</th><th title=\"Player Efficiency Rating\">PER</th><th data-bind=\"visible: editable\">Release</th><th data-bind=\"visible: editable\">Buy out</th><th data-bind=\"visible: showTradeFor\">Trade For</th></tr>\n</thead>\n<tbody data-bind=\"foreach: players\">\n  <tr data-bind=\"attr: {class: $index() === 4 ? 'separator' : '', 'data-pid': pid}\">\n    <td class=\"roster_handle\" data-bind=\"visible: $parent.editable\"></td>\n    <td data-bind=\"playerNameLabels: [pid, name, injury, ratings.skills]\"></td>\n    <td data-bind=\"text: pos\"></td>\n    <td data-bind=\"text: age\"></td>\n    <td data-bind=\"text: ratings.ovr\"></td>\n    <td data-bind=\"text: ratings.pot\"></td>\n    <td data-bind=\"visible: $parent.isCurrentSeason\">\n      <span data-bind=\"currency: [contract.amount, 'M']\"></span> thru <span data-bind=\"text: contract.exp\"></span>\n    </td>\n    <td data-bind=\"round: [stats.min, 1]\"></td>\n    <td data-bind=\"round: [stats.pts, 1]\"></td>\n    <td data-bind=\"round: [stats.trb, 1]\"></td>\n    <td data-bind=\"round: [stats.ast, 1]\"></td>\n    <td data-bind=\"round: [stats.per, 1]\"></td>\n    <td data-bind=\"visible: $parent.editable\">\n      <button class=\"btn btn-mini\" data-action=\"release\" data-bind=\"enable: canRelease\">Release</button>\n    </td>\n    <td data-bind=\"visible: $parent.editable\">\n      <button class=\"btn btn-mini\" data-action=\"buyOut\" data-bind=\"enable: canBuyOut\">Buy out</button>\n    </td>\n    <td data-bind=\"visible: $parent.showTradeFor\">\n      <form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/trade\" method=\"POST\" style=\"margin: 0\">\n        <input type=\"hidden\" name=\"pid\" data-bind=\"attr: {value: pid}\">\n        <button type=\"submit\" class=\"btn btn-mini\">Trade For</button>\n      </form>\n    </td>\n  </tr>\n</tbody>\n</table>\n</p>\n";
  return buffer;
  });
templates['message'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<p><b>From: "
    + escapeExpression(((stack1 = ((stack1 = depth0.message),stack1 == null || stack1 === false ? stack1 : stack1.from)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ", "
    + escapeExpression(((stack1 = ((stack1 = depth0.message),stack1 == null || stack1 === false ? stack1 : stack1.year)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b></p>\n";
  stack2 = ((stack1 = ((stack1 = depth0.message),stack1 == null || stack1 === false ? stack1 : stack1.text)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n<p><a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/inbox\">Return To Inbox</a></p>";
  return buffer;
  });
templates['teamHistory'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "None yet.";
  }

function program3(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n    <a href=\"/l/"
    + escapeExpression(((stack1 = depth1.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = depth1.abbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>: <a href=\"/l/"
    + escapeExpression(((stack1 = depth1.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/standings/"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.won),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = depth0.lost),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>";
  stack2 = helpers['if'].call(depth0, depth0.extraText, {hash:{},inverse:self.noop,fn:self.programWithDepth(program4, data, depth1),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "<br>\n  ";
  return buffer;
  }
function program4(depth0,data,depth2) {
  
  var buffer = "", stack1;
  buffer += ", <a href=\"/l/"
    + escapeExpression(((stack1 = depth2.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/playoffs/"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.extraText),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>";
  return buffer;
  }

  buffer += "<h1>Team History "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n\n<p>\n  ";
  stack1 = helpers.unless.call(depth0, depth0.history, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  stack2 = ((stack1 = ((stack1 = depth0.history),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program3, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</p>";
  return buffer;
  });
templates['draft'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return " style=\"display: none;\"";
  }

function program3(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        <tr id=\"undrafted-"
    + escapeExpression(((stack1 = depth0.pid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"><td>"
    + escapeExpression(helpers.playerNameLabels.call(depth0, depth0.pid, depth0.name, depth0.injury, ((stack1 = depth0.ratings),stack1 == null || stack1 === false ? stack1 : stack1.skills), {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.pos),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.age),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.ratings),stack1 == null || stack1 === false ? stack1 : stack1.ovr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.ratings),stack1 == null || stack1 === false ? stack1 : stack1.pot)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td><button class=\"btn btn-mini btn-primary\" data-player-id=\""
    + escapeExpression(((stack1 = depth0.pid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  stack2 = helpers.unless.call(depth0, depth1.started, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">Draft</button></td></tr>\n      ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return " disabled=\"disabled\"";
  }

function program6(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        <tr><td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.draft),stack1 == null || stack1 === false ? stack1 : stack1.round)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = ((stack1 = depth0.draft),stack1 == null || stack1 === false ? stack1 : stack1.pick)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td><a href=\"/l/"
    + escapeExpression(((stack1 = depth1.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = ((stack1 = depth0.draft),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.draft),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></td><td>";
  stack2 = helpers['if'].call(depth0, depth0.injury, {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</td><td>"
    + escapeExpression(((stack1 = depth0.pos),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.age),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.ratings),stack1 == null || stack1 === false ? stack1 : stack1.ovr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = ((stack1 = depth0.ratings),stack1 == null || stack1 === false ? stack1 : stack1.pot)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td></tr>\n      ";
  return buffer;
  }
function program7(depth0,data) {
  
  var stack1;
  return escapeExpression(helpers.playerNameLabels.call(depth0, depth0.pid, depth0.name, depth0.injury, ((stack1 = depth0.ratings),stack1 == null || stack1 === false ? stack1 : stack1.skills), {hash:{},data:data}));
  }

  buffer += "<h1>Draft "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n\n<p>When your turn in the draft comes up, select from the list of available players on the left.</p>\n\n<p";
  stack1 = helpers['if'].call(depth0, depth0.started, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><button class=\"btn btn-large btn-primary\" id=\"start-draft\">Start draft</button></p>\n\n<div class=\"row-fluid\">\n  <div class=\"span6\">\n    <h2>Undrafted Players</h2>\n    <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"undrafted\">\n    <thead>\n      <tr><th>Name</th><th title=\"Position\">Pos</th><th>Age</th><th title=\"Overall rating\">Ovr</th><th title=\"Potential rating\">Pot</th><th>Draft</th></tr>\n    </thead>\n    <tbody>\n      ";
  stack2 = ((stack1 = ((stack1 = depth0.undrafted),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program3, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </tbody>\n    </table>\n  </div>\n  <div class=\"span6\">\n    <h2>Draft Results</h2>\n    <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"drafted\">\n    <thead>\n      <tr><th>Pick</th><th>Team</th><th>Name</th><th title=\"Position\">Pos</th><th>Age</th><th title=\"Overall rating\">Ovr</th><th title=\"Potential rating\">Pot</th></tr>\n    </thead>\n    <tbody>\n      ";
  stack2 = ((stack1 = ((stack1 = depth0.drafted),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program6, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </tbody>\n    </table>\n  </div>\n</div>\n";
  return buffer;
  });
templates['distPlayerStats'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <option value=\""
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  stack2 = helpers['if'].call(depth0, depth0.selected, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " season</option>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";
  }

  buffer += "<form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/dist_player_stats\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"dist-player-stats-select-season\" name=\"season\" class=\"season\">\n    ";
  stack2 = ((stack1 = ((stack1 = depth0.seasons),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </select>\n</form>\n\n<h1>Player Stat Distributions "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n<p>More: <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player_stats\">Main Stats</a> | <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/player_shot_locations\">Shot Locations</a></p>\n\n<p>These <a href=\"http://en.wikipedia.org/wiki/Box_plot\">box plots</a> show the league-wide distributions of player stats for all active players in the selected season. Black plots are for this league and blue plots are from the 2009-2010 NBA season, for comparison. NBA data was generously provided by <a href=\"http://www.databasebasketball.com/stats_download.htm\">databaseBasketball.com</a>. The five vertical lines in each plot represent the minimum of the scale, the minimum, the first <a href=\"http://en.wikipedia.org/wiki/Quartile\">quartile</a>, the median, the third quartile, the maximum, and the maximum of the scale.</p>\n\n<p>\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" id=\"dist-player-stats\">\n  <tbody></tbody>\n</table>\n</p>\n";
  return buffer;
  });
templates['player'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        Draft: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.draft)),stack1 == null || stack1 === false ? stack1 : stack1.year)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " - Round "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.draft)),stack1 == null || stack1 === false ? stack1 : stack1.round)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " (Pick "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.draft)),stack1 == null || stack1 === false ? stack1 : stack1.pick)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ") by "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.draft)),stack1 == null || stack1 === false ? stack1 : stack1.abbrev)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>\n      ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        Undrafted: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.draft)),stack1 == null || stack1 === false ? stack1 : stack1.year)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>\n      ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, depth0.freeAgent, {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ": "
    + escapeExpression(helpers.currency.call(depth0, ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.contract)),stack1 == null || stack1 === false ? stack1 : stack1.amount), "M", {hash:{},data:data}))
    + "/yr thru "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.contract)),stack1 == null || stack1 === false ? stack1 : stack1.exp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>\n      ";
  return buffer;
  }
function program6(depth0,data) {
  
  
  return "Asking for";
  }

function program8(depth0,data) {
  
  
  return "Contract";
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n      ";
  stack1 = helpers['if'].call(depth0, depth0.injured, {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += escapeExpression(helpers.skillsBlock.call(depth0, ((stack1 = depth0.currentRatings),stack1 == null || stack1 === false ? stack1 : stack1.skills), {hash:{},data:data}))
    + "</span><br>";
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"label label-important label-injury\" title=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.injury)),stack1 == null || stack1 === false ? stack1 : stack1.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " (out "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.injury)),stack1 == null || stack1 === false ? stack1 : stack1.gamesRemaining)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " more games)\" style=\"margin-left: 0\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.injury)),stack1 == null || stack1 === false ? stack1 : stack1.gamesRemaining)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><span class=\"skills_block\">";
  return buffer;
  }

function program13(depth0,data) {
  
  
  return "<span class=\"skills_alone\">";
  }

function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"span6\">\n      <h2 class=\"pull-left\">Overall: "
    + escapeExpression(((stack1 = ((stack1 = depth0.currentRatings),stack1 == null || stack1 === false ? stack1 : stack1.ovr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h2>\n      <h2 class=\"pull-right\">Potential: "
    + escapeExpression(((stack1 = ((stack1 = depth0.currentRatings),stack1 == null || stack1 === false ? stack1 : stack1.pot)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h2><br><br><br>\n      <div class=\"row-fluid\">\n        <div class=\"span4\">\n          <strong>Physical</strong><br/ >\n          Height: "
    + escapeExpression(((stack1 = ((stack1 = depth0.currentRatings),stack1 == null || stack1 === false ? stack1 : stack1.hgt)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>\n          Strength: "
    + escapeExpression(((stack1 = ((stack1 = depth0.currentRatings),stack1 == null || stack1 === false ? stack1 : stack1.stre)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>\n          Speed: "
    + escapeExpression(((stack1 = ((stack1 = depth0.currentRatings),stack1 == null || stack1 === false ? stack1 : stack1.spd)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>\n          Jumping: "
    + escapeExpression(((stack1 = ((stack1 = depth0.currentRatings),stack1 == null || stack1 === false ? stack1 : stack1.jmp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>\n          Endurance: "
    + escapeExpression(((stack1 = ((stack1 = depth0.currentRatings),stack1 == null || stack1 === false ? stack1 : stack1.endu)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n        </div>\n        <div class=\"span4\">\n          <strong>Shooting</strong><br/ >\n          Inside: "
    + escapeExpression(((stack1 = ((stack1 = depth0.currentRatings),stack1 == null || stack1 === false ? stack1 : stack1.ins)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>\n          Layups: "
    + escapeExpression(((stack1 = ((stack1 = depth0.currentRatings),stack1 == null || stack1 === false ? stack1 : stack1.dnk)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>\n          Free throws: "
    + escapeExpression(((stack1 = ((stack1 = depth0.currentRatings),stack1 == null || stack1 === false ? stack1 : stack1.ft)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>\n          Two pointers: "
    + escapeExpression(((stack1 = ((stack1 = depth0.currentRatings),stack1 == null || stack1 === false ? stack1 : stack1.fg)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>\n          Three pointers: "
    + escapeExpression(((stack1 = ((stack1 = depth0.currentRatings),stack1 == null || stack1 === false ? stack1 : stack1.tp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n        </div>\n        <div class=\"span4\">\n          <strong>Skill</strong><br/ >\n          Blocks: "
    + escapeExpression(((stack1 = ((stack1 = depth0.currentRatings),stack1 == null || stack1 === false ? stack1 : stack1.blk)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>\n          Steals: "
    + escapeExpression(((stack1 = ((stack1 = depth0.currentRatings),stack1 == null || stack1 === false ? stack1 : stack1.stl)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>\n          Dribbling: "
    + escapeExpression(((stack1 = ((stack1 = depth0.currentRatings),stack1 == null || stack1 === false ? stack1 : stack1.drb)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>\n          Passing: "
    + escapeExpression(((stack1 = ((stack1 = depth0.currentRatings),stack1 == null || stack1 === false ? stack1 : stack1.pss)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>\n          Rebounding: "
    + escapeExpression(((stack1 = ((stack1 = depth0.currentRatings),stack1 == null || stack1 === false ? stack1 : stack1.reb)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n        </div>\n      </div>\n    </div>\n  ";
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/trade\" method=\"POST\"><input type=\"hidden\" name=\"pid\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.pid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"><button type=\"submit\" class=\"btn btn-small\">Trade For</button></form>\n";
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/negotiation/"
    + escapeExpression(((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.pid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" method=\"POST\"><input type=\"hidden\" name=\"new\" value=\"1\"><button type=\"submit\" class=\"btn btn-small\">Sign free agent</button></form>\n";
  return buffer;
  }

function program21(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n    <tr><td><a href=\"#\">"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></td><td><a href=\"/l/"
    + escapeExpression(((stack1 = depth1.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = depth0.abbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.abbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></td><td>"
    + escapeExpression(((stack1 = depth0.age),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.gp),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.gs),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.min, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.fg, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.fga, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.fgp, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.tp, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.tpa, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.tpp, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.ft, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.fta, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.ftp, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.orb, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.drb, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.trb, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.ast, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.tov, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.stl, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.blk, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.pf, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.pts, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.per, 1, {hash:{},data:data}))
    + "</td></tr>\n  ";
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <tr><th>Career</th><th></th><th></th><th>"
    + escapeExpression(((stack1 = depth0.gp),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th><th>"
    + escapeExpression(((stack1 = depth0.gs),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.min, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.fg, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.fga, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.fgp, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.tp, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.tpa, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.tpp, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.ft, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.fta, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.ftp, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.orb, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.drb, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.trb, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.ast, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.tov, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.stl, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.blk, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.pf, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.pts, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.per, 1, {hash:{},data:data}))
    + "</th></tr>\n  ";
  return buffer;
  }

function program25(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n    <tr><td><a href=\"#\">"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></td><td><a href=\"/l/"
    + escapeExpression(((stack1 = depth1.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = depth0.abbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.abbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></td><td>"
    + escapeExpression(((stack1 = depth0.age),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.gp),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.gs),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.min, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.fgAtRim, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.fgaAtRim, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.fgpAtRim, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.fgLowPost, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.fgaLowPost, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.fgpLowPost, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.fgMidRange, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.fgaMidRange, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.fgpMidRange, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.tp, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.tpa, 1, {hash:{},data:data}))
    + "</td><td>"
    + escapeExpression(helpers.round.call(depth0, depth0.tpp, 1, {hash:{},data:data}))
    + "</td></tr>\n  ";
  return buffer;
  }

function program27(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <tr><th>Career</th><th></th><th></th><th>"
    + escapeExpression(((stack1 = depth0.gp),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th><th>"
    + escapeExpression(((stack1 = depth0.gs),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.min, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.fgAtRim, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.fgaAtRim, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.fgpAtRim, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.fgLowPost, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.fgaLowPost, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.fgpLowPost, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.fgMidRange, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.fgaMidRange, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.fgpMidRange, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.tp, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.tpa, 1, {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.round.call(depth0, depth0.tpp, 1, {hash:{},data:data}))
    + "</th></tr>\n  ";
  return buffer;
  }

function program29(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n      <tr><td>"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td><a href=\"/l/"
    + escapeExpression(((stack1 = depth1.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/roster/"
    + escapeExpression(((stack1 = depth0.abbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = depth0.abbrev),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></td><td>"
    + escapeExpression(((stack1 = depth0.age),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.ovr),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.pot),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.hgt),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.stre),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.spd),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.jmp),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.endu),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.ins),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.dnk),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.ft),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.fg),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.tp),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.blk),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.stl),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.drb),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.pss),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.reb),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td><span class=\"skills_alone\">"
    + escapeExpression(helpers.skillsBlock.call(depth0, depth0.skills, {hash:{},data:data}))
    + "</span></td></tr>\n    ";
  return buffer;
  }

function program31(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-nonfluid table-striped table-bordered table-condensed\" id=\"player-awards\">\n  <thead>\n    <tr><th>Season</th><th>Award</th></tr>\n  </thead>\n  <tbody>\n    ";
  stack2 = ((stack1 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.awards)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(32, program32, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </tbody>\n</table>\n";
  return buffer;
  }
function program32(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <tr><td>"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = depth0.type),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td></tr>\n    ";
  return buffer;
  }

function program34(depth0,data) {
  
  
  return "\n<p>None.</p>\n";
  }

function program36(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <tr><td>"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(helpers.currency.call(depth0, depth0.amount, "M", 2, {hash:{},data:data}))
    + "</td></tr>\n    ";
  return buffer;
  }

  buffer += "<div class=\"row-fluid\">\n  <div class=\"span6\">\n    <h1>"
    + escapeExpression(((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n    <div id=\"picture\" class=\"player_picture\">"
    + escapeExpression(helpers.face.call(depth0, ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.face), {hash:{},data:data}))
    + "</div>\n    <div style=\"float: left;\">\n      <strong>"
    + escapeExpression(((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.teamRegion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.teamName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong><br>\n      Height: "
    + escapeExpression(((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.hgtFt)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'"
    + escapeExpression(((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.hgtIn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"<br>\n      Weight: "
    + escapeExpression(((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.weight)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " lbs<br>\n      Age: "
    + escapeExpression(((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.age)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>\n      Born: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.born)),stack1 == null || stack1 === false ? stack1 : stack1.year)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " - "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.born)),stack1 == null || stack1 === false ? stack1 : stack1.loc)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<br>\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.draft)),stack1 == null || stack1 === false ? stack1 : stack1.round), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers['if'].call(depth0, depth0.showContract, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers.unless.call(depth0, depth0.retired, {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n  </div>\n  ";
  stack2 = helpers.unless.call(depth0, depth0.retired, {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</div>\n\n<p></p>\n";
  stack2 = helpers['if'].call(depth0, depth0.showTradeFor, {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n";
  stack2 = helpers['if'].call(depth0, depth0.freeAgent, {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n<h2>Regular Season</h2>\n<h3>Stats</h3>\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"player_stats\">\n  <thead>\n    <tr><th colspan=\"6\"></th><th colspan=\"3\" style=\"text-align: center\" title=\"Field Goals\">FG</th><th colspan=\"3\" style=\"text-align: center\" title=\"Three-Pointers\">3PT</th><th colspan=\"3\" style=\"text-align: center\" title=\"Free Throws\">FT</th><th colspan=\"3\" style=\"text-align: center\" title=\"Rebounds\">Reb</th><th colspan=\"6\"></th></tr>\n    <tr><th>Year</th><th>Team</th><th>Age</th><th title=\"Games Played\">GP</th><th title=\"Games Started\">GS</th><th title=\"Minutes\">Min</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Offensive\">Off</th><th title=\"Defensive\">Def</th><th title=\"Total\">Tot</th><th title=\"Assists\">Ast</th><th title=\"Turnovers\">TO</th><th title=\"Steals\">Stl</th><th title=\"Blocks\">Blk</th><th title=\"Personal Fouls\">PF</th><th title=\"Points\">Pts</th><th title=\"Player Efficiency Rating\">PER</th></tr>\n  </thead>\n  <tbody>\n  ";
  stack2 = ((stack1 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.stats)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program21, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </tbody>\n  <tfoot>\n  ";
  stack2 = helpers['with'].call(depth0, ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.careerStats), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </tfoot>\n</table>\n\n<h3>Shot Locations</h3>\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"player_stats\">\n  <thead>\n    <tr><th colspan=\"6\"></th><th colspan=\"3\" style=\"text-align: center\" title=\"At Rim\">At Rim</th><th colspan=\"3\" style=\"text-align: center\" title=\"Low Post\">Low Post</th><th colspan=\"3\" style=\"text-align: center\" title=\"Mid-Range\">Mid-Range</th><th colspan=\"3\" style=\"text-align: center\" title=\"Three-Pointers\">3PT</th></tr>\n    <tr><th>Year</th><th>Team</th><th>Age</th><th title=\"Games Played\">GP</th><th title=\"Games Started\">GS</th><th title=\"Minutes\">Min</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th></tr>\n  </thead>\n  <tbody>\n  ";
  stack2 = ((stack1 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.stats)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program25, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </tbody>\n  <tfoot>\n  ";
  stack2 = helpers['with'].call(depth0, ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.careerStats), {hash:{},inverse:self.noop,fn:self.program(27, program27, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </tfoot>\n</table>\n\n<h2>Playoffs</h2>\n<h3>Stats</h3>\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"player_stats\">\n  <thead>\n    <tr><th colspan=\"6\"></th><th colspan=\"3\" style=\"text-align: center\" title=\"Field Goals\">FG</th><th colspan=\"3\" style=\"text-align: center\" title=\"Three-Pointers\">3PT</th><th colspan=\"3\" style=\"text-align: center\" title=\"Free Throws\">FT</th><th colspan=\"3\" style=\"text-align: center\" title=\"Rebounds\">Reb</th><th colspan=\"6\"></th></tr>\n    <tr><th>Year</th><th>Team</th><th>Age</th><th title=\"Games Played\">GP</th><th title=\"Games Started\">GS</th><th title=\"Minutes\">Min</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Offensive\">Off</th><th title=\"Defensive\">Def</th><th title=\"Total\">Tot</th><th title=\"Assists\">Ast</th><th title=\"Turnovers\">TO</th><th title=\"Steals\">Stl</th><th title=\"Blocks\">Blk</th><th title=\"Personal Fouls\">PF</th><th title=\"Points\">Pts</th><th title=\"Player Efficiency Rating\">PER</th></tr>\n  </thead>\n  <tbody>\n  ";
  stack2 = ((stack1 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.statsPlayoffs)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program21, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </tbody>\n  <tfoot>\n  ";
  stack2 = helpers['with'].call(depth0, ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.careerStatsPlayoffs), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </tfoot>\n</table>\n\n<h3>Shot Locations</h3>\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"player_stats\">\n  <thead>\n    <tr><th colspan=\"6\"></th><th colspan=\"3\" style=\"text-align: center\" title=\"At Rim\">At Rim</th><th colspan=\"3\" style=\"text-align: center\" title=\"Low Post\">Low Post</th><th colspan=\"3\" style=\"text-align: center\" title=\"Mid-Range\">Mid-Range</th><th colspan=\"3\" style=\"text-align: center\" title=\"Three-Pointers\">3PT</th></tr>\n    <tr><th>Year</th><th>Team</th><th>Age</th><th title=\"Games Played\">GP</th><th title=\"Games Started\">GS</th><th title=\"Minutes\">Min</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th></tr>\n  </thead>\n  <tbody>\n  ";
  stack2 = ((stack1 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.statsPlayoffs)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program25, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </tbody>\n  <tfoot>\n  ";
  stack2 = helpers['with'].call(depth0, ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.careerStatsPlayoffs), {hash:{},inverse:self.noop,fn:self.program(27, program27, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </tfoot>\n</table>\n\n<h2>Ratings</h2>\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"player_ratings\">\n  <thead>\n    <tr><th>Year</th><th>Team</th><th>Age</th><th title=\"Overall\">Ovr</th><th title=\"Potential\">Pot</th><th title=\"Height\">Hgt</th><th title=\"Strength\">Str</th><th title=\"Speed\">Spd</th><th title=\"Jumping\">Jmp</th><th title=\"Endurance\">End</th><th title=\"Inside Scoring\">Ins</th><th title=\"Dunks/Layups\">Dnk</th><th title=\"Free Throw Shooting\">FT</th><th title=\"Two-Point Shooting\">2Pt</th><th title=\"Three-Point Shooting\">3Pt</th><th title=\"Blocks\">Blk</th><th title=\"Steals\">Stl</th><th title=\"Dribbling\">Drb</th><th title=\"Passing\">Pss</th><th title=\"Rebounding\">Reb</th><th>Skills</th></tr>\n  </thead>\n  <tbody>\n    ";
  stack2 = ((stack1 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.ratings)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program29, data, depth0),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </tbody>\n</table>\n\n<h2>Awards</h2>\n";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.awards), {hash:{},inverse:self.program(34, program34, data),fn:self.program(31, program31, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n<h2>Salaries</h2>\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-nonfluid table-striped table-bordered table-condensed\" id=\"player-salaries\">\n  <thead>\n    <tr><th>Season</th><th>Amount</th></tr>\n  </thead>\n  <tbody>\n    ";
  stack2 = ((stack1 = ((stack1 = ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.salaries)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(36, program36, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </tbody>\n  <tfoot>\n    <tr><th>Total</th><th>"
    + escapeExpression(helpers.currency.call(depth0, ((stack1 = depth0.player),stack1 == null || stack1 === false ? stack1 : stack1.salariesTotal), "M", 2, {hash:{},data:data}))
    + "</th></tr>\n  </tfoot>\n</table>";
  return buffer;
  });
templates['teamShotLocations'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <option value=\""
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  stack2 = helpers['if'].call(depth0, depth0.selected, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ">"
    + escapeExpression(((stack1 = depth0.season),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " season</option>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";
  }

  buffer += "<form action=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/team_shot_locations\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"team-shot-locations-select-season\" name=\"season\" class=\"season\">\n    ";
  stack2 = ((stack1 = ((stack1 = depth0.seasons),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </select>\n</form>\n\n<h1>Team Shot Locations "
    + escapeExpression(helpers.new_window.call(depth0, {hash:{},data:data}))
    + "</h1>\n<p>More: <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/team_stats\">Main Stats</a> | <a href=\"/l/"
    + escapeExpression(((stack1 = depth0.lid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/dist_team_stats\">Stat Distributions</a></p>\n\n<p class=\"clearfix\">\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"team-shot-locations\">\n<thead>\n  <tr><th colspan=\"4\"></th><th colspan=\"3\" style=\"text-align: center\" title=\"At Rim\">At Rim</th><th colspan=\"3\" style=\"text-align: center\" title=\"Low Post\">Low Post</th><th colspan=\"3\" style=\"text-align: center\" title=\"Mid-Range\">Mid-Range</th><th colspan=\"3\" style=\"text-align: center\" title=\"Three-Pointers\">3PT</th></tr>\n  <tr><th>Team</th><th title=\"Games Played\">GP</th><th title=\"Won\">W</th><th title=\"Lost\">L</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th></tr>\n</thead>\n</table>\n</p>";
  return buffer;
  });
})();