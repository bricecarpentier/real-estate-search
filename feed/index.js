exports.display = require('./display').display;

var edit = require('./edit')
for (var prop in edit) {
    exports[prop] = edit[prop];
}
