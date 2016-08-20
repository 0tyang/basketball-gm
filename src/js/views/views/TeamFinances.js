const React = require('react');
const g = require('../../globals');
const bbgmViewReact = require('../../util/bbgmViewReact');
const getCols = require('../../util/getCols');
const helpers = require('../../util/helpers');
const {BarGraph, DataTable, Dropdown, HelpPopover, NewWindowLink, PlayerNameLabels} = require('../components/index');

class FinancesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(e);
    }

    render() {
        const {gamesInProgress, team, tid} = this.props;

        const warningMessage = <p className="text-danger">
            {gamesInProgress && tid === g.userTid ? 'Stop game simulation to edit.' : null}
        </p>;

        const formDisabled = gamesInProgress || tid !== g.userTid;

        return <form onSubmit={this.handleSubmit} data-no-davis="true">
            <h4>Revenue Settings <HelpPopover placement="bottom" title="Revenue Settings">
                Set your ticket price too high, and attendance will decrease and some fans will resent you for it. Set it too low, and you're not maximizing your profit.
            </HelpPopover></h4>
            {warningMessage}
            <div className="row">
                <div className="pull-left finances-settings-label">Ticket Price</div>
                <div className="input-group input-group-sm pull-left finances-settings-field">
                    <span className="input-group-addon">$</span>
                    <input type="text" name="budget[ticketPrice]" className="form-control" disabled={formDisabled} value={team.budget.ticketPrice.amount} />
                </div>
                <div className="pull-left finances-settings-text">Leaguewide rank: #{team.budget.ticketPrice.rank}</div>
            </div>
            <p></p>
            <h4>Expense Settings <HelpPopover placement="bottom" title="Expense Settings">
                <p>Scouting: Controls the accuracy of displayed player ratings.</p>
                <p>Coaching: Better coaches mean better player development.</p>
                <p>Health: A good team of doctors speeds recovery from injuries.</p>
                <p>Facilities: Better training facilities make your players happier and other players envious; stadium renovations increase attendance.</p>
            </HelpPopover></h4>
            {warningMessage}
            <div className="row">
                <div className="pull-left finances-settings-label">Scouting</div>
                <div className="input-group input-group-sm pull-left finances-settings-field">
                    <span className="input-group-addon">$</span>
                    <input type="text" name="budget[scouting]" className="form-control" disabled={formDisabled} value={team.budget.scouting.amount} />
                    <span className="input-group-addon">M</span>
                </div>
                <div className="pull-left finances-settings-text-small">Current spending rate: #{team.budget.scouting.rank}<br />Spent this season: #{team.expenses.scouting.rank}</div>
            </div>
            <div className="row">
                <div className="pull-left finances-settings-label">Coaching</div>
                <div className="input-group input-group-sm pull-left finances-settings-field">
                    <span className="input-group-addon">$</span>
                    <input type="text" name="budget[coaching]" className="form-control" disabled={formDisabled} value={team.budget.coaching.amount} />
                    <span className="input-group-addon">M</span>
                </div>
                <div className="pull-left finances-settings-text-small">Current spending rate: #{team.budget.coaching.rank}<br />Spent this season: #{team.expenses.coaching.rank}</div>
            </div>
            <div className="row">
                <div className="pull-left finances-settings-label">Health</div>
                <div className="input-group input-group-sm pull-left finances-settings-field">
                    <span className="input-group-addon">$</span>
                    <input type="text" name="budget[health]" className="form-control" disabled={formDisabled} value={team.budget.health.amount} />
                    <span className="input-group-addon">M</span>
                </div>
                <div className="pull-left finances-settings-text-small">Current spending rate: #{team.budget.health.rank}<br />Spent this season: #{team.expenses.health.rank}</div>
            </div>
            <div className="row">
                <div className="pull-left finances-settings-label">Facilities</div>
                <div className="input-group input-group-sm pull-left finances-settings-field">
                    <span className="input-group-addon">$</span>
                    <input type="text" name="budget[facilities]" className="form-control" disabled={formDisabled} value={team.budget.facilities.amount} />
                    <span className="input-group-addon">M</span>
                </div>
                <div className="pull-left finances-settings-text-small">Current spending rate: #{team.budget.facilities.rank}<br />Spent this season: #{team.expenses.facilities.rank}</div>
            </div>
            <br />
            {
                tid === g.userTid
            ?
                <div className="row">
                    <div className="pull-left finances-settings-label">&nbsp;</div>
                    <div className="input-group input-group-sm pull-left finances-settings-field">
                        <button
                            className="btn btn-large btn-primary"
                            disabled={formDisabled}
                            style={{lineHeight: '1.5em'}}
                        >
                            Save Revenue and<br />Expense Settings
                        </button>
                    </div>
                </div>
            :
                null
            }
        </form>;
    }
}

const TeamFinances = ({abbrev, barData = {expenses: {salary: [], minTax: [], luxuryTax: [], scouting: [], coaching: [], health: [], facilities: []}, revenues: {localTv: [], luxuryTaxShare: [], merch: [], nationalTv: [], sponsor: [], ticket: []}}, barSeasons, contractTotals = [], contracts = [], gamesInProgress, luxuryPayroll, luxuryTax, minContract, minPayroll, numGames, payroll, salariesSeasons = [], salaryCap, show, team = {budget: {ticketPrice: {amount: '', rank: null}, scouting: {amount: '', rank: null}, budget: {amount: '', rank: null}, coaching: {amount: '', rank: null}, health: {amount: '', rank: null}, facilities: {amount: '', rank: null}}, expenses: {ticketPrice: {amount: '', rank: null}, scouting: {amount: '', rank: null}, budget: {amount: '', rank: null}, coaching: {amount: '', rank: null}, health: {amount: '', rank: null}, facilities: {amount: '', rank: null}}, name: null, region: null}, tid}) => {
    bbgmViewReact.title(`${team.region} ${team.name} Finances`);

    const cols = getCols('Name').concat(salariesSeasons.map(season => {
        return {
            title: season,
            sortSequence: ['desc', 'asc'],
            sortType: 'currency',
        };
    }));

    const rows = contracts.map(p => {
        const data = [
            <PlayerNameLabels
                injury={p.injury}
                pid={p.pid}
                skills={p.skills}
                style={{fontStyle: p.released ? 'italic' : 'normal'}}
                watch={p.watch}
            >{p.firstName} {p.lastName}</PlayerNameLabels>,
        ];
        for (let i = 0; i < 5; i++) {
            if (p.amounts[i]) {
                data.push(helpers.formatCurrency(p.amounts[i], "M"));
            } else {
                data.push(null);
            }
            if (p.released) {
                data[i + 1] = <i>{data[i + 1]}</i>;
            }
        }

        return {
            key: p.pid,
            data,
        };
    });

    const footer = ['Totals'].concat(contractTotals.map(amount => helpers.formatCurrency(amount, 'M')));

    return <div>
        <Dropdown view="team_finances" fields={["teams", "shows"]} values={[abbrev, show]} />
        <h1>{team.region} {team.name} Finances <NewWindowLink /></h1>

        <p>More: <a href={helpers.leagueUrl(['roster', abbrev])}>Roster</a> | <a href={helpers.leagueUrl(['game_log', abbrev])}>Game Log</a> | <a href={helpers.leagueUrl(['team_history', abbrev])}>History</a> | <a href={helpers.leagueUrl(['transactions', abbrev])}>Transactions</a></p>


        <p className="clearfix">The current payroll (<b>{helpers.formatCurrency([team.payroll, 'M'])}</b>) is {payroll > minPayroll ? 'above' : 'below'} the minimum payroll limit (<b>{helpers.formatCurrency([minPayroll, 'M'])}</b>), {payroll > salaryCap ? 'above' : 'below'} the salary cap (<b>{helpers.formatCurrency([salaryCap, 'M'])}</b>), and {payroll > luxuryPayroll ? 'above' : 'below'} the luxury tax limit (<b>{helpers.formatCurrency([luxuryPayroll, 'M'])}</b>). <HelpPopover placement="bottom" title="Payroll Limits">
            The salary cap is a soft cap, meaning that you can exceed it to re-sign your own players or to sign free agents to minimum contracts (${minContract}k/year); however, you cannot exceed the salary cap to sign a free agent for more than the minimum. Teams with payrolls below the minimum payroll limit will be assessed a fine equal to the difference at the end of the season. Teams with payrolls above the luxury tax limit will be assessed a fine equal to {luxuryTax} times the difference at the end of the season.
        </HelpPopover></p>

        <div className="row">
            <div className="col-md-3 col-sm-2">
                <h4>Wins</h4>
                <div className="bar-graph-small">
                    <BarGraph
                        data={barData.won}
                        labels={barSeasons}
                        ylim={[0, numGames]}
                    />
                </div><br /><br />
                <h4>Hype <HelpPopover placement="right" title="Hype">
                    "Hype" refers to fans' interest in your team. If your team is winning or improving, then hype increases; if your team is losing or stagnating, then hype decreases. Hype influences attendance, various revenue sources such as merchandising, and the attitude players have towards your organization.
                </HelpPopover></h4>
                <div id="bar-graph-hype" className="bar-graph-small">
                    <BarGraph
                        data={barData.hype}
                        labels={barSeasons}
                        tooltipCb={val => helpers.round(val, 2)}
                        ylim={[0, 1]}
                    />
                </div><br /><br />
                <h4>Region Population</h4>
                <div id="bar-graph-pop" className="bar-graph-small">
                    <BarGraph
                        data={barData.pop}
                        labels={barSeasons}
                        tooltipCb={val => `${helpers.round(val, 1)}M`}
                        ylim={[0, 20]}
                    />
                </div><br /><br />
                <h4>Average Attendance</h4>
                <div id="bar-graph-att" className="bar-graph-small">
                    <BarGraph
                        data={barData.att}
                        labels={barSeasons}
                        tooltipCb={val => helpers.numberWithCommas(helpers.round(val))}
                        ylim={[0, 25000]}
                    />
                </div>
            </div>
            <div className="col-md-4 col-sm-4">
                <h4>Revenue</h4>
                <div id="bar-graph-revenue" className="bar-graph-large">
                    <BarGraph
                        data={[barData.revenues.nationalTv, barData.revenues.localTv, barData.revenues.ticket, barData.revenues.sponsor, barData.revenues.merch, barData.revenues.luxuryTaxShare]}
                        labels={[
                            barSeasons,
                            ["national TV revenue", "local TV revenue", "ticket revenue", "corporate sponsorship revenue", "merchandising revenue", "luxury tax share revenue"],
                        ]}
                        tooltipCb={val => helpers.formatCurrency(val / 1000, 'M', 1)}
                    />
                </div><br /><br />
                <h4>Expenses</h4>
                <div id="bar-graph-expenses" className="bar-graph-large">
                    <BarGraph
                        data={[barData.expenses.salary, barData.expenses.minTax, barData.expenses.luxuryTax, barData.expenses.scouting, barData.expenses.coaching, barData.expenses.health, barData.expenses.facilities]}
                        labels={[
                            barSeasons,
                            ["player salaries", "minimum payroll tax", "luxury tax", "scouting", "coaching", "health", "facilities"],
                        ]}
                        tooltipCb={val => helpers.formatCurrency(val / 1000, 'M', 1)}
                    />
                </div><br /><br />
                <h4>Cash (cumulative)</h4>
                <div id="bar-graph-cash" className="bar-graph-medium">
                    <BarGraph
                        data={barData.cash}
                        labels={barSeasons}
                        tooltipCb={val => helpers.formatCurrency(val, 'M', 1)}
                    />
                </div>
            </div>
            <div className="col-md-5 col-sm-6">
                <FinancesForm
                    gamesInProgress={gamesInProgress}
                    team={team}
                    tid={tid}
                />
            </div>
        </div>
        <p className="clearfix"></p>

        <h2>Player Salaries</h2>

        <p>You can release players from <a href={helpers.leagueUrl(['roster'])}>your roster</a>. Released players who are still owed money are <i>shown in italics</i>.</p>

        <DataTable
            cols={cols}
            defaultSort={[1, 'desc']}
            footer={footer}
            rows={rows}
        />
    </div>;
};

module.exports = TeamFinances;
