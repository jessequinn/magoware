'use strict';
var path = require('path');

/**
 * Module init function.
 */
module.exports = function(app, db) {

    app.locals.timezones = require(path.resolve('./config/defaultvalues/timezones.json'));

};