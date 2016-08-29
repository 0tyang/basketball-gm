const React = require('react');
const g = require('../../globals');
const ui = require('../../ui');
const league = require('../../core/league');

class MultiTeamMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userTid: g.userTid,
            userTids: g.userTids,
        };
        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        g.emitter.on('multiTeamMenuUpdate', this.update);
    }

    componentWillUnmount() {
        g.emitter.removeListener('multiTeamMenuUpdate', this.update);
    }

    async handleChange(e) {
        const userTid = parseInt(e.target.value, 10);

        this.setState({userTid});

        await league.setGameAttributesComplete({
            userTid,
        });

        this.update();

        // dbChange is kind of a hack because it was designed for multi-window update only, but it should update everything
        ui.realtimeUpdate(["dbChange"]);
        league.updateLastDbChange();
    }

    update() {
        this.setState({
            userTid: g.userTid,
            userTids: g.userTids,
        });
    }

    render() {
        const {userTid, userTids} = this.state;

        // Hide if not multi team or not loaded yet
        if (userTids.length <= 1) {
            return null;
        }

        return <div className="multi-team-menu">
            <label htmlFor="multi-team-select">Currently controlling:</label><br />
            <select className="form-control" id="multi-team-select" onChange={this.handleChange} value={userTid}>
                {userTids.map((tid, i) => <option key={tid} value={tid}>
                    {g.teamRegionsCache[userTids[i]]} {g.teamNamesCache[userTids[i]]}
                </option>)}
            </select>
        </div>;
    }
}

module.exports = MultiTeamMenu;
