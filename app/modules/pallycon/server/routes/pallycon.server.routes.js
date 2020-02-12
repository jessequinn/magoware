'use strict';
var path = require('path');
var authpolicy = require(path.resolve('./modules/deviceapiv2/server/auth/apiv2.server.auth.js'));
var pallyconController = require(path.resolve('./modules/pallycon/server/controllers/pallycon.server.controller'));

module.exports = function(app) {
    app.route('/apiv2/pallycon/CIDIssue')
        .post(pallyconController.handleCIDIssue);

    app.route('/apiv2/pallycon/ContentUsageRightsInfo')
        .post(pallyconController.handleContentUsageRightInfo);

    //https://pallycon.com/docs/en/multidrm/license/license-token-tutorial/
    app.route('/apiv2/pallycon/TokenIssue')
        .all(authpolicy.isAllowed)
        .get(pallyconController.TokenIssue);

};