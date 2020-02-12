'use strict';

/**
 * Module dependencies.
 */
const path = require('path'),
    config = require(path.resolve('./config/config')),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    authentication = require(path.resolve('./modules/deviceapiv2/server/controllers/authentication.server.controller.js')),
    nodemailer = require('nodemailer'),
    async = require('async'),
    crypto = require('crypto'),
    randomstring = require("randomstring"),
    response = require(path.resolve("./config/responses.js")),
    db = require(path.resolve('./config/lib/sequelize')).models,
    login_data = db.login_data,
    email_templates = db.email_templates,
    devices = db.devices,
    mail  = require(path.resolve("custom_functions/mail.js")),
    moment = require('moment');

const winston = require('winston');

/**
 * Reset password GET from email token
 */
exports.renderPasswordForm = function (req, res) {
  login_data.findOne({
    where: {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: {
        $gt: new Date().toISOString()
      }
    }
  }).then(function (user) {
    if (!user) {
      return res.send('<html><body style="background-color:">' +
        '<div style="font-size:20px;padding: 35px;border-radius:6px;color: #ffffff;background-color: #fc5c5a;border-color: #ffffff;">' +
        '<center><span>Error: </span>Link is not valid</center></div></body></html>');
    } else {
      res.render(path.resolve('modules/deviceapiv2/server/templates/reset-password-enter-password'), {token: req.params.token}, function (err, html) {
        res.send(html);
      });
      return null;
    }
  });
};

/**
 *
 */
exports.resetForgottenPassword = function (req, res) {
  const newPass = req.body.password;
  const token = req.params.token;
  const confirmPassword = req.body.repeatpassword;

  if (newPass !== confirmPassword) {
    return res.json({message: "Passwords dont match"})
  }

  if (newPass.length < 4) {
    return res.json({message: "Password must be larger than 4 characters"})
  }

  return login_data.findOne({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: new Date().toISOString()
      }
    }
  }).then(function (user) {
    if (!user) {
      res.json({message: "No user was found"})
    } else {
      const salt = authentication.makesalt();
      return user.update(
        {
          password: newPass,
          salt: salt,
          resetPasswordToken: null,
          resetPasswordExpires: null
        }
      ).then(function (result) {

        //log user out of all devices
        return devices.update(
          {
            device_active: false
          },
          {where: {username: user.username, company_id: user.company_id}}
        ).then(function (result) {
          return res.send('<html><body style="background-color:">' +
            '<div style="font-size:25px;padding: 35px;border-radius:6px;color: #ffffff;background-color: #19d800;border-color: #ffffff;">' +
            '<center>Password Changed Successfully</center></div></body></html>');
        }).catch(function (error) {
          winston.error("Updating the status of a device record failed with error: ", error);
          return res.json({message: "Updating the status of a device record failed with error: "})
        });
      }).catch(function (error) {
        winston.error("Updating the credentials of a client's account failed with error: ", error);
        return res.json({message: "Updating the credentials of a client's account failed with error: "})
      });
    }
  });
};

/**
 * @api {post} /apiv2/password/forgot Reset password
 * @apiName ResetPassword
 * @apiGroup DeviceAPI
 *
 * @apiParam {String} [username]  Username account
 * @apiParam {String} [language]  Determines language of the email template
 *
 *@apiDescription Enter a valid username to test the API
 *
 */
exports.forgot = function(req, res, next) {
    const company_id = req.get("company_id") || 1;
    const smtpConfig = {
        host: (req.app.locals.backendsettings[company_id].smtp_host) ? req.app.locals.backendsettings[company_id].smtp_host.split(':')[0] : 'smtp.gmail.com',
        port: (req.app.locals.backendsettings[company_id].smtp_host) ? Number(req.app.locals.backendsettings[company_id].smtp_host.split(':')[1]) : 465,
        secure: (req.app.locals.backendsettings[company_id].smtp_secure === false) ? req.app.locals.backendsettings[company_id].smtp_secure : true,
        auth: {
            user: req.app.locals.backendsettings[company_id].email_username,
            pass: req.app.locals.backendsettings[company_id].email_password
        }
    };

    const smtpTransport = nodemailer.createTransport(smtpConfig);

    async.waterfall([
        //Generate new random password for this user, encrypt it, update password and set all devices for this user as inactive
        function(done) {
            if (req.body.username) {
                // Lookup user data by username
                return login_data.find({
                    where: {
                        username: req.body.username.toLowerCase()
                    },
                    include: [{model:db.customer_data, required:true}]
                }).then(function(user) {
                    if (!user) {
                        return res.status(400).send(response.APPLICATION_RESPONSE(req.body.language, 702, -1, 'USER_NOT_FOUND', 'User not found', []));
                    }  else {
                        //prepare smtp configurations
                        const smtpConfig = {
                            host: (req.app.locals.backendsettings[user.company_id].smtp_host) ? req.app.locals.backendsettings[user.company_id].smtp_host.split(':')[0] : 'smtp.gmail.com',
                            port: (req.app.locals.backendsettings[user.company_id].smtp_host) ? Number(req.app.locals.backendsettings[user.company_id].smtp_host.split(':')[1]) : 465,
                            secure: (req.app.locals.backendsettings[user.company_id].smtp_secure === false) ? req.app.locals.backendsettings[user.company_id].smtp_secure : true,
                            auth: {
                                user: req.app.locals.backendsettings[user.company_id].email_username,
                                pass: req.app.locals.backendsettings[user.company_id].email_password
                            }
                        };

                        //generate new password
                        const plaintext_password = randomstring.generate({ length: 4, charset: 'alphanumeric' });
                        const salt = authentication.makesalt();
                        const encrypted_password = authentication.encryptPassword(decodeURIComponent(plaintext_password), salt);
                        //update password for this user
                        return login_data.update(
                            {
                                password: encrypted_password,
                                salt: salt
                            },
                            {where: {username: req.body.username}}
                        ).then(function (result) {
                            //log user out of all devices
                            return devices.update(
                                {
                                    device_active: false
                                },
                                {where: {username: req.body.username}}
                            ).then(function (result) {
                                return done(null, user,plaintext_password);
                            }).catch(function(error) {
                                winston.error("Updating the status of a device record failed with error: ", error);
                                return done(error, user,plaintext_password);
                            });
                        }).catch(function(error) {
                            winston.error("Updating the credentials of a client's account failed with error: ", error);
                            return done(error, user,plaintext_password);
                        });
                    }
                }).catch(function(error) {
                    winston.error("Searching for the client's account and personal info failed with error: ", error);
                    return res.status(400).send({
                        message: 'Username field must not be blank'
                    });
                });
            } else {
                return res.status(400).send({
                    message: 'Username field must not be blank'
                });
            }
        },
        //Prepare email template with user data and new password
        function(user, new_password, done) {

            email_templates.findOne({
                attributes:['title','content'],
                where: {template_id: 'reset-password-email' , company_id: user.customer_datum.company_id}
            }).then(function (result,err) {
                if(!result){
                    res.render(path.resolve('modules/deviceapiv2/server/templates/reset-password-email'), {
                        name: user.customer_datum.firstname + ' '+ user.customer_datum.lastname, //user info
                        appName: config.app.title,
                        username: req.body.username,
                        password: new_password //plaintext random password that was generated
                    }, function(err, emailHTML) {
                        done(err, emailHTML, user);
                    });
                } else {
                    var response = result.content;
                    var emailHTML = response.replace(new RegExp('{{name}}', 'gi'), user.customer_datum.firstname + ' ' + user.customer_datum.lastname).replace(new RegExp('{{username}}', 'gi'),req.body.username).replace(new RegExp('{{appName}}', 'gi'),config.app.title).replace(new RegExp('{{password}}', 'gi'),new_password);
                    done(err,emailHTML, user);
                }
            });

        },
        // If valid email, send reset email using service
        function(emailHTML, user, done) {
            const mailOptions = {
                to: user.customer_datum.email, //user.email,
                from: req.app.locals.backendsettings[user.company_id].email_address,
                subject: 'Password Reset',
                html: emailHTML
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                if (!err) {
                    response.send_res(req, res, [], 200, 1, 'EMAIL_SENT_DESCRIPTION', 'EMAIL_SENT_DATA', 'no-store');
                } else {
                    response.send_res(req, res, [], 801, -1, 'EMAIL_NOT_SENT_DESCRIPTION', 'EMAIL_NOT_SENT_DATA', 'no-store');
                }
                done(err);
            });
        }
    ], function(err) {
        if (err) {
            winston.error("There has been an error at password/forgot, error: ", err);
            return next(err);
        }
    });
};


exports.forgotV2 = function (req, res) {
  const company_id = req.get("company_id") || 1;
  const username = req.body.username;
  const token = crypto.randomBytes(Math.ceil(64)).toString('hex').slice(0, 25);

  async.waterfall([
    //update the token
    function (done) {
      login_data.findOne({
        where: {
          username: username,
          company_id: company_id
        },
        include: [{model: db.customer_data}]
      }).then(function (user) {
        if (user) {
          user.update({
            resetPasswordToken: token,
            resetPasswordExpires: moment().add('2', 'hours').toISOString()
          }).then(function (updatedUser) {
            if (updatedUser) {
              done(null, user);
            } else {
                return response.send_res(req, res, [], 801, -1, 'EMAIL_NOT_SENT_DESCRIPTION', 'EMAIL_NOT_SENT_DATA', 'no-store');
            }
          }).catch(function (error) {
              winston.error("There has been a error updating reset password token, error: ", error);
              return response.send_res(req, res, [], 801, -1, 'EMAIL_NOT_SENT_DESCRIPTION', 'EMAIL_NOT_SENT_DATA', 'no-store');
          })
        } else {
            return response.send_res(req, res, [], 801, -1, 'USER_NOT_FOUND_DESCRIPTION', 'USER_NOT_FOUND_DATA', 'no-store');
        }
      }).catch(function (error) {
        winston.error("There has been a error updating reset password token, error: ", error);
        return response.send_res(req, res, [], 801, -1, 'EMAIL_NOT_SENT_DESCRIPTION', 'EMAIL_NOT_SENT_DATA', 'no-store');
      })
    },
    function (user, done) {
      email_templates.findOne({
        attributes: ['title', 'content'],
        where: {template_id: 'reset-password-email-device', company_id: company_id}
      }).then(function (result, err) {
        const link = req.protocol + '://' + req.get('host') + '/apiv2/password/reset/' + token;
        let emailHTML = '';
        if (!result) {
          emailHTML = "Dear user, please click this link to go to reset your password: " + link;
        } else {
          const response = result.content;
          emailHTML = response
            .replace(new RegExp('{{name}}', 'gi'), user.customer_datum.firstname + ' ' + user.customer_datum.lastname)
            .replace(new RegExp('{{username}}', 'gi'), req.body.username)
            .replace(new RegExp('{{appName}}', 'gi'), config.app.title)
            .replace(new RegExp('{{link}}', 'gi'), link);
        }
        done(null, emailHTML, user);
      });
    },
    function (html, user, done) {
      const mailOptions = {
        to: user.customer_datum.email,
        content_type: 'html',
        body: html,
        subject: 'Password Reset',
        company_id: user.company_id
      };
      mail.send(req, mailOptions).then(function (result) {
        response.send_res(req, res, [], 200, 1, 'EMAIL_SENT_DESCRIPTION', 'EMAIL_SENT_DATA', 'no-store');
        return done(null, 'done');
      }).catch(function (error) {
        winston.error("Error sending email at password forgot, error: ", error);
        response.send_res(req, res, [], 801, -1, 'EMAIL_NOT_SENT_DESCRIPTION', 'EMAIL_NOT_SENT_DATA', 'no-store');
      });
    }
  ], function (err) {
    if (err) {
      winston.error("Error at waterfall at password forgot, error: ", err);
      return response.send_res(req, res, [], 801, -1, 'EMAIL_NOT_SENT_DESCRIPTION', 'EMAIL_NOT_SENT_DATA', 'no-store');
    }
  })
};