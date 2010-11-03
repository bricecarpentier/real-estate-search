exports.display = require('./display').display;

var new_feed = require('./new-feed')
for (var prop in new_feed) {
    exports[prop] = new_feed[prop];
}
