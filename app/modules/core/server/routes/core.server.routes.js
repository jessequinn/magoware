'use strict';

module.exports = function(app) {
  // Root routing
  var core = require('../controllers/core.server.controller');
  var path = require('path');

    // Define error pages
  app.route('/server-error').get(core.renderServerError);

  app.route('/subscribe').post(core.recaptch_service);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  //Submit contact form data
  app.route('/api/contact').post(core.contact);

  //generate auth token
  app.route('/apiv2/generate_demo_auth')
      .post(core.generateauth);

  app.route('/apiv2/testjwtoken')
      .all(core.testjwtoken);

  app.route('/apiv2/testauth')
     .post(core.testAuthToken)
};
