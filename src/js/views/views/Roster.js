const classNames = require('classnames');
const React = require('react');
const g = require('../../globals');
const ui = require('../../ui');
const league = require('../../core/league');
const player = require('../../core/player');
const bbgmViewReact = require('../../util/bbgmViewReact');
const helpers = require('../../util/helpers');
const {Dropdown, LeagueLink, NewWindowLink} = require('../components/index');
const clickable = require('../wrappers/clickable');

const doRelease = (pid, justDrafted) => {
    return g.dbl.tx(["players", "releasedPlayers", "teamSeasons"], "readwrite", async tx => {
        const numPlayersOnRoster = await tx.players.index('tid').count(g.userTid);
        if (numPlayersOnRoster <= 5) {
            return "You must keep at least 5 players on your roster.";
        }

        const p = await tx.players.get(pid);

        // Don't let the user update CPU-controlled rosters
        if (p.tid !== g.userTid) {
            return "You aren't allowed to do this.";
        }

        await player.release(tx, p, justDrafted);
        league.updateLastDbChange();
    });
};

class Roster extends React.Component {
    constructor(props) {
        super(props);
    }

    async handleRelease(p) {
        // If a player was just drafted by his current team and the regular season hasn't started, then he can be released without paying anything
        const justDrafted = p.tid === p.draft.tid && ((p.draft.year === g.season && g.phase >= g.PHASE.DRAFT) || (p.draft.year === g.season - 1 && g.phase < g.PHASE.REGULAR_SEASON));

        let releaseMessage;
        if (justDrafted) {
            releaseMessage = `Are you sure you want to release ${p.name}?  He will become a free agent and no longer take up a roster spot on your team. Because you just drafted him and the regular season has not started yet, you will not have to pay his contract.`;
        } else {
            releaseMessage = `Are you sure you want to release ${p.name}?  He will become a free agent and no longer take up a roster spot on your team, but you will still have to pay his salary (and have it count against the salary cap) until his contract expires in ${p.contract.exp}.`;
        }

        if (window.confirm(releaseMessage)) {
            const errorMsg = await doRelease(p.pid, justDrafted);
            if (errorMsg) {
                helpers.errorNotify(errorMsg);
            } else {
                ui.realtimeUpdate(["playerMovement"]);
            }
        }
    }

    render() {
        const {abbrev, editable, payroll, players, salaryCap, season, showTradeFor, team} = this.props;

        bbgmViewReact.title(`${team.region} ${team.name} Roster - ${season}`);

        return <div>
            <Dropdown view="roster" fields={["teams", "seasons"]} values={[abbrev, season]} />
            <div className="btn-group pull-right">
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                    More Info <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                    <li><LeagueLink parts={['player_stats', abbrev, season]}>Player Stats</LeagueLink></li>
                    <li><LeagueLink parts={['player_ratings', abbrev, season]}>Player Ratings</LeagueLink></li>
                </ul>
            </div>

            <h1>{team.region} {team.name} Roster <NewWindowLink /></h1>
            <p>More: <LeagueLink parts={['team_finances', abbrev]}>Finances</LeagueLink> | <LeagueLink parts={['game_log', abbrev, season]}>Game Log</LeagueLink> | <LeagueLink parts={['team_history', abbrev]}>History</LeagueLink> | <LeagueLink parts={['transactions', abbrev]}>Transactions</LeagueLink></p>
            <div id="picture" className="team-picture"></div>
            <div id="teamInfo">
                <h3>Record: {helpers.recordAndPlayoffs(abbrev, season, team.won, team.lost, team.playoffRoundsWon, 'noSeason')}</h3>

                {season === g.season ? <p>
                    {15 - players.length} open roster spots<br />
                    Payroll: {helpers.formatCurrency(payroll, 'M')}<br />
                    Salary cap: {helpers.formatCurrency(salaryCap, 'M')}<br />
                    Profit: {helpers.formatCurrency(team.profit, 'M')}<br />
                    {showTradeFor ? `Strategy: ${team.strategy}` : null}
                </p> : null}
            </div>
            {editable ? <p id="instructions">Drag and drop row handles to move players between the starting lineup (<span className="roster-starter">&#9632;</span>) and the bench (<span className="roster-bench">&#9632;</span>).</p> : null}
            {editable ? <p><button className="btn btn-default" id="roster-auto-sort">Auto sort roster</button>
            </p> : null}

            <div className="table-responsive">
                <table className="table table-striped table-bordered table-condensed table-hover" id="roster">
                    <thead>
                        <tr>
                            {editable ? <th></th> : null}
                            <th>Name</th>
                            <th title="Position">Pos</th>
                            <th>Age</th>
                            <th title="Years With Team">YWT</th>
                            <th title="Overall Rating">Ovr</th>
                            <th title="Potential Rating">Pot</th>
                            {season === g.season ? <th>Contract</th> : null}
                            <th title="Games Played">GP</th>
                            <th title="Minutes Per Game">Min</th>
                            <th title="Points Per Game">Pts</th>
                            <th title="Rebounds Per Game">Reb</th>
                            <th title="Assists Per Game">Ast</th>
                            <th title="Player Efficiency Rating">PER</th>
                            {editable ? <th title="Playing Time Modifier" style={{textAlign: 'center'}}>PT <span className="glyphicon glyphicon-question-sign help-icon" id="help-roster-pt" data-placement="left"></span></th> : null}
                            {editable ? <th>Release <span className="glyphicon glyphicon-question-sign help-icon" id="help-roster-release" data-placement="left"></span></th> : null}
                            {showTradeFor ? <th>Trade For</th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((p, i) => {
                            const rosterHandleStyle = {backgroundColor: i <= 4 ? '#428bca' : '#5bc0de'};
                            return <tr key={p.pid} className={classNames({separator: i === 4})}>
                                {editable ? <td className="roster-handle" style={rosterHandleStyle}></td> : null}
                                <td>{helpers.playerNameLabels(p.pid, p.name, p.injury, p.ratings.skills, p.watch)}></td>
                                <td>{p.ratings.pos}</td>
                                <td>{p.age}</td>
                                <td>{p.stats.yearsWithTeam}</td>
                                <td>
                                    {p.ratings.ovr}
                                    {p.ratings.dovr !== 0 ? <span className={classNames({'text-success': p.ratings.dovr > 0, 'text-danger': p.ratings.dovr < 0})}> ({p.ratings.dovr > 0 ? '+' : null}{p.ratings.dovr})</span> : null }
                                </td>
                                <td>
                                    {p.ratings.pot}
                                    {p.ratings.dpot !== 0 ? <span className={classNames({'text-success': p.ratings.dpot > 0, 'text-danger': p.ratings.dpot < 0})}> ({p.ratings.dpot > 0 ? '+' : null}{p.ratings.dpot})</span> : null }
                                </td>
                                {season === g.season ? <td>
                                    {helpers.formatCurrency(p.contract.amount, 'M')} thru {p.contract.exp}
                                </td> : null}
                                <td>{p.stats.gp}</td>
                                <td>{helpers.round(p.stats.min, 1)}</td>
                                <td>{helpers.round(p.stats.pts, 1)}</td>
                                <td>{helpers.round(p.stats.trb, 1)}</td>
                                <td>{helpers.round(p.stats.ast, 1)}</td>
                                <td>{helpers.round(p.stats.per, 1)}</td>
                                {editable ? <td>
                                    <select className="form-control" data-bind="options: $root.ptModifiers, optionsText: 'text', optionsValue: 'ptModifier', value: ptModifier, event: {change: $root.ptChange}"></select>
                                </td> : null}
                                {editable ? <td>
                                    <button
                                        className="btn btn-default btn-xs"
                                        disabled={!p.canRelease}
                                        onClick={this.handleRelease.bind(this, p)}
                                    >
                                        Release
                                    </button>
                                </td> : null}
                                {showTradeFor ? <td>
                                    <form method="POST" style={{margin: 0}} data-bind="attrLeagueUrl: {action: ['trade']}">
                                        <input type="hidden" name="pid" data-bind="attr: {value: pid}" />
                                        <button type="submit" className="btn btn-default btn-xs" data-bind="enable: !untradable()" title={p.untradableMsg}>Trade For</button>
                                    </form>
                                </td> : null}
                            </tr>;
                        })}
                    </tbody>
                </table>
            </div>
        </div>;
    }
}
Roster.defaultProps = {players: [], team: {}};

module.exports = Roster;
