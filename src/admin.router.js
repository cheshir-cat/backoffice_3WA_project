const { default: AdminBro } = require('admin-bro');
const { buildAuthenticatedRouter } = require('admin-bro-expressjs');
const express = require('express');
const argon2 = require('argon2');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const { User } = require('./user/user.entity');

/** 
 * @param {AdminBro} admin
 * @return {express.Router} router
 */
const buildAdminRouter = (admin) => {
    const router = buildAuthenticatedRouter(admin, {
        cookiName: 'backoffice_project_cookie',
        cookiePassword: 'end_year_project_backoffice_3wa_cookie_for_users_password',
        authenticate: async (email, password) => {
            const user = await User.findOne({ email })
            if (user && await argon2.verify(user.encryptedPassword, password)) {
                return user.toJSON();
            }
            return null;
        },
    }, null, {
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    });
    return router;
};

module.exports = buildAdminRouter;