'use strict';

require('indexeddb-getall-shim');
require('../util/templateHelpers');

mocha.setup({
    ui: 'bdd',
    timeout: 20000
});

require('./core/contractNegotiation');
require('./core/draft');
require('./core/finances');
require('./core/league');
require('./core/player');
require('./core/season');
require('./core/team');
require('./core/trade');
require('./util/account');
require('./util/helpers');
require('./views/components');
require('./views/gameLog');