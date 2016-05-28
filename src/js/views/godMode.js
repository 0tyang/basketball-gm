const g = require('../globals');
const ui = require('../ui');
const league = require('../core/league');
const bbgmView = require('../util/bbgmView');
const eventLog = require('../util/eventLog');
const helpers = require('../util/helpers');
const $ = require('jquery');

async function updateGodMode(inputs, updateEvents) {
    if (updateEvents.indexOf("dbChange") >= 0 || updateEvents.indexOf("firstRun") >= 0 || updateEvents.indexOf("toggleGodMode") >= 0) {
        // Make sure it's current
        await league.loadGameAttributes(null);

        return {
            godMode: g.godMode,
            injuries: [{
                text: 'Enabled',
                disabled: false
            }, {
                text: 'Disabled',
                disabled: true
            }],
            disableInjuries: g.disableInjuries,
            numGames: g.numGames,
            quarterLength: g.quarterLength,
            minRosterSize: g.minRosterSize,
            salaryCap: g.salaryCap / 1000,
            minPayroll: g.minPayroll / 1000,
            luxuryPayroll: g.luxuryPayroll / 1000,
            luxuryTax: g.luxuryTax,
            minContract: g.minContract / 1000,
            maxContract: g.maxContract / 1000
        };
    }
}

function uiFirst(vm) {
    ui.title("God Mode");

    document.getElementById("enable-god-mode").addEventListener("click", async () => {
        await league.setGameAttributesComplete({godMode: true, godModeInPast: true});

        league.updateLastDbChange();
        ui.realtimeUpdate(["toggleGodMode"], helpers.leagueUrl(["god_mode"]));
    });

    document.getElementById("disable-god-mode").addEventListener("click", async () => {
        await league.setGameAttributesComplete({godMode: false});

        league.updateLastDbChange();
        ui.realtimeUpdate(["toggleGodMode"], helpers.leagueUrl(["god_mode"]));
    });

    document.getElementById("save-god-mode-options").addEventListener("click", async () => {
        await league.setGameAttributesComplete({
            disableInjuries: vm.disableInjuries(),
            numGames: parseInt(vm.numGames(), 10),
            quarterLength: parseFloat(vm.quarterLength()),
            minRosterSize: parseInt(vm.minRosterSize(), 10),
            salaryCap: parseInt(vm.salaryCap() * 1000, 10),
            minPayroll: parseInt(vm.minPayroll() * 1000, 10),
            luxuryPayroll: parseInt(vm.luxuryPayroll() * 1000, 10),
            luxuryTax: parseFloat(vm.luxuryTax()),
            minContract: parseInt(vm.minContract() * 1000, 10),
            maxContract: parseInt(vm.maxContract() * 1000, 10)
        });

        league.updateLastDbChange();

        eventLog.add(null, {
            type: "success",
            text: 'God Mode options successfully updated.',
            saveToDb: false
        });

        ui.realtimeUpdate(["toggleGodMode"], helpers.leagueUrl(["god_mode"]));
    });

    $("#help-injuries").popover({
        title: "Injuries",
        content: "This won't heal current injuries, but it will prevent any new ones from occurring."
    });

    $("#help-num-games").popover({
        title: "# Games Per Season",
        content: "This will only apply to seasons that have not started yet."
    });

    $("#help-luxury-tax").popover({
        title: "Luxury Tax",
        content: "Take the difference between a team's payroll and the luxury tax threshold. Multiply that by this number. The result is the penalty they have to pay."
    });
}

module.exports = bbgmView.init({
    id: "godMode",
    runBefore: [updateGodMode],
    uiFirst
});
