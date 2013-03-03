(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['boxScore'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, self=this, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n  <h3><a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/roster/";
  foundHelper = helpers.abbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.abbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/";
  stack1 = depth1.game;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.season;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.region;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.region; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " ";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a></h2>\n  <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\">\n  <thead>\n    <tr><th>Name</th><th>Pos</th><th>Min</th><th>FG</th><th>3Pt</th><th>FT</th><th>Off</th><th>Reb</th><th>Ast</th><th>TO</th><th>Stl</th><th>Blk</th><th>PF</th><th>Pts</th></tr>\n  </thead>\n  <tbody>\n  ";
  foundHelper = helpers.players;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program2, data, depth1),data:data}); }
  else { stack1 = depth0.players; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.players) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program2, data, depth1),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </tbody>\n  <tfoot>\n    <tr><td>Total</td><td></td><td>";
  foundHelper = helpers.min;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.min; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.fg;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.fg; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "-";
  foundHelper = helpers.fga;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.fga; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.tp;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tp; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "-";
  foundHelper = helpers.tpa;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tpa; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.ft;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ft; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "-";
  foundHelper = helpers.fta;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.fta; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.orb;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.orb; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.trb;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.trb; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.ast;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ast; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.tov;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tov; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.stl;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.stl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.blk;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.blk; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.pf;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pf; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.pts;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pts; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td></tr>\n  </tfoot>\n  </table>\n";
  return buffer;}
function program2(depth0,data,depth2) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n    <tr";
  stack1 = depth0.separator;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><td><a href=\"/l/";
  stack1 = depth2.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/player/";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>";
  stack1 = depth0.skills;
  stack2 = {};
  foundHelper = helpers.skills_block;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "skills_block", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.pos;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pos; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.min;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.fg;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.fg; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "-";
  foundHelper = helpers.fga;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.fga; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.tp;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tp; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "-";
  foundHelper = helpers.tpa;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tpa; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.ft;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ft; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "-";
  foundHelper = helpers.fta;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.fta; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.orb;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.orb; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.trb;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.trb; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.ast;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ast; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.tov;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tov; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.stl;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.stl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.blk;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.blk; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.pf;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pf; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.pts;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pts; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td></tr>\n  ";
  return buffer;}
function program3(depth0,data) {
  
  
  return " class=\"separator\"";}

  buffer += "<h2><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/roster/";
  stack1 = depth0.game;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.won;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/";
  stack1 = depth0.game;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.season;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.game;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.won;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.region;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.game;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.won;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a> ";
  stack1 = depth0.game;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.won;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pts;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + ", <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/roster/";
  stack1 = depth0.game;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.lost;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/";
  stack1 = depth0.game;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.season;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.game;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.lost;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.region;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.game;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.lost;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a> ";
  stack1 = depth0.game;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.lost;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pts;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1);
  foundHelper = helpers.overtime;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.overtime; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h2>\n";
  stack1 = depth0.game;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.teams;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  stack2 = {};
  stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});
templates['draftSummary'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n	          ['";
  foundHelper = helpers.rnd;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.rnd; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "-";
  foundHelper = helpers.pick;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pick; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "', '<a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/player/";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>', '";
  foundHelper = helpers.pos;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pos; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "', '<a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/roster/";
  foundHelper = helpers.draftAbbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.draftAbbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.draftAbbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.draftAbbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>', '";
  foundHelper = helpers.draftAge;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.draftAge; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "', '";
  foundHelper = helpers.draftOvr;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.draftOvr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "', '";
  foundHelper = helpers.draftPot;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.draftPot; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "', '<span class=\"skills_alone\">";
  stack1 = depth0.draftSkills;
  stack2 = {};
  foundHelper = helpers.skills_block;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "skills_block", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</span>', '<a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/roster/";
  foundHelper = helpers.currentAbbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.currentAbbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.currentAbbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.currentAbbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>', '";
  foundHelper = helpers.currentAge;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.currentAge; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "', '";
  foundHelper = helpers.currentOvr;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.currentOvr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "', '";
  foundHelper = helpers.currentPot;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.currentPot; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "', '<span class=\"skills_alone\">";
  stack1 = depth0.currentSkills;
  stack2 = {};
  foundHelper = helpers.skills_block;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "skills_block", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</span>', '";
  stack1 = depth0.careerStats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.gp;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 0, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 0, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.careerStats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.min;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.careerStats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pts;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.careerStats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.trb;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.careerStats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ast;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.careerStats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.per;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "'],\n        ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <option value=\"";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.selected;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " season</option>\n    ";
  return buffer;}
function program4(depth0,data) {
  
  
  return " selected=\"selected\"";}

  buffer += "<script type=\"text/javascript\">\n$(document).ready(function() {\n    ui.dropdown($('#draft_select_season'));\n\n    ui.datatableSinglePage($('#draft_results'), 0, [\n        ";
  foundHelper = helpers.players;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data}); }
  else { stack1 = depth0.players; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.players) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ]);\n});\n</script>\n\n<form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/draft\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"draft_select_season\" name=\"season\" class=\"season\">\n    ";
  foundHelper = helpers.seasons;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}); }
  else { stack1 = depth0.seasons; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.seasons) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(3, program3, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>\n</form>\n\n<h1>Draft Summary ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n<p>\n  <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"draft_results\">\n  <thead>\n    <tr><th colspan=\"3\"></th><th colspan=\"5\" style=\"text-align: center\">At Draft</th><th colspan=\"5\" style=\"text-align: center\">Current</th><th colspan=\"5\" style=\"text-align: center\">Career Stats</th></tr>\n    <tr><th>Pick</th><th>Name</th><th title=\"Position\">Pos</th><th>Team</th><th>Age</th><th title=\"Overall rating\">Ovr</th><th title=\"Potential rating\">Pot</th><th>Skills</th><th>Team</th><th>Age</th><th title=\"Overall rating\">Ovr</th><th title=\"Potential rating\">Pot</th><th>Skills</th><th title=\"Games Played\">GP</th><th title=\"Minutes Per Game\">Min</th><th title=\"Points Per Game\">PPG</th><th title=\"Rebounds Per Game\">Reb</th><th title=\"Assists Per Game\">Ast</th><th title=\"Player Efficiency Rating\">PER</th></tr>\n  </thead>\n  </table>\n</p>\n";
  return buffer;});
templates['leagueLayout'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"contentwrapper\">\n  <div id=\"league_content\">\n  </div>\n</div>\n\n<div id=\"league_menu\" data-lid=\"";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">\n  <div class=\"well sidebar-nav\">\n    <ul class=\"nav nav-list\" id=\"league_sidebar\">\n      <li id=\"nav_league_dashboard\"><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">Dashboard</a></li>\n      <li class=\"nav-header\">League</li>\n      <li id=\"nav_standings\"><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/standings\">Standings</a></li>\n      <li id=\"nav_playoffs\"><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/playoffs\">Playoffs</a></li>\n      <li id=\"nav_finances\"><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/finances\">Finances</a></li>\n      <li id=\"nav_history\"><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/history\">History</a></li>\n      <li class=\"nav-header\">Team</li>\n      <li id=\"nav_roster\"><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/roster\">Roster</a></li>\n      <li id=\"nav_schedule\"><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/schedule\">Schedule</a></li>\n      <li id=\"nav_team_history\"><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/team_history\">History</a></li>\n      <li class=\"nav-header\">Players</li>\n      <li id=\"nav_free_agents\"><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/free_agents\">Free Agents</a></li>\n      <li id=\"nav_trade\"><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/trade\">Trade</a></li>\n      <li id=\"nav_draft\"><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/draft\">Draft</a></li>\n      <li class=\"nav-header\">Stats</li>\n      <li id=\"nav_game_log\"><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/game_log\">Game Log</a></li>\n      <li id=\"nav_leaders\"><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/leaders\">League Leaders</a></li>\n      <li id=\"nav_player_ratings\"><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player_ratings\">Player Ratings</a></li>\n      <li id=\"nav_player_stats\"><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player_stats\">Player Stats</a></li>\n      <li id=\"nav_team_stats\"><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/team_stats\">Team Stats</a></li>\n    </ul>\n  </div>\n</div>\n";
  return buffer;});
templates['freeAgents'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h1>Free Agents ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"free-agents\">\n<thead>\n  <tr><th>Name</th><th title=\"Position\">Pos</th><th>Age</th><th title=\"Overall\">Ovr</th><th title=\"Potential\">Pot</th><th title=\"Minutes Per Game\">Min</th><th title=\"Points Per Game\">Pts</th><th title=\"Rebounds Per Game\">Reb</th><th title=\"Assists Per Game\">Ast</th><th title=\"Player Efficiency Rating\">PER</th><th>Asking for</th><th>Negotiate</th></tr>\n</thead>\n</table>\n";
  return buffer;});
templates['leaders'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <option value=\"";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.selected;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " season</option>\n    ";
  return buffer;}
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";}

function program4(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n    ";
  stack1 = depth0.newRow;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <div class=\"span4\">\n      <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed leaders\">\n      <thead>\n        <tr><th>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</th><th title=\"";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.stat;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.stat; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</th></tr>\n      </thead>\n      <tbody>\n        ";
  foundHelper = helpers.data;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program7, data, depth1),data:data}); }
  else { stack1 = depth0.data; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.data) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program7, data, depth1),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </tbody>\n      </table>\n    </div>\n  ";
  return buffer;}
function program5(depth0,data) {
  
  
  return "\n</div>\n<p></p>\n<div class=\"row-fluid\">\n    ";}

function program7(depth0,data,depth2) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n          <tr";
  stack1 = depth0.userTeam;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><td>";
  foundHelper = helpers['i'];
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['i']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + ". <a href=\"/l/";
  stack1 = depth2.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/player/";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.skills;
  stack2 = {};
  foundHelper = helpers.skills_block;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "skills_block", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + ", <a href=\"/l/";
  stack1 = depth2.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/roster/";
  foundHelper = helpers.abbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.abbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/";
  stack1 = depth2.season;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.abbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.abbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a></td><td>";
  stack1 = depth0.stat;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</tr>\n        ";
  return buffer;}
function program8(depth0,data) {
  
  
  return " class=\"alert-info\"";}

  buffer += "<form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/leaders\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"leaders-select-season\" name=\"season\" class=\"season\">\n    ";
  foundHelper = helpers.seasons;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  else { stack1 = depth0.seasons; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.seasons) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>\n</form>\n\n<h1>League Leaders ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n\n<p></p>\n<div class=\"row-fluid\">\n  ";
  foundHelper = helpers.categories;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program4, data, depth0),data:data}); }
  else { stack1 = depth0.categories; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.categories) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program4, data, depth0),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;});
templates['browserError'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<h1>Error</h1>\n\n<p>Your browser is not modern enough to run Basketball GM.</p>\n\n<p>Currently, <a href=\"http://www.firefox.com/\">Mozilla Firefox</a> works best with Basketball GM.</p>";});
templates['playerStats'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <option value=\"";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.selected;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " season</option>\n    ";
  return buffer;}
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";}

  buffer += "<form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player_stats\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"player-stats-select-season\" name=\"season\" class=\"season\">\n    ";
  foundHelper = helpers.seasons;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  else { stack1 = depth0.seasons; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.seasons) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>\n</form>\n\n<h1>Player Stats ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n<p>More: <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player_shot_locations\">Shot Locations</a> | <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/dist_player_stats\">Stat Distributions</a></p>\n\n<p class=\"clearfix\">\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"player-stats\">\n<thead>\n  <tr><th colspan=\"6\"></th><th colspan=\"3\" style=\"text-align: center\" title=\"Field Goals\">FG</th><th colspan=\"3\" style=\"text-align: center\" title=\"Three-Pointers\">3PT</th><th colspan=\"3\" style=\"text-align: center\" title=\"Free Throws\">FT</th><th colspan=\"3\" style=\"text-align: center\" title=\"Rebounds\">Reb</th><th colspan=\"6\"></th></tr>\n  <tr><th>Name</th><th title=\"Position\">Pos</th><th>Team</th><th title=\"Games Played\">GP</th><th title=\"Games Started\">GS</th><th title=\"Minutes\">Min</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Offensive\">Off</th><th title=\"Defensive\">Def</th><th title=\"Total\">Tot</th><th title=\"Assists\">Ast</th><th title=\"Turnovers\">TO</th><th title=\"Steals\">Stl</th><th title=\"Blocks\">Blk</th><th title=\"Personal Fouls\">PF</th><th title=\"Points\">Pts</th><th title=\"Player Efficiency Rating\">PER</th></tr>\n</thead>\n</table>\n</p>";
  return buffer;});
templates['trade'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n          <option value=\"";
  foundHelper = helpers.abbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.abbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.selected;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.region;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.region; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " ";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</option>\n        ";
  return buffer;}
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";}

  buffer += "<h1>Trade ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n\n<div class=\"row-fluid\">\n  <div class=\"span7\">\n    <form id=\"rosters\">\n      <p><select id=\"trade-select-team\" name=\"team\" class=\"team form-inline\">\n        ";
  foundHelper = helpers.teams;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  else { stack1 = depth0.teams; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.teams) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </select>\n      <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"roster-other\">\n      <thead>\n        <tr><th></th><th>Name</th><th title=\"Position\">Pos</th><th>Age</th><th title=\"Overall Rating\">Ovr</th><th title=\"Potential Rating\">Pot</th><th>Contract</th><th title=\"Minutes Per Game\">Min</th><th title=\"Points Per Game\">Pts</th><th title=\"Rebounds Per Game\">Reb</th><th title=\"Assists Per Game\">Ast</th><th title=\"Player Efficiency Rating\">PER</th></tr>\n      </thead>\n      </table>\n      </p>\n\n      <h2>";
  foundHelper = helpers.userTeamName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.userTeamName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h2>\n      <p>\n      <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"roster-user\">\n      <thead>\n        <tr><th></th><th>Name</th><th title=\"Position\">Pos</th><th>Age</th><th title=\"Overall Rating\">Ovr</th><th title=\"Potential Rating\">Pot</th><th>Contract</th><th title=\"Minutes Per Game\">Min</th><th title=\"Points Per Game\">Pts</th><th title=\"Rebounds Per Game\">Reb</th><th title=\"Assists Per Game\">Ast</th><th title=\"Player Efficiency Rating\">PER</th></tr>\n      </thead>\n      </table>\n      </p>\n    </form>\n  </div>\n  <div class=\"span5\" id=\"trade-summary\">\n    ";
  foundHelper = helpers.tradeSummary;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tradeSummary; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</div>";
  return buffer;});
templates['tradeSummary'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n        <li><a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/player/";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a> ($";
  stack1 = depth0.contractAmount;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M)</li>\n      ";
  return buffer;}

function program3(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n        <li><a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/player/";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a> ($";
  stack1 = depth0.contractAmount;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M)</li>\n      ";
  return buffer;}

function program5(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n        <li><a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/player/";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a> ($";
  stack1 = depth0.contractAmount;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M)</li>\n      ";
  return buffer;}

function program7(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n        <li><a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/player/";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a> ($";
  stack1 = depth0.contractAmount;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M)</li>\n      ";
  return buffer;}

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<p class=\"alert alert-error\"><strong>Warning!</strong> ";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.warning;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>";
  return buffer;}

function program11(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<p class=\"alert alert-info\">";
  foundHelper = helpers.message;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</p>\n";
  return buffer;}

function program13(depth0,data) {
  
  
  return " disabled=\"disabled\"";}

  buffer += "<h3>Trade Summary</h3>\n<div class=\"row-fluid\">\n  <div class=\"span6\">\n    <h4>";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.teams;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[0];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h4>\n    <h5>Trade Away:</h5>\n    <ul>\n      ";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.teams;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[0];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.trade;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  stack2 = {};
  stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <li>$";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.teams;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[0];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.total;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M Total</li>\n    </ul>\n    <h5>Receive:</h5>\n    <ul>\n      ";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.teams;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[1];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.trade;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  stack2 = {};
  stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program3, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <li>$";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.teams;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[1];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.total;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M Total</li>\n    </ul>\n    <h5>Payroll after trade: $";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.teams;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[0];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.payrollAfterTrade;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M</h5>\n    <h5>Salary cap: $";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.salaryCap;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M</h5>\n  </div>\n  <div class=\"span6\">\n    <h4>";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.teams;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[1];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h4>\n    <h5>Trade Away:</h5>\n    <ul>\n      ";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.teams;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[1];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.trade;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  stack2 = {};
  stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program5, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <li>$";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.teams;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[1];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.total;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M Total</li>\n    </ul>\n    <h5>Receive:</h5>\n    <ul>\n      ";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.teams;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[0];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.trade;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  stack2 = {};
  stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program7, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <li>$";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.teams;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[0];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.total;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M Total</li>\n    </ul>\n    <h5>Payroll after trade: $";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.teams;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[1];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.payrollAfterTrade;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M</h5>\n    <h5>Salary cap: $";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.salaryCap;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M</h5>\n  </div>\n</div>\n\n<br>\n";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.warning;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  stack1 = depth0.message;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<center>\n  <form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/trade\" method=\"POST\" id=\"propose-trade\">\n    <input type=\"hidden\" name=\"propose\" value=\"1\">\n    <button type=\"submit\" class=\"btn btn-large btn-primary\"";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.disablePropose;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">Propose Trade</button>\n  </form>\n\n  <form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/trade\" method=\"POST\" id=\"clear-trade\">\n    <input type=\"hidden\" name=\"clear\" value=\"1\">\n    <button type=\"submit\" class=\"btn\">Clear Trade</button>\n  </form>\n</center>\n";
  return buffer;});
templates['leagueDashboard'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var stack1, stack2;
  stack1 = depth0.streakLong;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }}
function program2(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += ", ";
  foundHelper = helpers.streakLong;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.streakLong; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1);
  return buffer;}

function program4(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n        <b>";
  foundHelper = helpers.seriesTitle;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.seriesTitle; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</b><br>\n        ";
  stack1 = {};
  foundHelper = helpers.matchup;
  stack1 = foundHelper ? foundHelper.call(depth0, 0, 0, {hash:stack1,data:data}) : helperMissing.call(depth0, "matchup", 0, 0, {hash:stack1,data:data});
  buffer += escapeExpression(stack1) + "<br>\n      ";
  return buffer;}

function program6(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n        ";
  foundHelper = helpers.rank;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.rank; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "th place in conference<br>\n        (Top 8 teams make the playoffs)<br>\n      ";
  return buffer;}

function program8(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n        <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/playoffs\">» Playoffs</a>\n      ";
  return buffer;}

function program10(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n        <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/playoffs\">» Playoffs Projections</a>\n      ";
  return buffer;}

function program12(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n        Next Game: ";
  stack1 = depth0.nextGameHome;
  stack2 = {};
  stack1 = helpers.unless.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/roster/";
  foundHelper = helpers.nextGameAbbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.nextGameAbbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.nextGameAbbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.nextGameAbbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a><br>\n      ";
  return buffer;}
function program13(depth0,data) {
  
  
  return "@";}

function program15(depth0,data) {
  
  
  return "No completed games yet this season.<br>";}

function program17(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n        ";
  stack1 = depth0.home;
  stack2 = {};
  stack1 = helpers.unless.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/roster/";
  foundHelper = helpers.oppAbbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.oppAbbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.oppAbbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.oppAbbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>, ";
  stack1 = depth0.won;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(22, program22, data),fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " <a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/game_log/";
  stack1 = depth1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/";
  stack1 = depth1.season;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.gid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.gid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.pts;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pts; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "-";
  foundHelper = helpers.oppPts;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.oppPts; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1);
  foundHelper = helpers.overtime;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.overtime; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a><br>\n      ";
  return buffer;}
function program18(depth0,data) {
  
  
  return "@";}

function program20(depth0,data) {
  
  
  return "won";}

function program22(depth0,data) {
  
  
  return "lost";}

function program24(depth0,data) {
  
  
  return "None yet.<br>";}

function program26(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n        <a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/roster/";
  stack1 = depth1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>: <a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/standings/";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.won;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.won; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "-";
  foundHelper = helpers.lost;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lost; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>";
  stack1 = depth0.extraText;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program27, data, depth1),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<br>\n      ";
  return buffer;}
function program27(depth0,data,depth2) {
  
  var buffer = "", stack1, foundHelper;
  buffer += ", <a href=\"/l/";
  stack1 = depth2.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/playoffs/";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.extraText;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.extraText; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>";
  return buffer;}

function program29(depth0,data) {
  
  
  return "None.<br>";}

function program31(depth0,data,depth1) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n        <a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/player/";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>: ";
  foundHelper = helpers.age;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.age; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " yo, ";
  foundHelper = helpers.ovr;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ovr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " ovr, ";
  foundHelper = helpers.pot;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pot; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " pot</span><br>\n      ";
  return buffer;}

function program33(depth0,data) {
  
  
  return "None.<br>";}

function program35(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n        <a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/player/";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>: ";
  foundHelper = helpers.age;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.age; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " yo, $";
  stack1 = depth0.contractAmount;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M<br>\n        <span style=\"margin-left: 2em\">";
  stack1 = depth0.pts;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " pts, ";
  foundHelper = helpers.ovr;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ovr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " ovr, ";
  foundHelper = helpers.pot;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pot; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " pot</span><br>\n      ";
  return buffer;}

  buffer += "<h1>";
  foundHelper = helpers.region;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.region; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " ";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " Dashboard ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n\n<div class=\"row-fluid\">\n  <div class=\"span4\">\n    <h3>Current Record</h3>\n    <p>\n      ";
  foundHelper = helpers.won;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.won; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "-";
  foundHelper = helpers.lost;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lost; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1);
  stack1 = depth0.playoffsStarted;
  stack2 = {};
  stack1 = helpers.unless.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<br>\n      <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/standings\">» Standings</a>\n    </p>\n\n    <h3>Playoffs</h3>\n    <p>\n      ";
  stack1 = depth0.showPlayoffSeries;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = depth0.playoffsStarted;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </p>\n\n    <h3>Recent Games</h3>\n    <p>\n      ";
  stack1 = depth0.nextGameAbbrev;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = depth0.recentGames;
  stack2 = {};
  stack1 = helpers.unless.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  foundHelper = helpers.recentGames;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program17, data, depth0),data:data}); }
  else { stack1 = depth0.recentGames; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.recentGames) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program17, data, depth0),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/game_log\">» Game Log</a><br>\n      <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/standings\">» Schedule</a>\n    </p>\n\n    <h3>Recent History</h3>\n    <p>\n      ";
  stack1 = depth0.recentHistory;
  stack2 = {};
  stack1 = helpers.unless.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  foundHelper = helpers.recentHistory;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program26, data, depth0),data:data}); }
  else { stack1 = depth0.recentHistory; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.recentHistory) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program26, data, depth0),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/team_history\">» Team History</a><br>\n      <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/history\">» League History</a>\n    </p>\n\n  </div>\n  <div class=\"span4\">\n    <h3>Team Stats</h3>\n    <p>\n      Points: ";
  stack1 = depth0.pts;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " (";
  foundHelper = helpers.ptsRank;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ptsRank; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "th)<br>\n      Allowed: ";
  stack1 = depth0.oppPts;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " (";
  foundHelper = helpers.oppPtsRank;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.oppPtsRank; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "th)<br>\n      Rebounds: ";
  stack1 = depth0.trb;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " (";
  foundHelper = helpers.trbRank;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.trbRank; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "th)<br>\n      Assists: ";
  stack1 = depth0.ast;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " (";
  foundHelper = helpers.astRank;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.astRank; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "th)<br>\n      <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/team_stats\">» Team Stats</a>\n    </p>\n\n    <h3>Team Leaders</h3>\n    <p>\n      <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player/";
  stack1 = depth0.teamLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pts;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.teamLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pts;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a>: ";
  stack1 = depth0.teamLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pts;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.stat;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " pts<br>\n      <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player/";
  stack1 = depth0.teamLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.trb;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.teamLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.trb;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a>: ";
  stack1 = depth0.teamLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.trb;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.stat;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " reb<br>\n      <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player/";
  stack1 = depth0.teamLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ast;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.teamLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ast;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a>: ";
  stack1 = depth0.teamLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ast;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.stat;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " ast<br>\n      <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/roster\">» Full Roster</a>\n    </p>\n\n    <h3>League Leaders</h3>\n    <p>\n      <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player/";
  stack1 = depth0.leagueLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pts;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.leagueLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pts;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a>, <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/roster/";
  stack1 = depth0.leagueLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pts;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.leagueLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pts;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a>: ";
  stack1 = depth0.leagueLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pts;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.stat;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " pts<br>\n      <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player/";
  stack1 = depth0.leagueLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.trb;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.leagueLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.trb;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a>, <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/roster/";
  stack1 = depth0.leagueLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.trb;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.leagueLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.trb;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a>: ";
  stack1 = depth0.leagueLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.trb;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.stat;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " reb<br>\n      <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player/";
  stack1 = depth0.leagueLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ast;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.leagueLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ast;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a>, <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/roster/";
  stack1 = depth0.leagueLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ast;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.leagueLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ast;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a>: ";
  stack1 = depth0.leagueLeaders;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ast;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.stat;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " ast<br>\n      <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/leaders\">» League Leaders</a><br>\n      <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player_stats\">» Player Stats</a>\n    </p>\n  </div>\n  <div class=\"span4\">\n    <h3>Finances</h3>\n    <p>\n      Avg Attendance: ";
  stack1 = depth0.att;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "<br>\n      Revenue (YTD): $";
  stack1 = depth0.revenue;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M<br>\n      Profit (YTD): $";
  stack1 = depth0.profit;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M<br>\n      Cash: $";
  stack1 = depth0.cash;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M<br>\n      Payroll: $";
  stack1 = depth0.payroll;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M<br>\n      Salary Cap: $";
  stack1 = depth0.salaryCap;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M<br>\n      <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/finances\">» League Finances</a>\n    </p>\n\n    <h3>Top Free Agents</h3>\n    <p>\n      ";
  stack1 = depth0.freeAgents;
  stack2 = {};
  stack1 = helpers.unless.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(29, program29, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  foundHelper = helpers.freeAgents;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program31, data, depth0),data:data}); }
  else { stack1 = depth0.freeAgents; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.freeAgents) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program31, data, depth0),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      (You have ";
  foundHelper = helpers.numRosterSpots;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.numRosterSpots; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " open roster spots)<br>\n      <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/free_agents\">» Free Agents</a>\n    </p>\n\n    <h3>Expiring Contracts</h3>\n    <p>\n      ";
  stack1 = depth0.expiring;
  stack2 = {};
  stack1 = helpers.unless.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(33, program33, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  foundHelper = helpers.expiring;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program35, data, depth0),data:data}); }
  else { stack1 = depth0.expiring; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.expiring) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program35, data, depth0),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/roster\">» Full Roster</a>\n    </p>\n  </div>\n</div>";
  return buffer;});
templates['distTeamStats'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <option value=\"";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.selected;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " season</option>\n    ";
  return buffer;}
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";}

  buffer += "<script type=\"text/javascript\">\n$(document).ready(function() {\n  ui.dropdown($(\"#dist_team_stats_select_season\"));\n});\n</script>\n\n<form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/dist_team_stats\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"dist_team_stats_select_season\" name=\"season\" class=\"season\">\n    ";
  foundHelper = helpers.seasons;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  else { stack1 = depth0.seasons; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.seasons) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>\n</form>\n\n<h1>Team Stat Distributions ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n<p>More: <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/team_stats\">Main Stats</a> | <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/team_shot_locations\">Shot Locations</a></p>\n\n<p>These <a href=\"http://en.wikipedia.org/wiki/Box_plot\">box plots</a> show the league-wide distributions of team stats for the selected season. Black plots are for this league and blue plots are from the 2010-2011 NBA season, for comparison. The five vertical lines in each plot represent the minimum of the scale, the minimum, the first <a href=\"http://en.wikipedia.org/wiki/Quartile\">quartile</a>, the median, the third quartile, the maximum, and the maximum of the scale.</p>\n\n<p>\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" id=\"dist_team_stats\">\n  <tbody></tbody>\n</table>\n</p>\n";
  return buffer;});
templates['standings'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <option value=\"";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.selected;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " season</option>\n    ";
  return buffer;}
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";}

function program4(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n  <h2>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h2>\n  <div class=\"row-fluid\">\n    <div class=\"span9\">\n      ";
  foundHelper = helpers.divs;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program5, data, depth1),data:data}); }
  else { stack1 = depth0.divs; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.divs) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program5, data, depth1),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n\n    <div class=\"span3\">\n      <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\">\n      <thead>\n        <tr><th width=\"100%\">Team</th><th align=\"right\">GB</th></tr>\n      </thead>\n      <tbody>\n      ";
  foundHelper = helpers.teams;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program8, data, depth1),data:data}); }
  else { stack1 = depth0.teams; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.teams) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program8, data, depth1),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </tbody>\n      </table>\n    </div>\n  </div>\n";
  return buffer;}
function program5(depth0,data,depth2) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n          <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\">\n          <thead>\n            <tr><th width=\"100%\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</th><th>W</th><th>L</th><th>Pct</th><th>GB</th><th>Home</th><th>Road</th><th>Div</th><th>Conf</th><th>Streak</th><th>L10</th></tr>\n          </thead>\n          <tbody>\n          ";
  foundHelper = helpers.teams;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program6, data, depth2),data:data}); }
  else { stack1 = depth0.teams; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.teams) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program6, data, depth2),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </tbody>\n          </table>\n      ";
  return buffer;}
function program6(depth0,data,depth3) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n            <tr><td><a href=\"/l/";
  stack1 = depth3.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/roster/";
  foundHelper = helpers.abbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.abbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.region;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.region; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " ";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a></td><td>";
  foundHelper = helpers.won;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.won; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.lost;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lost; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.winp;
  stack2 = {};
  foundHelper = helpers.roundWinp;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "roundWinp", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.gb;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.gb; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.wonHome;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.wonHome; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "-";
  foundHelper = helpers.lostHome;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lostHome; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.wonAway;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.wonAway; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "-";
  foundHelper = helpers.lostAway;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lostAway; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.wonDiv;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.wonDiv; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "-";
  foundHelper = helpers.lostDiv;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lostDiv; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.wonConf;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.wonConf; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "-";
  foundHelper = helpers.lostConf;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lostConf; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.streak;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.streak; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.lastTen;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lastTen; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td></tr>\n          ";
  return buffer;}

function program8(depth0,data,depth2) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n        <tr";
  stack1 = depth0.separator;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><td>";
  foundHelper = helpers.rank;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.rank; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + ". <a href=\"/l/";
  stack1 = depth2.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/roster/";
  foundHelper = helpers.abbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.abbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.region;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.region; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a></td><td align=\"right\">";
  foundHelper = helpers.gb;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.gb; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td></tr>\n      ";
  return buffer;}
function program9(depth0,data) {
  
  
  return " class=\"separator\"";}

  buffer += "<form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/standings\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"standings-select-season\" name=\"season\" class=\"season\">\n    ";
  foundHelper = helpers.seasons;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  else { stack1 = depth0.seasons; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.seasons) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>\n</form>\n\n<h1>Standings ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n\n";
  foundHelper = helpers.confs;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program4, data, depth0),data:data}); }
  else { stack1 = depth0.confs; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.confs) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program4, data, depth0),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;});
templates['playoffs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <option value=\"";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.selected;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " season</option>\n    ";
  return buffer;}
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";}

function program4(depth0,data) {
  
  
  return "<p>This is what the playoff matchups would be if the season ended right now.</p>";}

  buffer += "<form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/playoffs\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"playoffs-select-season\" name=\"season\" class=\"season\">\n    ";
  foundHelper = helpers.seasons;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  else { stack1 = depth0.seasons; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.seasons) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>\n</form>\n\n<h1>Playoffs ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n\n";
  stack1 = depth0.finalMatchups;
  stack2 = {};
  stack1 = helpers.unless.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<p>\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table-condensed\" width=\"100%\">\n<tbody>\n  <tr>\n    <td width=\"14.28%\">\n      ";
  stack1 = {};
  foundHelper = helpers.matchup;
  stack1 = foundHelper ? foundHelper.call(depth0, 0, 0, {hash:stack1,data:data}) : helperMissing.call(depth0, "matchup", 0, 0, {hash:stack1,data:data});
  buffer += escapeExpression(stack1) + "\n    </td>\n    <td rowspan=\"2\" width=\"14.28%\">\n      ";
  stack1 = {};
  foundHelper = helpers.matchup;
  stack1 = foundHelper ? foundHelper.call(depth0, 1, 0, {hash:stack1,data:data}) : helperMissing.call(depth0, "matchup", 1, 0, {hash:stack1,data:data});
  buffer += escapeExpression(stack1) + "\n    </td>\n    <td rowspan=\"4\" width=\"14.28%\">\n      ";
  stack1 = {};
  foundHelper = helpers.matchup;
  stack1 = foundHelper ? foundHelper.call(depth0, 2, 0, {hash:stack1,data:data}) : helperMissing.call(depth0, "matchup", 2, 0, {hash:stack1,data:data});
  buffer += escapeExpression(stack1) + "\n    </td>\n    <td rowspan=\"4\" width=\"14.28%\">\n      ";
  stack1 = {};
  foundHelper = helpers.matchup;
  stack1 = foundHelper ? foundHelper.call(depth0, 3, 0, {hash:stack1,data:data}) : helperMissing.call(depth0, "matchup", 3, 0, {hash:stack1,data:data});
  buffer += escapeExpression(stack1) + "\n    </td>\n    <td rowspan=\"4\" width=\"14.28%\">\n      ";
  stack1 = {};
  foundHelper = helpers.matchup;
  stack1 = foundHelper ? foundHelper.call(depth0, 2, 1, {hash:stack1,data:data}) : helperMissing.call(depth0, "matchup", 2, 1, {hash:stack1,data:data});
  buffer += escapeExpression(stack1) + "\n    </td>\n    <td rowspan=\"2\" width=\"14.28%\">\n      ";
  stack1 = {};
  foundHelper = helpers.matchup;
  stack1 = foundHelper ? foundHelper.call(depth0, 1, 2, {hash:stack1,data:data}) : helperMissing.call(depth0, "matchup", 1, 2, {hash:stack1,data:data});
  buffer += escapeExpression(stack1) + "\n    </td>\n    <td width=\"14.28%\">\n      ";
  stack1 = {};
  foundHelper = helpers.matchup;
  stack1 = foundHelper ? foundHelper.call(depth0, 0, 4, {hash:stack1,data:data}) : helperMissing.call(depth0, "matchup", 0, 4, {hash:stack1,data:data});
  buffer += escapeExpression(stack1) + "\n    </td>\n  </tr>\n  <tr>\n    <td>\n      ";
  stack1 = {};
  foundHelper = helpers.matchup;
  stack1 = foundHelper ? foundHelper.call(depth0, 0, 1, {hash:stack1,data:data}) : helperMissing.call(depth0, "matchup", 0, 1, {hash:stack1,data:data});
  buffer += escapeExpression(stack1) + "\n    </td>\n    <td>\n      ";
  stack1 = {};
  foundHelper = helpers.matchup;
  stack1 = foundHelper ? foundHelper.call(depth0, 0, 5, {hash:stack1,data:data}) : helperMissing.call(depth0, "matchup", 0, 5, {hash:stack1,data:data});
  buffer += escapeExpression(stack1) + "\n    </td>\n  </tr>\n  <tr>\n    <td>\n      ";
  stack1 = {};
  foundHelper = helpers.matchup;
  stack1 = foundHelper ? foundHelper.call(depth0, 0, 2, {hash:stack1,data:data}) : helperMissing.call(depth0, "matchup", 0, 2, {hash:stack1,data:data});
  buffer += escapeExpression(stack1) + "\n    </td>\n    <td rowspan=\"2\">\n      ";
  stack1 = {};
  foundHelper = helpers.matchup;
  stack1 = foundHelper ? foundHelper.call(depth0, 1, 1, {hash:stack1,data:data}) : helperMissing.call(depth0, "matchup", 1, 1, {hash:stack1,data:data});
  buffer += escapeExpression(stack1) + "\n    </td>\n    <td rowspan=\"2\">\n      ";
  stack1 = {};
  foundHelper = helpers.matchup;
  stack1 = foundHelper ? foundHelper.call(depth0, 1, 3, {hash:stack1,data:data}) : helperMissing.call(depth0, "matchup", 1, 3, {hash:stack1,data:data});
  buffer += escapeExpression(stack1) + "\n    </td>\n    <td>\n      ";
  stack1 = {};
  foundHelper = helpers.matchup;
  stack1 = foundHelper ? foundHelper.call(depth0, 0, 6, {hash:stack1,data:data}) : helperMissing.call(depth0, "matchup", 0, 6, {hash:stack1,data:data});
  buffer += escapeExpression(stack1) + "\n    </td>\n  </tr>\n  <tr>\n    <td>\n      ";
  stack1 = {};
  foundHelper = helpers.matchup;
  stack1 = foundHelper ? foundHelper.call(depth0, 0, 3, {hash:stack1,data:data}) : helperMissing.call(depth0, "matchup", 0, 3, {hash:stack1,data:data});
  buffer += escapeExpression(stack1) + "\n    </td>\n    <td>\n      ";
  stack1 = {};
  foundHelper = helpers.matchup;
  stack1 = foundHelper ? foundHelper.call(depth0, 0, 7, {hash:stack1,data:data}) : helperMissing.call(depth0, "matchup", 0, 7, {hash:stack1,data:data});
  buffer += escapeExpression(stack1) + "\n    </td>\n  </tr>\n</tbody>\n</table>\n</p>\n";
  return buffer;});
templates['teamStats'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <option value=\"";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.selected;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " season</option>\n    ";
  return buffer;}
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";}

  buffer += "<form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/team_stats\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"team-stats-select-season\" name=\"season\" class=\"season\">\n    ";
  foundHelper = helpers.seasons;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  else { stack1 = depth0.seasons; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.seasons) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>\n</form>\n\n<h1>Team Stats ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n<p>More: <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/team_shot_locations\">Shot Locations</a> | <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/dist_team_stats\">Stat Distributions</a></p>\n\n<p class=\"clearfix\">\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"team-stats\">\n<thead>\n  <tr><th colspan=\"4\"></th><th colspan=\"3\" style=\"text-align: center\" title=\"Field Goals\">FG</th><th colspan=\"3\" style=\"text-align: center\" title=\"Three-Pointers\">3PT</th><th colspan=\"3\" style=\"text-align: center\" title=\"Free Throws\">FT</th><th colspan=\"3\" style=\"text-align: center\" title=\"Rebounds\">Reb</th><th colspan=\"7\"></th></tr>\n  <tr><th>Team</th><th title=\"Games Played\">GP</th><th title=\"Won\">W</th><th title=\"Lost\">L</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Offensive\">Off</th><th title=\"Defensive\">Def</th><th title=\"Total\">Tot</th><th title=\"Assists\">Ast</th><th title=\"Turnovers\">TO</th><th title=\"Steals\">Stl</th><th title=\"Blocks\">Blk</th><th title=\"Personal Fouls\">PF</th><th title=\"Points\">Pts</th><th title=\"Opponent's Points\">OPts</th></tr>\n</thead>\n</table>\n</p>";
  return buffer;});
templates['manualOverview'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<h1>Basketball GM Manual</h1>\n\n<p>Basketball GM is a completely free sports management simulation game. You are the general manager of a basketball team, tasked with building your roster to compete for a championship while managing your finances. As of now, your goal can be whatever you want: winning the most championships, making the most profit, developing players from rookies to stars, etc. You can make an unlimited number of different leagues from <a href=\"/\">the dashboard</a>, each one with a different set of random players.</p>\n\n<h2>User Interface</h2>\n\n<p>From within a league, the most important user interface element is the Play Menu, which you can access with the big blue Play button at the top of the screen. Any context-dependent action, like playing a game or moving from one phase to another, is done from the Play Menu. Everything else about the user interface should (hopefully) be self-explanitory.</p>\n\n<h2>Gameplay Overview</h2>\n\n<p>Each season of the game is divided into several phases:</p>\n\n<ul>\n  <li><b>Preaseason.</b> Players develop/age (<i>i.e.</i> their ratings change). Young players tend to get better, old players tend to get worse.</li>\n  <li><b>Regular season.</b> Regular season games are played, at the pace you choose through the Play menu.</li>\n  <li><b>Playoffs.</b> Teams that made the playoffs (top 8 in each conference) progress through the bracket playing best-of-7 series until a champion emerges.</li>\n  <li><b>Pre-draft.</b> After the playoffs end, you have one more chance to make changes to your roster before the draft, such as releasing a player to make room on your roster for a new player.</li>\n  <li><b>Draft.</b> Similar to the NBA draft (although there is no lottery), teams are ordered from worst to best for two rounds.</li>\n  <li><b>Post-draft.</b> After the draft, you have one more chance to make changes to your roster before free agency.</li>\n  <li><b>Free agency.</b> Contracts expire. For players on your team, you will have the chance to negotiate a new contract with each player whose contract expires. Otherwise, players with expiring contracts become free agents. The same thing happens for the other teams, so the free agents list is most richly populated at this time.</li>\n</ul>\n\n<h2>League Rules</h2>\n\n<p>League rules are generally modeled on the NBA, but simplified.</p>\n\n<h3>Salary cap</h3>\n\n<p>The salary cap is $60 million. This is a soft cap, in the sense that even if you are over the salary cap, you can still:</p>\n\n<ul>\n  <li>Draft players and add their salaries</li>\n  <li>Resign your current players (like the <a href=\"http://en.wikipedia.org/wiki/NBA_salary_cap#Larry_Bird_exception\">Larry Bird exception</a>)</li>\n  <li>Sign free agents to minimum contracts ($500k)</li>\n</ul>\n\n<h3>Contracts</h3>\n\n<p>The maximum contract amount is $20 million per year and the maximum contract length is 5 years.</p>\n\n<p>The minimum contract amount is $500 thousand per year and the minimum contract length is 1 year (or, until the end of the season, if the season is already in progress).</p>\n\n<p>When a contract expires, you have the opportunity to negotiate a new contract with the player. If you don't come to an agreement, the player becomes a free agent. This is important because, based on the salary cap rules, you can go over the cap to resign your own players but you can't go over the cap to sign a free agent.</p>\n\n<h3>Roster</h3>\n\n<p>The maximum roster size is 15. You can never exceed this, except during the draft. But right after that, you'll have to release or buy out enough players to get under the limit.</p>\n\n<p>The minimum roster size is 5. You must be above this limit to play games.</p>\n\n<h2>Player Ratings</h2>\n\n<p>Player ratings for a variety of categories (shooting, rebounding, passing, dribbling, etc.) are on a scale from 0-100. The whole scale is used, so a typical value for a rating is 50. Roughly, the overall (average) player ratings mean:</p>\n\n<ul>\n  <li><b>90s:</b> All-time great</li>\n  <li><b>80s:</b> MVP candidate</li>\n  <li><b>70s:</b> All League candidate</li>\n  <li><b>60s:</b> Good starter</li>\n  <li><b>50s:</b> Role player</li>\n  <li><b>40s and lower:</b> Bench</li>\n</ul>\n\n<p>However, the overall ratings aren't a guarantee of performance. The particular mix of ratings plays into success (<i>e.g.</i> a short player having a 100 shot blocking rating doesn't do much), as do a player's teammates (<i>e.g.</i> a good rebounder doesn't help your team as much if you already have a few other good rebounders).</p>\n\n<h2>How does it work?</h2>\n\n<p>There are no accounts, no passwords, no nothing. All the game data is stored locally on your computer using <a href=\"https://www.google.com/search?q=indexeddb\">IndexedDB</a>. This has advantages and disadvantages. The main advantage is that it is really cheap to run this game, since simulations can occur in your web browser rather than a central server; this is what allows the game to be free and unlimited. The two main disadvantages are (1) doing simulations in your web browser incurs some performance restrictions (but it's not that bad), and (2) since the games are stored on your computer and not on a server, you can't access the same leagues on different computers (eventually this will be possible though).</p>\n\n<h2>Performance</h2>\n\n<p>Game simulation can be taxing on your computer, particularly as additional seasons are simulated and the database grows. There are a couple of tricks you can use to speed this up:</p>\n\n<ol>\n  <li>Don't open multiple windows/tabs viewing while you are simulating games. If you do, then all of the windows will try to update their content every day, which takes valuable computing resources away from actually simulating the games.</li>\n  <li>Don't have a complicated page open within your league when you simulate games. As the simulation progresses, the content of whatever you're viewing updates each day. If you're viewing something complex like the league dashboard, this can be a little slow. If you view something simple like the schedule, it will be faster.</li>\n</ol>\n\n<h2>Make Basketball GM better!</h2>\n\n<p>Basketball GM is open source. That means you can copy/edit/improve/redistribute the game. <a href=\"https://github.com/jdscheff/basketball-gm\">The code is on GitHub</a>, avaliable under the <a href=\"http://www.gnu.org/licenses/agpl-3.0.html\">GNU Affero General Public License</a>. If you want to help make Basketball GM better, there are tons of ways you can help. You can start hacking on anything you want or <a href=\"mailto:jdscheff@gmail.com\">send me an email</a> if you want to discuss things first.</p>\n\n<h2>Still not sure about something?</h2>\n\n<p>If you have a question or think you found a bug or you want to request a feature, either <a href=\"mailto:commissioner@basketball-gm.com\">send an email</a> (commissioner@basketball-gm.com) or <a href=\"https://github.com/jdscheff/basketball-gm/issues\">submit an issue on GitHub</a>.</p>";});
templates['history'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <option value=\"";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.selected;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " season</option>\n    ";
  return buffer;}
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";}

function program4(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <b>";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</b><br>\n      ";
  foundHelper = helpers.players;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program5, data, depth1),data:data}); }
  else { stack1 = depth0.players; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.players) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program5, data, depth1),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;}
function program5(depth0,data,depth2) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n        <a href=\"/l/";
  stack1 = depth2.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/player/";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a> (<a href=\"/l/";
  stack1 = depth2.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/roster/";
  foundHelper = helpers.abbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.abbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/";
  stack1 = depth2.season;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.abbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.abbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>)<br>\n      ";
  return buffer;}

function program7(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <b>";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</b><br>\n      ";
  foundHelper = helpers.players;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program8, data, depth1),data:data}); }
  else { stack1 = depth0.players; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.players) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program8, data, depth1),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;}
function program8(depth0,data,depth2) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n        <a href=\"/l/";
  stack1 = depth2.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/player/";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a> (<a href=\"/l/";
  stack1 = depth2.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/roster/";
  foundHelper = helpers.abbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.abbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/";
  stack1 = depth2.season;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.abbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.abbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>)<br>\n      ";
  return buffer;}

function program10(depth0,data,depth1) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n      <a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/player/";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a> (overall rating: ";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ovr;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "; age: ";
  foundHelper = helpers.age;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.age; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + ")<br>\n    ";
  return buffer;}

  buffer += "<form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/history\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"history-select-season\" name=\"season\" class=\"season\">\n    ";
  foundHelper = helpers.seasons;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  else { stack1 = depth0.seasons; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.seasons) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>\n</form>\n\n<h1>Season Summary ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n\n<p></p>\n<div class=\"row-fluid\">\n  <div class=\"span4\">\n    <h4>League Champions</h4>\n    <p><strong><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/roster/";
  stack1 = depth0.champ;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.champ;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.region;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.champ;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a></strong><br>\n    <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/playoffs/";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">Playoffs Bracket</a></p>\n    <h4>Best Record</h4>\n    <p>East: <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/roster/";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.bre;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.bre;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.region;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.bre;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a> (";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.bre;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.won;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "-";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.bre;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.lost;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + ")<br>\n    West: <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/roster/";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.brw;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.brw;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.region;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.brw;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a> (";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.brw;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.won;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "-";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.brw;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.lost;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + ")<br></p>\n    <h4>Most Valueable Player</h4>\n    <p><strong><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player/";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.mvp;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.mvp;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a></strong> (<a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/roster/";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.mvp;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.mvp;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a>)<br>\n    ";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.mvp;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pts;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " pts, ";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.mvp;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.trb;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " reb, ";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.mvp;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ast;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " ast</p>\n    <h4>Defensive Player of the Year</h4>\n    <p><strong><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player/";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.dpoy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.dpoy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a></strong> (<a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/roster/";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.dpoy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.dpoy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a>)<br>\n    ";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.dpoy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.trb;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " reb, ";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.dpoy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.blk;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " blk, ";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.dpoy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.stl;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " stl</p>\n    <h4>Sixth Man of the Year</h4>\n    <p><strong><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player/";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.smoy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.smoy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a></strong> (<a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/roster/";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.smoy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.smoy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a>)<br>\n    ";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.smoy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pts;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " pts, ";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.smoy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.trb;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " reb, ";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.smoy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ast;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " ast</p>\n    <h4>Rookie of the Year</h4>\n    <p><strong><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player/";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.roy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.roy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a></strong> (<a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/roster/";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.roy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.roy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a>)<br>\n    ";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.roy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pts;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " pts, ";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.roy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.trb;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " reb, ";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.roy;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ast;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + " ast</p>\n  </div>\n  <div class=\"span4\">\n    <h4>All-League Teams</h4>\n    ";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.allLeague;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  stack2 = {};
  stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program4, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n  <div class=\"span4\">\n    <h4>All-Defensive Teams</h4>\n    ";
  stack1 = depth0.awards;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.allDefensive;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  stack2 = {};
  stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program7, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</div>\n<div class=\"row-fluid\">\n  <div class=\"span12\">\n    <h4>Retired Players</h4>\n    ";
  foundHelper = helpers.retiredPlayers;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program10, data, depth0),data:data}); }
  else { stack1 = depth0.retiredPlayers; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.retiredPlayers) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program10, data, depth0),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</div>";
  return buffer;});
templates['playButton'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n        ";
  foundHelper = helpers.normal_link;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data}); }
  else { stack1 = depth0.normal_link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.normal_link) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n          <li><a href=\"";
  foundHelper = helpers.url;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a></li>\n        ";
  return buffer;}

function program4(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n          <li><a onclick=\"";
  foundHelper = helpers.url;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" href=\"javascript:void(0);\">";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a></li>\n        ";
  return buffer;}

  buffer += "<ul class=\"nav btn btn-primary\">\n  <li class=\"dropdown\">\n    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Play <b class=\"caret\"></b></a>\n    <ul class=\"dropdown-menu\">\n      ";
  foundHelper = helpers.options;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  else { stack1 = depth0.options; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.options) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n  </li>\n</ul>\n";
  return buffer;});
templates['schedule'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n  <li><a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/roster/";
  stack1 = depth0.teams;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[0];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.teams;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[0];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.region;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.teams;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[0];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a>\n  ";
  foundHelper = helpers.vsat;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.vsat; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\n  <a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/roster/";
  stack1 = depth0.teams;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[1];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.teams;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[1];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.region;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.teams;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1[1];
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a>\n";
  return buffer;}

  buffer += "<h1>Upcoming Schedule ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n\n<ol>\n";
  foundHelper = helpers.games;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data}); }
  else { stack1 = depth0.games; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.games) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ol>\n";
  return buffer;});
templates['error'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h1>Error</h1>\n\n";
  foundHelper = helpers.error;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.error; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\n";
  return buffer;});
templates['newLeague'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n      <option value=\"";
  foundHelper = helpers.tid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.region;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.region; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " ";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</option>\n    ";
  return buffer;}

  buffer += "<h1>Create New League</h1>\n<p>\n<form action=\"/new_league\" method=\"POST\">\n  <label>League name</label>\n  <input type=\"text\" name=\"name\" value=\"";
  foundHelper = helpers.randomName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.randomName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" />\n  <label>Which team do you want to manage?</label>\n  <select name=\"tid\">\n    ";
  foundHelper = helpers.teams;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  else { stack1 = depth0.teams; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.teams) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>\n  <!--<label><select name=\"players\">\n    <option value=\"random\" selected=\"selected\">Random Players</option>\n    <option value=\"nba2012\">2012 NBA Players</option>\n  </select></label>--><br>\n  <button type=\"submit\" class=\"btn\">Create New League</button>  \n</form>\n</p>";
  return buffer;});
templates['dashboard'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n    <li>\n      <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"btn league\" title=\"";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + ". ";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"><strong>";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + ". ";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "<br></strong><span class=\"clearfix\">";
  foundHelper = helpers.region;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.region; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " ";
  foundHelper = helpers.teamName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.teamName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "<br></span><span class=\"clearfix\">";
  foundHelper = helpers.phaseText;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.phaseText; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</span></a>\n      <form action=\"/delete_league\" method=\"POST\" class=\"delete\"><input type=\"hidden\" name=\"lid\" value=\"";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"><button class=\"btn btn-mini\">Delete</button></form>\n    </li>\n  ";
  return buffer;}

  buffer += "<ul class=\"dashboard_league\">\n  ";
  foundHelper = helpers.leagues;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  else { stack1 = depth0.leagues; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.leagues) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <li class=\"dashboard_league_new\"><a href=\"/new_league\" class=\"btn btn-primary league\"><h2 style=\"\">Create new league</h2></a></li>\n</ul>";
  return buffer;});
templates['playerShotLocations'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <option value=\"";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.selected;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " season</option>\n    ";
  return buffer;}
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";}

  buffer += "<form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player_shot_locations\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"player-shot-locations-select-season\" name=\"season\" class=\"season\">\n    ";
  foundHelper = helpers.seasons;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  else { stack1 = depth0.seasons; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.seasons) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>\n</form>\n\n<h1>Player Shot Locations ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n<p>More: <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player_stats\">Main Stats</a> | <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/dist_player_stats\">Stat Distributions</a></p>\n\n<p class=\"clearfix\">\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"player-shot-locations\">\n<thead>\n  <tr><th colspan=\"6\"></th><th colspan=\"3\" style=\"text-align: center\" title=\"At Rim\">At Rim</th><th colspan=\"3\" style=\"text-align: center\" title=\"Low Post\">Low Post</th><th colspan=\"3\" style=\"text-align: center\" title=\"Mid-Range\">Mid-Range</th><th colspan=\"3\" style=\"text-align: center\" title=\"Three-Pointers\">3PT</th></tr>\n  <tr><th>Name</th><th title=\"Position\">Pos</th><th>Team</th><th title=\"Games Played\">GP</th><th title=\"Games Started\">GS</th><th title=\"Minutes\">Min</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th></tr>\n</thead>\n</table>\n</p>";
  return buffer;});
templates['negotiation'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n  <p>You are allowed to go over the salary cap to make this deal because you are resigning <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player/";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a> to a contract extension. <strong>If you do not come to an agreement here, <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player/";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a> will become a free agent.</strong> He will then be able to sign with any team, and you won't be able to go over the salary cap to sign him.</p>\n";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n  <p>You are not allowed to go over the salary cap to make this deal because <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player/";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a> is a free agent.</p>\n";
  return buffer;}

  buffer += "<h1>Contract Negotiation ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n\n";
  stack1 = depth0.resigning;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div class=\"row-fluid\">\n  <div class=\"span6\">\n    <h2>";
  stack1 = depth0.team;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.region;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.team;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h2>\n    <p>Current Payroll: $";
  stack1 = depth0.payroll;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M</p>\n    <p>Salary Cap: $";
  stack1 = depth0.salaryCap;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M</p>\n    <h2>Your Proposal</h2>\n    <form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/negotiation/";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"form-horizontal\" method=\"POST\">\n      <input type=\"text\" name=\"teamYears\" id=\"teamYears\" class=\"span1\" value=\"";
  stack1 = depth0.negotiation;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.teamYears;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\"> years\n      <p><div class=\"input-prepend input-append\">\n        <span class=\"add-on\">$</span><input type=\"text\" name=\"teamAmount\" id=\"teamAmount\" class=\"span5\" value=\"";
  stack1 = depth0.negotiation;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.teamAmount;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\"><span class=\"add-on\">M</span> per year\n      </div></p>\n      <button type=\"submit\" class=\"btn btn-large btn-primary\">Submit Proposal</button>  \n    </form>\n\n    <form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/negotiation/";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"form-horizontal\" method=\"POST\">\n      <input type=\"hidden\" name=\"cancel\" value=\"1\">\n      <button type=\"submit\" class=\"btn btn-danger\">Can't reach a deal? End negotiation</button>\n    </form>\n\n  </div>\n  <div class=\"span6\">\n    <h2><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player/";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a></h2>\n    <p>Overal: ";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ovr;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\n    <p>Potential: ";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pot;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\n    <h2>Player Proposal</h2>\n    <p>";
  stack1 = depth0.negotiation;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.playerYears;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + " years (through ";
  stack1 = depth0.negotiation;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.playerExpiration;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + ")</p>\n    <p>$";
  stack1 = depth0.negotiation;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.playerAmount;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 3, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 3, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M per year</p>\n    <form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/negotiation/";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"form-horizontal\" method=\"POST\">\n      <input type=\"hidden\" name=\"accept\" value=\"1\">\n      <button type=\"submit\" class=\"btn btn-large btn-primary\" id=\"accept\">Accept Player Proposal</button>\n    </form>\n  </div>\n</div>\n";
  return buffer;});
templates['finances'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<h1>Finances ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n\n<p>The current salary cap is <strong>$";
  stack1 = depth0.salaryCap;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M</strong>.</p>\n\n<p>\n  <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"finances\">\n  <thead>\n    <tr><th>Team</th><th>Avg Attendance</th><th>Revenue (YTD)</th><th>Profit (YTD)</th><th>Cash</th><th>Payroll</th></tr>\n  </thead>\n  </table>\n</p>";
  return buffer;});
templates['negotiationList'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n	    [ '<a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/player/";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.skills;
  stack2 = {};
  foundHelper = helpers.skills_block;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "skills_block", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "', '";
  foundHelper = helpers.pos;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pos; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "', '";
  foundHelper = helpers.age;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.age; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ovr;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pot;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.min;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pts;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.trb;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ast;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.per;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "', '$";
  stack1 = depth0.contractAmount;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M thru ";
  foundHelper = helpers.contractExp;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.contractExp; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "', '<a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/negotiation/";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"btn btn-mini btn-primary\">Negotiate</a>' ],\n    ";
  return buffer;}

  buffer += "<script type=\"text/javascript\">\n$(document).ready(function() {\n  ui.datatable($('#negotiation_list'), 4, [\n    ";
  foundHelper = helpers.players;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data}); }
  else { stack1 = depth0.players; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.players) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ]);\n} );\n</script>\n\n<h1>Players With Expiring Contracts</h1>\n\n<p>You are allowed to go over the salary cap to resign your players before they become free agents. If you do not resign them before free agency begins, they will be free to sign with any team, and you won't be able to go over the salary cap to sign them.</p>\n\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"negotiation_list\">\n<thead>\n  <tr><th>Name</th><th title=\"Position\">Pos</th><th>Age</th><th title=\"Overall\">Ovr</th><th title=\"Potential\">Pot</th><th title=\"Minutes Per Game\">Min</th><th title=\"Points Per Game\">Pts</th><th title=\"Rebounds Per Game\">Reb</th><th title=\"Assists Per Game\">Ast</th><th title=\"Player Efficiency Rating\">PER</th><th>Asking for</th><th>Negotiate</th></tr>\n</thead>\n</table>";
  return buffer;});
templates['distPlayerRatings'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <option value=\"";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.selected;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " season</option>\n    ";
  return buffer;}
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";}

  buffer += "<script type=\"text/javascript\">\n$(document).ready(function() {\n  ui.dropdown($(\"#dist_player_ratings_select_season\"));\n});\n</script>\n\n<form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/dist_player_ratings\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"dist_player_ratings_select_season\" name=\"season\" class=\"season\">\n    ";
  foundHelper = helpers.seasons;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  else { stack1 = depth0.seasons; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.seasons) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>\n</form>\n\n<h1>Player Rating Distributions ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n\n<p>These <a href=\"http://en.wikipedia.org/wiki/Box_plot\">box plots</a> show the league-wide distributions of player ratings for all active players in the selected season. The five vertical lines in each plot represent the minimum of the scale (0), the minimum, the first <a href=\"http://en.wikipedia.org/wiki/Quartile\">quartile</a>, the median, the third quartile, the maximum, and the maximum of the scale (100).</p>\n\n<p>\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" id=\"dist_player_ratings\">\n  <tbody></tbody>\n</table>\n</p>\n";
  return buffer;});
templates['deleteLeague'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h1>Delete League ";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "?</h1>\n\n<p>Are you <em>absolutely</em> sure you want to delete League ";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "? You will <em>permanently</em> lose any record of all ";
  foundHelper = helpers.numSeasons;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.numSeasons; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " seasons, ";
  foundHelper = helpers.numPlayers;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.numPlayers; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " players, and ";
  foundHelper = helpers.numGames;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.numGames; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " games from this league (well... unless you have backup somewhere).</p>\n\n<form action=\"/delete_league\" method=\"post\" style=\"float: left; margin-right: 1em\">\n  <input type=\"hidden\" name=\"lid\" value=\"";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">\n  <input type=\"hidden\" name=\"confirm\" value=\"1\">\n  <button class=\"btn btn-danger\">Yes, I am sure! Delete League ";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + ".</button>\n</form>\n<form action=\"/\" method=\"get\">\n  <button class=\"btn\">Cancel</button>\n</form>";
  return buffer;});
templates['playerRatings'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      ['<a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/player/";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.skills;
  stack2 = {};
  foundHelper = helpers.skills_block;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "skills_block", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "', '";
  foundHelper = helpers.pos;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pos; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "', '<a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/roster/";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/";
  stack1 = depth1.season;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a>', '";
  foundHelper = helpers.age;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.age; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ovr;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pot;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.hgt;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.stre;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.spd;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.jmp;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.endu;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ins;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.dnk;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ft;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.fg;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.tp;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.blk;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.stl;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.drb;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pss;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "', '";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.reb;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "'],\n    ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <option value=\"";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.selected;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " season</option>\n    ";
  return buffer;}
function program4(depth0,data) {
  
  
  return " selected=\"selected\"";}

  buffer += "<script type=\"text/javascript\">\n$(document).ready(function() {\n  ui.dropdown($('#player_ratings_select_season'));\n\n  ui.datatable($('#player_ratings'), 4, [\n    ";
  foundHelper = helpers.players;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data}); }
  else { stack1 = depth0.players; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.players) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ]);\n});\n</script>\n\n<form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player_ratings\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"player_ratings_select_season\" name=\"season\" class=\"season\">\n    ";
  foundHelper = helpers.seasons;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}); }
  else { stack1 = depth0.seasons; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.seasons) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(3, program3, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>\n</form>\n\n<h1>Player Ratings ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n\n<p class=\"clearfix\">\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"player_ratings\">\n<thead>\n  <tr><th>Name</th><th title=\"Position\">Pos</th><th>Team</th><th>Age</th><th title=\"Overall\">Ovr</th><th title=\"Potential\">Pot</th><th title=\"Height\">Hgt</th><th title=\"Strength\">Str</th><th title=\"Speed\">Spd</th><th title=\"Jumping\">Jmp</th><th title=\"Endurance\">End</th><th title=\"Inside Scoring\">Ins</th><th title=\"Dunks/Layups\">Dnk</th><th title=\"Free Throw Shooting\">FT</th><th title=\"Two-Point Shooting\">2Pt</th><th title=\"Three-Point Shooting\">3Pt</th><th title=\"Blocks\">Blk</th><th title=\"Steals\">Stl</th><th title=\"Dribbling\">Drb</th><th title=\"Passing\">Pss</th><th title=\"Rebounding\">Reb</th></tr>\n</thead>\n</table>\n</p>\n\n<p class=\"clearfix\" style=\"margin-top: 3.5em\"><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/dist_player_ratings\">View player rating distributions</a></p>\n";
  return buffer;});
templates['gameLogList'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, self=this, functionType="function", escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n    <tr";
  stack1 = depth0.selected;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><td><a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/game_log/";
  stack1 = depth1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/";
  stack1 = depth1.season;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.gid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.gid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.home;
  stack2 = {};
  stack1 = helpers.unless.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  foundHelper = helpers.oppAbbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.oppAbbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a></td><td><a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/game_log/";
  stack1 = depth1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/";
  stack1 = depth1.season;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.gid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.gid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.won;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></td><td><a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/game_log/";
  stack1 = depth1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/";
  stack1 = depth1.season;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.gid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.gid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.pts;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pts; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "-";
  foundHelper = helpers.oppPts;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.oppPts; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1);
  foundHelper = helpers.overtime;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.overtime; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a></td></tr>\n  ";
  return buffer;}
function program2(depth0,data) {
  
  
  return " class=\"alert-info\"";}

function program4(depth0,data) {
  
  
  return "@";}

function program6(depth0,data) {
  
  
  return "W";}

function program8(depth0,data) {
  
  
  return "L";}

  buffer += "<table id=\"game_log_list\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\">\n<thead>\n  <tr><th>Opp</th><th>W/L</th><th>Score</th></tr>\n</thead>\n<tbody>\n  ";
  foundHelper = helpers.games;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data}); }
  else { stack1 = depth0.games; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.games) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</tbody>\n</table>\n";
  return buffer;});
templates['gameLog'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <option value=\"";
  foundHelper = helpers.abbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.abbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.selected;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.region;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.region; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " ";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</option>\n    ";
  return buffer;}
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";}

function program4(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <option value=\"";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.selected;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " season</option>\n    ";
  return buffer;}
function program5(depth0,data) {
  
  
  return " selected=\"selected\"";}

  buffer += "<form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/game_log\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"game-log-select-team\" name=\"team\" class=\"team\">\n    ";
  foundHelper = helpers.teams;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  else { stack1 = depth0.teams; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.teams) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>\n  <select id=\"game-log-select-season\" name=\"season\" class=\"season\">\n    ";
  foundHelper = helpers.seasons;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data}); }
  else { stack1 = depth0.seasons; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.seasons) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(4, program4, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>\n</form>\n\n<h1>Game Log ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n\n<p>\n<div class=\"row-fluid\">\n  <div class=\"span9\">\n    ";
  foundHelper = helpers.boxScore;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.boxScore; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n\n  <div class=\"span3\">\n    ";
  foundHelper = helpers.gameLogList;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.gameLogList; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</div>\n</p>\n";
  return buffer;});
templates['roster'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n        // Roster reordering\n        function highlightHandles() {\n            var i = 1;\n            $('#roster tbody').children().each(function() {\n                var tr;\n\n                tr = $(this);\n                if (i <= 5) {\n                    tr.find('td:first').removeClass('btn-info').addClass('btn-primary');\n                } else {\n                    tr.find('td:first').removeClass('btn-primary').addClass('btn-info');\n                }\n                if (i === 5) {\n                    tr.addClass('separator');\n                } else {\n                    tr.removeClass('separator');\n                }\n                i++;\n            });\n        }\n        highlightHandles();\n        var fixHelper = function(e, ui) {\n            // Return helper which preserves the width of table cells being reordered\n            ui.children().each(function() {\n                $(this).width($(this).width());\n            });\n            return ui;\n        };\n        $(\"#roster tbody\").sortable({\n            helper: fixHelper,\n            cursor: \"move\",\n            update: function(e, ui) {\n                var i, sortedPids;\n\n                sortedPids = $(this).sortable(\"toArray\");\n                for (i = 0; i < sortedPids.length; i++) {\n                    sortedPids[i] = parseInt(sortedPids[i].substr(7), 10);\n                }\n\n                api.rosterReorder(sortedPids, function () {\n                    highlightHandles();\n                });\n            }\n        }).disableSelection();\n        $(\"#auto_sort_roster\").click(function(event) {\n            api.rosterAutoSort();\n        });\n\n        // Release player\n        $(\"#roster button\").click(function(event) {\n            if (this.dataset.action === \"release\") {\n                if (window.confirm('Are you sure you want to release ' + this.dataset.playerName + '?  He will become a free agent and no longer take up a roster spot on your team, but you will still have to pay his salary (and have it count against the salary cap) until his contract expires in ' + this.dataset.contractExpiration + '.')) {\n                    var tr = this.parentNode.parentNode;\n                    api.rosterRelease(this.dataset.playerId, function (error) {\n                        if (error) {\n                            alert(\"Error: \" + error);\n                        }\n                        else {\n                            Davis.location.assign(new Davis.Request(Davis.location.current()));\n                        }                        \n                    });\n                }\n            }\n            else if (this.dataset.action === \"buyOut\") {\n                if (";
  stack1 = depth0.team;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.cash;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + " > this.dataset.cashOwed) {\n                    if (window.confirm('Are you sure you want to buy out ' + this.dataset.playerName + '? You will have to pay him the $' + this.dataset.cashOwed + 'M remaining on his contract from your current cash reserves of $";
  stack1 = depth0.team;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.cash;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M. He will then become a free agent and his contract will no longer count towards your salary cap.')) {\n                        var tr = this.parentNode.parentNode;\n                        api.rosterBuyOut(this.dataset.playerId, function (error) {\n                            if (error) {\n                                alert(\"Error: \" + error);\n                            }\n                            else {\n                                Davis.location.assign(new Davis.Request(Davis.location.current()));\n                            }\n                        });\n                    }\n                }\n                else {\n                    alert('Error: You only have $";
  stack1 = depth0.team;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.cash;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M in cash, but it would take $' + this.dataset.cashOwed + 'M to buy out ' + this.dataset.playerName + '.');\n                }\n            }\n            else if (this.dataset.action === \"tradeFor\") {\n\n            }\n        });\n    ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <option value=\"";
  foundHelper = helpers.abbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.abbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.selected;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.region;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.region; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " ";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</option>\n    ";
  return buffer;}
function program4(depth0,data) {
  
  
  return " selected=\"selected\"";}

function program6(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <option value=\"";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.selected;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " season</option>\n    ";
  return buffer;}
function program7(depth0,data) {
  
  
  return " selected=\"selected\"";}

function program9(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n  <p>";
  foundHelper = helpers.numRosterSpots;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.numRosterSpots; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " open roster spots<br>\n  Payroll: $";
  stack1 = depth0.payroll;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M<br>\n  Salary cap: $";
  stack1 = depth0.salaryCap;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M<br>\n  Cash: $";
  stack1 = depth0.team;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.cash;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M (used for buying out players)</p>\n";
  return buffer;}

function program11(depth0,data) {
  
  
  return "\n  <p>Drag and drop row handles to move players between the starting lineup (<span class=\"roster_gs\">&#9632;</span>) and the bench (<span class=\"roster_bench\">&#9632;</span>).</p>\n  <p><button class=\"btn\" id=\"auto_sort_roster\">Auto sort roster</button></p>\n";}

function program13(depth0,data) {
  
  
  return "<th></th>";}

function program15(depth0,data) {
  
  
  return "<th>Contract</th>";}

function program17(depth0,data) {
  
  
  return "<th>Release</th><th>Buy out</th>";}

function program19(depth0,data) {
  
  
  return "<th>Trade For</th>";}

function program21(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n    <tr id=\"roster_";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.separator;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth1.sortable;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<td><a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/player/";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.skills;
  stack2 = {};
  foundHelper = helpers.skills_block;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "skills_block", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.pos;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pos; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.age;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.age; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ovr;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.ratings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pot;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</td>";
  stack1 = depth1.currentSeason;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<td>";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.min;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pts;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.trb;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ast;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.per;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td>";
  stack1 = depth1.sortable;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(28, program28, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth1.showTradeFor;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program33, data, depth0, depth1),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</tr>\n  ";
  return buffer;}
function program22(depth0,data) {
  
  
  return " class=\"separator\"";}

function program24(depth0,data) {
  
  
  return "<td class=\"roster_handle\"></td>";}

function program26(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "<td>$";
  stack1 = depth0.contractAmount;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M thru ";
  foundHelper = helpers.contractExp;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.contractExp; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td>";
  return buffer;}

function program28(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "<td><button class=\"btn btn-mini\" data-action=\"release\" data-player-id=\"";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" data-player-name=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" data-contract-expiration=\"";
  foundHelper = helpers.contractExp;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.contractExp; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.canRelease;
  stack2 = {};
  stack1 = helpers.unless.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(29, program29, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">Release</button></td><td><button class=\"btn btn-mini\" data-action=\"buyOut\" data-player-id=\"";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" data-player-name=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" data-cash-owed=\"";
  stack1 = depth0.cashOwed;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.canBuyOut;
  stack2 = {};
  stack1 = helpers.unless.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(31, program31, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">Buy out</button></td>";
  return buffer;}
function program29(depth0,data) {
  
  
  return " disabled=\"disabled\"";}

function program31(depth0,data) {
  
  
  return " disabled=\"disabled\"";}

function program33(depth0,data,depth1,depth2) {
  
  var buffer = "", stack1;
  buffer += "<td><form action=\"/l/";
  stack1 = depth2.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/trade\" method=\"POST\" style=\"margin: 0\"><input type=\"hidden\" name=\"pid\" value=\"";
  stack1 = depth1.pid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\"><button type=\"submit\" class=\"btn btn-mini\">Trade For</button></form></td>";
  return buffer;}

  buffer += "<script type=\"text/javascript\">\n$(document).ready(function() {\n    ui.dropdown($('#roster_select_team'), $('#roster_select_season'));\n\n    ";
  stack1 = depth0.sortable;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n});\n</script>\n\n<form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/roster\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"roster_select_team\" name=\"team\" class=\"team\">\n    ";
  foundHelper = helpers.teams;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}); }
  else { stack1 = depth0.teams; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.teams) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(3, program3, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>\n  <select id=\"roster_select_season\" name=\"season\" class=\"season\">\n    ";
  foundHelper = helpers.seasons;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data}); }
  else { stack1 = depth0.seasons; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.seasons) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(6, program6, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>\n</form>\n\n<h1>";
  stack1 = depth0.team;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.region;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.team;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + " Roster ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n\n";
  stack1 = depth0.currentSeason;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = depth0.sortable;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<p>\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"roster\">\n<thead>\n  <tr>";
  stack1 = depth0.sortable;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<th>Name</th><th title=\"Position\">Pos</th><th>Age</th><th title=\"Overall Rating\">Ovr</th><th title=\"Potential Rating\">Pot</th>";
  stack1 = depth0.currentSeason;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<th title=\"Minutes Per Game\">Min</th><th title=\"Points Per Game\">Pts</th><th title=\"Rebounds Per Game\">Reb</th><th title=\"Assists Per Game\">Ast</th><th title=\"Player Efficiency Rating\">PER</th>";
  stack1 = depth0.sortable;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.showTradeFor;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</tr>\n</thead>\n<tbody>\n  ";
  foundHelper = helpers.players;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program21, data, depth0),data:data}); }
  else { stack1 = depth0.players; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.players) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program21, data, depth0),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</tbody>\n</table>\n</p>\n";
  return buffer;});
templates['teamHistory'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "None yet.";}

function program3(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n    <a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/roster/";
  stack1 = depth1.abbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>: <a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/standings/";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.won;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.won; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "-";
  foundHelper = helpers.lost;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lost; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>";
  stack1 = depth0.extraText;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program4, data, depth1),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<br>\n  ";
  return buffer;}
function program4(depth0,data,depth2) {
  
  var buffer = "", stack1, foundHelper;
  buffer += ", <a href=\"/l/";
  stack1 = depth2.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/playoffs/";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.extraText;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.extraText; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>";
  return buffer;}

  buffer += "<h1>Team History ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n\n<p>\n  ";
  stack1 = depth0.history;
  stack2 = {};
  stack1 = helpers.unless.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  foundHelper = helpers.history;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program3, data, depth0),data:data}); }
  else { stack1 = depth0.history; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.history) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program3, data, depth0),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</p>";
  return buffer;});
templates['draft'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return " style=\"display: none;\"";}

function program3(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n        <tr id=\"undrafted_";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"><td><a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/player/";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>";
  stack1 = depth0.skills;
  stack2 = {};
  foundHelper = helpers.skills_block;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "skills_block", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.pos;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pos; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.age;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.age; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "<td>";
  foundHelper = helpers.ovr;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ovr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.pot;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pot; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td><button class=\"btn btn-mini btn-primary\" data-player-id=\"";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth1.started;
  stack2 = {};
  stack1 = helpers.unless.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">Draft</button></td></tr>\n      ";
  return buffer;}
function program4(depth0,data) {
  
  
  return " disabled=\"disabled\"";}

function program6(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n        <tr><td>";
  foundHelper = helpers.rnd;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.rnd; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "-";
  foundHelper = helpers.pick;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pick; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td><a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/roster/";
  foundHelper = helpers.abbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.abbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.abbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.abbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a></td><td><a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player/";
  foundHelper = helpers.pid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a>";
  stack1 = depth0.skills;
  stack2 = {};
  foundHelper = helpers.skills_block;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "skills_block", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.pos;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pos; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.age;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.age; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "<td>";
  foundHelper = helpers.ovr;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ovr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.pot;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pot; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td></tr>\n      ";
  return buffer;}

  buffer += "<script type=\"text/javascript\">\n$(document).ready(function() {\n    function updateDraftTables(pids) {\n        for (var i=0; i<pids.length; i++) {\n            var draftedPlayer = new Array(5);\n            // Find row in undrafted players table, get metadata, delete row\n            var undraftedTds = $('#undrafted_' + pids[i] + ' td')\n            for (var j=0; j<5; j++) {\n                draftedPlayer[j] = undraftedTds[j].innerHTML;\n            }\n\n            // Find correct row (first blank row) in drafted players table, write metadata\n            var draftedRows = $('#drafted tbody tr');\n            for (var j=0; j<draftedRows.length; j++) {\n                if (draftedRows[j].children[3].innerHTML.length == 0) {\n                    $('#undrafted_' + pids[i]).remove();\n                    draftedRows[j].children[2].innerHTML = draftedPlayer[0];\n                    draftedRows[j].children[3].innerHTML = draftedPlayer[1];\n                    draftedRows[j].children[4].innerHTML = draftedPlayer[2];\n                    draftedRows[j].children[5].innerHTML = draftedPlayer[3];\n                    draftedRows[j].children[6].innerHTML = draftedPlayer[4];\n                    break;\n                }\n            }\n        }\n    }\n\n    \n\n    function draftUntilUserOrEnd() {\n        api.draftUntilUserOrEnd(function (pids, done) {\n          updateDraftTables(pids);\n          if (!done) {\n              $('#undrafted button').removeAttr('disabled');\n          }\n      });\n    }\n\n    $('#start_draft').click(function(event) {\n        $($('#start_draft').parent()).hide()\n        draftUntilUserOrEnd();\n    });\n\n    $('#undrafted button').click(function(event) {\n        $('#undrafted button').attr('disabled', 'disabled');\n        api.draftUser(this.getAttribute('data-player-id'), function (pid) {\n            updateDraftTables([pid]);\n            draftUntilUserOrEnd();\n        });\n    });\n});\n</script>\n\n<h1>Draft ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n\n<p>When your turn in the draft comes up, select from the list of available players on the left.</p>\n\n<p";
  stack1 = depth0.started;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><button class=\"btn btn-large btn-primary\" id=\"start_draft\">Start draft</button></p>\n\n<div class=\"row-fluid\">\n  <div class=\"span6\">\n    <h2>Undrafted Players</h2>\n    <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"undrafted\">\n    <thead>\n      <tr><th>Name</th><th title=\"Position\">Pos</th><th>Age</th><th title=\"Overall rating\">Ovr</th><th title=\"Potential rating\">Pot</th><th>Draft</th></tr>\n    </thead>\n    <tbody>\n      ";
  foundHelper = helpers.undrafted;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program3, data, depth0),data:data}); }
  else { stack1 = depth0.undrafted; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.undrafted) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program3, data, depth0),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n    </table>\n  </div>\n  <div class=\"span6\">\n    <h2>Draft Results</h2>\n    <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"drafted\">\n    <thead>\n      <tr><th>Pick</th><th>Team</th><th>Name</th><th title=\"Position\">Pos</th><th>Age</th><th title=\"Overall rating\">Ovr</th><th title=\"Potential rating\">Pot</th></tr>\n    </thead>\n    <tbody>\n      ";
  foundHelper = helpers.drafted;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program6, data, depth0),data:data}); }
  else { stack1 = depth0.drafted; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.drafted) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program6, data, depth0),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n    </table>\n  </div>\n</div>\n";
  return buffer;});
templates['distPlayerStats'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <option value=\"";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.selected;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " season</option>\n    ";
  return buffer;}
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";}

  buffer += "<script type=\"text/javascript\">\n$(document).ready(function() {\n  ui.dropdown($(\"#dist_player_stats_select_season\"));\n});\n</script>\n\n<form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/dist_player_stats\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"dist_player_stats_select_season\" name=\"season\" class=\"season\">\n    ";
  foundHelper = helpers.seasons;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  else { stack1 = depth0.seasons; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.seasons) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>\n</form>\n\n<h1>Player Stat Distributions ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n<p>More: <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player_stats\">Main Stats</a> | <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/player_shot_locations\">Shot Locations</a></p>\n\n<p>These <a href=\"http://en.wikipedia.org/wiki/Box_plot\">box plots</a> show the league-wide distributions of player stats for all active players in the selected season. Black plots are for this league and blue plots are from the 2009-2010 NBA season, for comparison. NBA data was generously provided by <a href=\"http://www.databasebasketball.com/stats_download.htm\">databaseBasketball.com</a>. The five vertical lines in each plot represent the minimum of the scale, the minimum, the first <a href=\"http://en.wikipedia.org/wiki/Quartile\">quartile</a>, the median, the third quartile, the maximum, and the maximum of the scale.</p>\n\n<p>\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" id=\"dist_player_stats\">\n  <tbody></tbody>\n</table>\n</p>\n";
  return buffer;});
templates['player'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        Draft: ";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.draftYear;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + " - Round ";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.draftRound;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + " (Pick ";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.draftPick;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + ") by ";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.draftAbbrev;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "<br>\n      ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        Undrafted: ";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.draftYear;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "<br>\n      ";
  return buffer;}

function program5(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n        ";
  stack1 = depth0.freeAgent;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ": $";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.contractAmount;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 2, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 2, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "M/yr thru ";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.contractExp;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "<br>\n      ";
  return buffer;}
function program6(depth0,data) {
  
  
  return "Asking for";}

function program8(depth0,data) {
  
  
  return "Contract";}

function program10(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "<span class=\"skills_alone\">";
  stack1 = depth0.currentRatings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.skills;
  stack2 = {};
  foundHelper = helpers.skills_block;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "skills_block", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</span><br>";
  return buffer;}

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"span6\">\n      <h2 class=\"pull-left\">Overall: ";
  stack1 = depth0.currentRatings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ovr;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h2>\n      <h2 class=\"pull-right\">Potential: ";
  stack1 = depth0.currentRatings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pot;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h2><br><br><br>\n      <div class=\"row-fluid\">\n        <div class=\"span4\">\n          <strong>Physical</strong><br/ >\n          Height: ";
  stack1 = depth0.currentRatings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.hgt;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "<br>\n          Strength: ";
  stack1 = depth0.currentRatings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.stre;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "<br>\n          Speed: ";
  stack1 = depth0.currentRatings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.spd;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "<br>\n          Jumping: ";
  stack1 = depth0.currentRatings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.jmp;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "<br>\n          Endurance: ";
  stack1 = depth0.currentRatings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.endu;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\n        </div>\n        <div class=\"span4\">\n          <strong>Shooting</strong><br/ >\n          Inside: ";
  stack1 = depth0.currentRatings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ins;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "<br>\n          Layups: ";
  stack1 = depth0.currentRatings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.dnk;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "<br>\n          Free throws: ";
  stack1 = depth0.currentRatings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ft;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "<br>\n          Two pointers: ";
  stack1 = depth0.currentRatings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.fg;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "<br>\n          Three pointers: ";
  stack1 = depth0.currentRatings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.tp;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\n        </div>\n        <div class=\"span4\">\n          <strong>Skill</strong><br/ >\n          Blocks: ";
  stack1 = depth0.currentRatings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.blk;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "<br>\n          Steals: ";
  stack1 = depth0.currentRatings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.stl;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "<br>\n          Dribbling: ";
  stack1 = depth0.currentRatings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.drb;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "<br>\n          Passing: ";
  stack1 = depth0.currentRatings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pss;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "<br>\n          Rebounding: ";
  stack1 = depth0.currentRatings;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.reb;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\n        </div>\n      </div>\n    </div>\n  ";
  return buffer;}

function program14(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n  <form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/trade\" method=\"POST\"><input type=\"hidden\" name=\"pid\" value=\"";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\"><button type=\"submit\" class=\"btn btn-small\">Trade For</button></form>\n";
  return buffer;}

function program16(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n  <form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/negotiation/";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\" method=\"POST\"><input type=\"hidden\" name=\"new\" value=\"1\"><button type=\"submit\" class=\"btn btn-small\">Sign free agent</button></form>\n";
  return buffer;}

function program18(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n    <tr><td><a href=\"#\">";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a></td><td><a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/roster/";
  foundHelper = helpers.abbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.abbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.abbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.abbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a></td><td>";
  foundHelper = helpers.age;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.age; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.gp;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.gp; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.gs;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.gs; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.min;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fg;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fga;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fgp;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.tp;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.tpa;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.tpp;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.ft;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fta;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.ftp;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.orb;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.drb;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.trb;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.ast;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.tov;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.stl;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.blk;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.pf;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.pts;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.per;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td></tr>\n  ";
  return buffer;}

function program20(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n    <tr><td>Career</td><td></td><td></td><td>";
  foundHelper = helpers.gp;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.gp; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.gs;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.gs; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.min;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fg;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fga;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fgp;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.tp;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.tpa;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.tpp;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.ft;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fta;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.ftp;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.orb;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.drb;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.trb;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.ast;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.tov;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.stl;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.blk;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.pf;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.pts;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.per;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td></tr>\n  ";
  return buffer;}

function program22(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n    <tr><td><a href=\"#\">";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a></td><td><a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/roster/";
  foundHelper = helpers.abbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.abbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.abbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.abbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a></td><td>";
  foundHelper = helpers.age;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.age; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.gp;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.gp; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.gs;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.gs; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.min;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fgAtRim;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fgaAtRim;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fgpAtRim;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fgLowPost;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fgaLowPost;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fgpLowPost;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fgMidRange;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fgaMidRange;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fgpMidRange;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.tp;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.tpa;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.tpp;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td></tr>\n  ";
  return buffer;}

function program24(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n    <tr><td>Career</td><td></td><td></td><td>";
  foundHelper = helpers.gp;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.gp; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.gs;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.gs; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.min;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fgAtRim;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fgaAtRim;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fgpAtRim;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fgLowPost;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fgaLowPost;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fgpLowPost;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fgMidRange;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fgaMidRange;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.fgpMidRange;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.tp;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.tpa;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td><td>";
  stack1 = depth0.tpp;
  stack2 = {};
  foundHelper = helpers.round;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:stack2,data:data}) : helperMissing.call(depth0, "round", stack1, 1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td></tr>\n  ";
  return buffer;}

function program26(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <tr><td><a href=\"#\">";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a></td><td><a href=\"/l/";
  stack1 = depth1.lid;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/roster/";
  foundHelper = helpers.abbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.abbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.abbrev;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.abbrev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</a></td><td>";
  foundHelper = helpers.age;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.age; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.ovr;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ovr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.pot;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pot; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.hgt;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.hgt; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.stre;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.stre; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.spd;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.spd; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.jmp;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.jmp; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.endu;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.endu; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.ins;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ins; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.dnk;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.dnk; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.ft;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ft; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.fg;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.fg; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.tp;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tp; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.blk;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.blk; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.stl;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.stl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.drb;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.drb; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.pss;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pss; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td>";
  foundHelper = helpers.reb;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.reb; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</td><td><span class=\"skills_alone\">";
  stack1 = depth0.skills;
  stack2 = {};
  foundHelper = helpers.skills_block;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "skills_block", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</span></td></tr>\n    ";
  return buffer;}

  buffer += "<div class=\"row-fluid\">\n  <div class=\"span6\">\n    <h1>";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + " ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n    <div id=\"picture\" class=\"player_picture\">";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.face;
  stack2 = {};
  foundHelper = helpers.face;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "face", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</div>\n    <div style=\"float: left;\">\n      <strong>";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.teamRegion;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.teamName;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</strong><br>\n      Height: ";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.hgtFt;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "'";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.hgtIn;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\"<br>\n      Weight: ";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.weight;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + " lbs<br>\n      Age: ";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.age;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "<br>\n      Born: ";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.bornYear;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + " - ";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.bornLoc;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "<br>\n      ";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.draftRound;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = depth0.showContract;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = depth0.retired;
  stack2 = {};
  stack1 = helpers.unless.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n  </div>\n  ";
  stack1 = depth0.retired;
  stack2 = {};
  stack1 = helpers.unless.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n\n<p></p>\n";
  stack1 = depth0.showTradeFor;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  stack1 = depth0.freeAgent;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<h2>Regular Season Stats</h2>\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"player_stats\">\n  <thead>\n    <tr><th colspan=\"6\"></th><th colspan=\"3\" style=\"text-align: center\" title=\"Field Goals\">FG</th><th colspan=\"3\" style=\"text-align: center\" title=\"Three-Pointers\">3PT</th><th colspan=\"3\" style=\"text-align: center\" title=\"Free Throws\">FT</th><th colspan=\"3\" style=\"text-align: center\" title=\"Rebounds\">Reb</th><th colspan=\"6\"></th></tr>\n    <tr><th>Year</th><th>Team</th><th>Age</th><th title=\"Games Played\">GP</th><th title=\"Games Started\">GS</th><th title=\"Minutes\">Min</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Offensive\">Off</th><th title=\"Defensive\">Def</th><th title=\"Total\">Tot</th><th title=\"Assists\">Ast</th><th title=\"Turnovers\">TO</th><th title=\"Steals\">Stl</th><th title=\"Blocks\">Blk</th><th title=\"Personal Fouls\">PF</th><th title=\"Points\">Pts</th><th title=\"Player Efficiency Rating\">PER</th></tr>\n  </thead>\n  <tbody>\n  ";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.stats;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  stack2 = {};
  stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program18, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.careerStats;
  stack2 = {};
  stack1 = helpers['with'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </tbody>\n</table>\n\n<h2>Shot Locations</h2>\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"player_stats\">\n  <thead>\n    <tr><th colspan=\"6\"></th><th colspan=\"3\" style=\"text-align: center\" title=\"At Rim\">At Rim</th><th colspan=\"3\" style=\"text-align: center\" title=\"Low Post\">Low Post</th><th colspan=\"3\" style=\"text-align: center\" title=\"Mid-Range\">Mid-Range</th><th colspan=\"3\" style=\"text-align: center\" title=\"Three-Pointers\">3PT</th></tr>\n    <tr><th>Year</th><th>Team</th><th>Age</th><th title=\"Games Played\">GP</th><th title=\"Games Started\">GS</th><th title=\"Minutes\">Min</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th></tr>\n  </thead>\n  <tbody>\n  ";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.stats;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  stack2 = {};
  stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program22, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.careerStats;
  stack2 = {};
  stack1 = helpers['with'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </tbody>\n</table>\n\n<h2>Ratings History</h2>\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"player_ratings\">\n  <thead>\n    <tr><th>Year</th><th>Team</th><th>Age</th><th title=\"Overall\">Ovr</th><th title=\"Potential\">Pot</th><th title=\"Height\">Hgt</th><th title=\"Strength\">Str</th><th title=\"Speed\">Spd</th><th title=\"Jumping\">Jmp</th><th title=\"Endurance\">End</th><th title=\"Inside Scoring\">Ins</th><th title=\"Dunks/Layups\">Dnk</th><th title=\"Free Throw Shooting\">FT</th><th title=\"Two-Point Shooting\">2Pt</th><th title=\"Three-Point Shooting\">3Pt</th><th title=\"Blocks\">Blk</th><th title=\"Steals\">Stl</th><th title=\"Dribbling\">Drb</th><th title=\"Passing\">Pss</th><th title=\"Rebounding\">Reb</th><th>Skills</th></tr>\n  </thead>\n  <tbody>\n    ";
  stack1 = depth0.player;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.ratings;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  stack2 = {};
  stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program26, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </tbody>\n</table>";
  return buffer;});
templates['teamShotLocations'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <option value=\"";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  stack1 = depth0.selected;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.season;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.season; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + " season</option>\n    ";
  return buffer;}
function program2(depth0,data) {
  
  
  return " selected=\"selected\"";}

  buffer += "<form action=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/team_shot_locations\" method=\"GET\" class=\"form-inline pull-right\">\n  <select id=\"team-shot-locations-select-season\" name=\"season\" class=\"season\">\n    ";
  foundHelper = helpers.seasons;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  else { stack1 = depth0.seasons; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.seasons) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </select>\n</form>\n\n<h1>Team Shot Locations ";
  foundHelper = helpers.new_window;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.new_window; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h1>\n<p>More: <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/team_stats\">Main Stats</a> | <a href=\"/l/";
  foundHelper = helpers.lid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/dist_team_stats\">Stat Distributions</a></p>\n\n<p class=\"clearfix\">\n<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered table-condensed\" id=\"team-shot-locations\">\n<thead>\n  <tr><th colspan=\"4\"></th><th colspan=\"3\" style=\"text-align: center\" title=\"At Rim\">At Rim</th><th colspan=\"3\" style=\"text-align: center\" title=\"Low Post\">Low Post</th><th colspan=\"3\" style=\"text-align: center\" title=\"Mid-Range\">Mid-Range</th><th colspan=\"3\" style=\"text-align: center\" title=\"Three-Pointers\">3PT</th></tr>\n  <tr><th>Team</th><th title=\"Games Played\">GP</th><th title=\"Won\">W</th><th title=\"Lost\">L</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th><th title=\"Made\">M</th><th title=\"Attempted\">A</th><th title=\"Percentage\">%</th></tr>\n</thead>\n</table>\n</p>";
  return buffer;});
})();