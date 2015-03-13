var XBDD = require('./xbdd');

XBDD.sendReport('basic-report.json', {
    xbddUrl: 'https://localhost:28443/xbdd',
    product: 'test_node',
    version: [1, 0, 0],
    build: 1
});
