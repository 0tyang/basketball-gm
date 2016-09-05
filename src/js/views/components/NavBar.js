const Promise = require('bluebird');
const $ = require('jquery');
const React = require('react');
const Dropdown = require('react-bootstrap/lib/Dropdown');
const MenuItem = require('react-bootstrap/lib/MenuItem');
const Nav = require('react-bootstrap/lib/Nav');
const NavItem = require('react-bootstrap/lib/NavItem');
const Navbar = require('react-bootstrap/lib/Navbar');
const ui = require('../../ui');
const html2canvas = require('../../lib/html2canvas');
const actions = require('../../util/actions');
const helpers = require('../../util/helpers');

const toggleDebugMode = () => {
    if (localStorage.debug === "debug") {
        localStorage.debug = "";
    } else {
        localStorage.debug = "debug";
    }
    window.location.reload();
};

class TopMenuToggle extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.onClick(e);
    }

    handleMouseEnter(e) {
        if (this.props.openId !== undefined && this.props.openId !== this.props.long) {
            this.props.onClick(e);
        }
    }

    render() {
        return <a
            className="dropdown-toggle"
            onClick={this.handleClick}
            onMouseEnter={this.handleMouseEnter}
            data-no-davis="true"
        >
            <span className="hidden-sm">{this.props.long} <b className="caret"></b></span>
            <span className="visible-sm">{this.props.short} <b className="caret"></b></span>
        </a>;
    }
}

const TopMenuDropdown = ({children, long, short, openId, onToggle}) => {
    return <Dropdown
        componentClass="li"
        id={`top-menu-${long.toLowerCase()}`}
        open={openId === long}
        onToggle={() => onToggle(long)}
    >
        <TopMenuToggle bsRole="toggle" long={long} short={short} openId={openId} />
        <Dropdown.Menu>
            <MenuItem className="visible-sm" header>{long}</MenuItem>
            {children}
        </Dropdown.Menu>
    </Dropdown>;
};

class DropdownLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openId: undefined,
        };
        this.handleScreenshotClick = this.handleScreenshotClick.bind(this);
        this.handleTopMenuToggle = this.handleTopMenuToggle.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.openId !== nextState.openId || this.props.lid !== nextProps.lid || this.props.godMode !== nextProps.godMode;
    }

    handleScreenshotClick(e) {
        e.preventDefault();

        let contentEl = document.getElementById("screenshot-league");
        if (!contentEl) { contentEl = document.getElementById("screenshot-nonleague"); }

        // Add watermark
        const watermark = document.createElement("div");
        watermark.innerHTML = `<nav class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header">${document.getElementsByClassName("navbar-brand")[0].parentNode.innerHTML}</div><p class="navbar-text navbar-right" style="color: #000; font-weight: bold">Play your own league free at basketball-gm.com</p></div></nav>`;
        contentEl.insertBefore(watermark, contentEl.firstChild);
        contentEl.style.padding = "8px";

        // Add notifications
        const notifications = document.getElementsByClassName('notification-container')[0].cloneNode(true);
        notifications.classList.remove('notification-container');
        for (let i = 0; i < notifications.childNodes.length; i++) {
            // Otherwise screeenshot is taken before fade in is complete
            notifications.childNodes[0].classList.remove('notification-fadein');
        }
        contentEl.appendChild(notifications);

        html2canvas(contentEl, {
            background: "#fff",
            async onrendered(canvas) {
                // Remove watermark
                contentEl.removeChild(watermark);
                contentEl.style.padding = "";

                // Remove notifications
                contentEl.removeChild(notifications);

                try {
                    const data = await Promise.resolve($.ajax({
                        url: "https://imgur-apiv3.p.mashape.com/3/image",
                        type: "post",
                        headers: {
                            Authorization: "Client-ID c2593243d3ea679",
                            "X-Mashape-Key": "H6XlGK0RRnmshCkkElumAWvWjiBLp1ItTOBjsncst1BaYKMS8H",
                        },
                        data: {
                            image: canvas.toDataURL().split(',')[1],
                        },
                        dataType: "json",
                    }));
                    document.getElementById("screenshot-link").href = `http://imgur.com/${data.data.id}`;
                    $("#modal-screenshot").modal("show");
                } catch (err) {
                    console.log(err);
                    if (err && err.responseJSON && err.responseJSON.error && err.responseJSON.error.message) {
                        helpers.errorNotify(`Error saving screenshot. Error message from Imgur: "${err.responseJSON.error.message}"`);
                    } else {
                        helpers.errorNotify("Error saving screenshot.");
                    }
                }
            },
        });
    }

    handleToolsClick(id, e) {
        e.preventDefault();
        actions.toolsMenu[id]();
    }

    handleTopMenuToggle(id) {
        this.setState({
            openId: id === this.state.openId ? undefined : id,
        });
    }

    render() {
        const {godMode, lid} = this.props;

        return <Nav pullRight>
            {lid !== undefined ? <NavItem href={helpers.leagueUrl([])}>
                <span className="hidden-xs"><span className="glyphicon glyphicon-home" /></span>
                <span className="visible-xs"><span className="glyphicon glyphicon-home" style={{marginRight: '5px'}} />League Dashboard</span>
            </NavItem> : null}
            {lid !== undefined ? <TopMenuDropdown long="League" short="L" openId={this.state.openId} onToggle={this.handleTopMenuToggle}>
                <MenuItem href={helpers.leagueUrl(['standings'])}>Standings</MenuItem>
                <MenuItem href={helpers.leagueUrl(['playoffs'])}>Playoffs</MenuItem>
                <MenuItem href={helpers.leagueUrl(['league_finances'])}>Finances</MenuItem>
                <MenuItem href={helpers.leagueUrl(['history_all'])}>History</MenuItem>
                <MenuItem href={helpers.leagueUrl(['power_rankings'])}>Power Rankings</MenuItem>
                <MenuItem href={helpers.leagueUrl(['transactions', 'all'])}>Transactions</MenuItem>
            </TopMenuDropdown> : null}
            {lid !== undefined ? <TopMenuDropdown long="Team" short="T" openId={this.state.openId} onToggle={this.handleTopMenuToggle}>
                <MenuItem href={helpers.leagueUrl(['roster'])}>Roster</MenuItem>
                <MenuItem href={helpers.leagueUrl(['schedule'])}>Schedule</MenuItem>
                <MenuItem href={helpers.leagueUrl(['team_finances'])}>Finances</MenuItem>
                <MenuItem href={helpers.leagueUrl(['team_history'])}>History</MenuItem>
                <MenuItem href={helpers.leagueUrl(['transactions'])}>Transactions</MenuItem>
            </TopMenuDropdown> : null}
            {lid !== undefined ? <TopMenuDropdown long="Players" short="P" openId={this.state.openId} onToggle={this.handleTopMenuToggle}>
                <MenuItem href={helpers.leagueUrl(['free_agents'])}>Free Agents</MenuItem>
                <MenuItem href={helpers.leagueUrl(['trade'])}>Trade</MenuItem>
                <MenuItem href={helpers.leagueUrl(['trading_block'])}>Trading Block</MenuItem>
                <MenuItem href={helpers.leagueUrl(['draft'])}>Draft</MenuItem>
                <MenuItem href={helpers.leagueUrl(['watch_list'])}>Watch List</MenuItem>
                <MenuItem href={helpers.leagueUrl(['hall_of_fame'])}>Hall of Fame</MenuItem>
            </TopMenuDropdown> : null}
            {lid !== undefined ? <TopMenuDropdown long="Stats" short="S" openId={this.state.openId} onToggle={this.handleTopMenuToggle}>
                <MenuItem href={helpers.leagueUrl(['game_log'])}>Game Log</MenuItem>
                <MenuItem href={helpers.leagueUrl(['leaders'])}>League Leaders</MenuItem>
                <MenuItem href={helpers.leagueUrl(['player_ratings'])}>Player Ratings</MenuItem>
                <MenuItem href={helpers.leagueUrl(['player_stats'])}>Player Stats</MenuItem>
                <MenuItem href={helpers.leagueUrl(['team_stats'])}>Team Stats</MenuItem>
                <MenuItem href={helpers.leagueUrl(['player_feats'])}>Statistical Feats</MenuItem>
            </TopMenuDropdown> : null}
            <TopMenuDropdown long="Tools" short="X" openId={this.state.openId} onToggle={this.handleTopMenuToggle}>
                <MenuItem href="/account">Achievements</MenuItem>
                {lid !== undefined ? <MenuItem onClick={e => this.handleToolsClick('autoPlaySeasons', e)} data-no-davis="true">Auto Play Seasons</MenuItem> : null}
                {lid !== undefined && godMode ? <MenuItem href={helpers.leagueUrl(['customize_player'])} className="god-mode-menu">Create A Player</MenuItem> : null}
                {lid !== undefined && godMode ? <MenuItem href={helpers.leagueUrl(['edit_team_info'])} className="god-mode-menu">Edit Team Info</MenuItem> : null}
                {lid !== undefined ? <MenuItem href={helpers.leagueUrl(['event_log'])}>Event Log</MenuItem> : null}
                {lid !== undefined ? <MenuItem href={helpers.leagueUrl(['export_league'])}>Export League</MenuItem> : null}
                {lid !== undefined ? <MenuItem href={helpers.leagueUrl(['export_stats'])}>Export Stats</MenuItem> : null}
                {lid !== undefined ? <MenuItem href={helpers.leagueUrl(['fantasy_draft'])}>Fantasy Draft</MenuItem> : null}
                {lid !== undefined ? <MenuItem href={helpers.leagueUrl(['god_mode'])}>God Mode</MenuItem> : null}
                {lid !== undefined ? <MenuItem href={helpers.leagueUrl(['delete_old_data'])}>Improve Performance</MenuItem> : null}
                {lid !== undefined && godMode ? <MenuItem href={helpers.leagueUrl(['multi_team_mode'])} className="god-mode-menu">Multi Team Mode</MenuItem> : null}
                {lid !== undefined && godMode ? <MenuItem href={helpers.leagueUrl(['new_team'])} className="god-mode-menu">Switch Team</MenuItem> : null}
                <MenuItem onClick={this.handleScreenshotClick} data-no-davis="true"><span className="glyphicon glyphicon-camera"></span> Screenshot</MenuItem>
                {lid !== undefined ? <li className="divider"></li> : null}
                <li role="presentation" className="dropdown-header">Use at your own risk!</li>
                {lid !== undefined ? <MenuItem onClick={e => this.handleToolsClick('skipToPlayoffs', e)} data-no-davis="true">Skip To Playoffs</MenuItem> : null}
                {lid !== undefined ? <MenuItem onClick={e => this.handleToolsClick('skipToBeforeDraft', e)} data-no-davis="true">Skip To Before Draft</MenuItem> : null}
                {lid !== undefined ? <MenuItem onClick={e => this.handleToolsClick('skipToAfterDraft', e)} data-no-davis="true">Skip To After Draft</MenuItem> : null}
                {lid !== undefined ? <MenuItem onClick={e => this.handleToolsClick('skipToPreseason', e)} data-no-davis="true">Skip To Preseason</MenuItem> : null}
                {lid !== undefined ? <MenuItem onClick={e => this.handleToolsClick('forceResumeDraft', e)} data-no-davis="true">Force Resume Draft</MenuItem> : null}
                <MenuItem href="" onClick={toggleDebugMode} id="toggle-debug-mode">
                    {localStorage.debug === "debug" ? 'Disable Debug Mode' : 'Enable Debug Mode'}
                </MenuItem>
                <MenuItem onClick={e => this.handleToolsClick('resetDb', e)} data-no-davis="true">Reset DB</MenuItem>
            </TopMenuDropdown>
            <TopMenuDropdown long="Help" short="?" openId={this.state.openId} onToggle={this.handleTopMenuToggle}>
                <MenuItem href="https://basketball-gm.com/manual/" target="_blank">Overview</MenuItem>
                <MenuItem href="/changes">Changes</MenuItem>
                <MenuItem href="https://basketball-gm.com/manual/customization/" target="_blank">Custom Rosters</MenuItem>
                <MenuItem href="https://basketball-gm.com/manual/debugging/" target="_blank">Debugging</MenuItem>
            </TopMenuDropdown>
        </Nav>;
    }
}

class LogoAndText extends React.Component {
    shouldComponentUpdate(nextProps) {
        return this.props.lid !== nextProps.lid || this.props.updating !== nextProps.updating;
    }

    render() {
        const {lid, updating} = this.props;

        return <a className="navbar-brand" href="/">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAN1wAADdcBQiibeAAAAAd0SU1FB9wIFRUXBgiS2qAAAAN8SURBVDjLbZRdTFtlGMd/b885PaXfYOk2vqHODWFsZIqySGLMdJsx2SQGdZk3uzIaL4war0282LUX3ng7WLLdSEzcZqJxKmXOSLbBBoJaoBDWQktLP0/POT1etHSV7E3e5D0neX75///P+7yCJ6zeVuW9Vwc9r4eCSo9TtgVspo1Mzty+fi+bWUro1/6Na1/vrRH1H8+F3P2vHHdcOjPkfi2eNBSbBacH3LhtNtAADcandvTx31Nzq1vWxQebubu7tdLuYeSo69SH53zjn5x/aqirTZH6QirPtNm5OZMDAQGPDMBAiyp1+pQDflWMysKa/yepL9VAve32/o/fbJq4cNrfjR2wAzLYJMHhNpX1LYNbD/L0taoIoMOvsJY0XIMHHCPRtPnLelrfkAAuvOy//NlY4DgyoFRBSlWqBft9MgGXxNXwDh1NCk7FxtaOwYl2py+a0HvCq4XL0vBB5xtfng9+GvBLMjao7SqEMmCCW7Ux2O5geqHAXFQjUyzz7f0MA/scndGUMS8/36W+3aRKju/CGewNAkkVIINVbUPQK9HZpOBXJIQNTh5xVYIvglwWnDvokW4vF0bl7Ux5aGapwMkBNw0e8dhWtQ3xpMFfyyVSaRMMKGvQ5lE40qzW+t7hV7rlYy0O6dQhd8VGsWrFqIIEBJ0ywZBc+acDJVjd0Pl+Nks4kqfTreCyi2bZJYmK1Lo8aopEXVZmFWRUuqa0CholCQm4s1Zwytm8FUcjVIOYdYr2hB7bNphayIMBkbjOR8NN2E1BX8ARlZc3SxGKDNcgZhVSBW3nTW7MZdF1aPHJnDnsoUEIvvopyfWHWc4+7WE1U1qUp9e0a5GYPtYdUORdNUXL4lYkx6OMQaNLYrTPiyqJivUybCQMjgYdbGdNFh5p2p1V7aoAeKffGx7t9Q5bgIGFqgpe6nGyzys/tgc10MSfad7t97EYK/HFz5vTV+bSJ2SASMp830JMjj3r6aJ+CovVwOtCv71SYLDZgTDgj/XCym8ruc9rs7a+o8eSudKsJWwjx/Y7Gvfe6t29ENNI5E2GWhqYmE0tfzOT+uB+XPvxf9MfSRuR+U3th8Wt0qGeRntrwCnJ9U/Mjb+zZEoWoUa7fmkqcfPKvdzF6fVc+Inv0e56ocV59sX2hrfavErXwpbWrpmW6PAp0UTBXPw1mp18GCtN7q35D5RXZnIkhyKSAAAAAElFTkSuQmCC" width="18" height="18" className='spin' style={{
                animationPlayState: updating ? 'running' : 'paused',
                WebkitAnimationPlayState: updating ? 'running' : 'paused',
            }} />
            <span className="hidden-md hidden-sm hidden-xs">Basketball GM</span>
            {lid === undefined ? <span className="visible-md visible-sm visible-xs">Basketball GM</span> : null}
        </a>;
    }
}

class PlayMenu extends React.Component {
    constructor(props) {
        super(props);
        this.handleAltP = this.handleAltP.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keyup', this.handleAltP);
    }

    componentWillUnmount() {
        document.removeListener('keyup', this.handleAltP);
    }

    handleAltP(e) {
        // alt + p
        if (e.altKey && e.keyCode === 80) {
            const option = this.props.options[0];

            if (!option) {
                return;
            }

            if (option.url) {
                ui.realtimeUpdate([], option.url);
            } else {
                actions.playMenu[option.id]();
            }
        }
    }

    handleClick(option, e) {
        if (!option.url) {
            e.preventDefault();
            actions.playMenu[option.id]();
        }
    }

    render() {
        const {lid, options} = this.props;

        if (lid === undefined) {
            return <div />;
        }

        return <ul className="nav navbar-nav-no-collapse">
            <Dropdown componentClass="li" id="play-menu">
                <Dropdown.Toggle className="play-button" useAnchor={true} data-no-davis="true">
                    <span className="hidden-xs">Play</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {options.map((option, i) => {
                        return <MenuItem
                            key={i}
                            href={option.url}
                            onClick={e => this.handleClick(option, e)}
                            data-no-davis={option.url ? null : 'true'}
                        >
                            {option.label}
                            {i === 0 ? <span className="text-muted kbd">Alt+P</span> : null}
                        </MenuItem>;
                    })}
                </Dropdown.Menu>
            </Dropdown>
        </ul>;
    }
}

const NavBar = ({lid, godMode, options, phaseText, popup, statusText, updating, username}) => {
    if (popup) {
        return null;
    }

    return <Navbar fixedTop>
        <div className="pull-right" style={{marginLeft: '15px'}}>
                {
                    username
                ?
                    <a className="navbar-link user-menu" href="/account">
                        <span className="glyphicon glyphicon-user"></span>{' '}
                        <span className="visible-lg">{username}</span>
                    </a>
                :
                    <a className="navbar-link user-menu" href="/account/login_or_register">
                        <span className="glyphicon glyphicon-user"></span>{' '}
                        <span className="visible-lg">Login/Register</span>
                    </a>
                }
        </div>
        <Navbar.Header>
            <LogoAndText lid={lid} updating={updating} />
            <PlayMenu lid={lid} options={options} />
            {lid !== undefined ? <p className="navbar-text-two-line-no-collapse">
                {phaseText}<br />
                {statusText}
            </p> : null}
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <DropdownLinks godMode={godMode} lid={lid} />
        </Navbar.Collapse>
    </Navbar>;
};

module.exports = NavBar;
