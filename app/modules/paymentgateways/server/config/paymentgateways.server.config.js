'use strict';

var paymenttokens = {

    "STRIPE":  {
        "API_KEY":        "'YOUR KEY HERE'",
        "ENDPOIN_REFUND": "'YOUR KEY HERE'"
    }
}

/**
 * Module init function.
 */
module.exports = function(app, db) {
    app.locals.paymenttokens = paymenttokens;
};

