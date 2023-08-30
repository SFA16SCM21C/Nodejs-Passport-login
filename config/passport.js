const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameFiled: 'email'}, (email, password, done) => {
            // match the user
            User.findOne({ email: emaill })
            .then(user => {
                if(!user) {
                    return done(null, false, { message: 'That email is not registered' });
                }

                // match the password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;

                    if(isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect' });
                    }
                });
            })
            .catch(err => console,log(err))
        })
    );

    passport.serializeUser((user, cb) => {
        process.nextTick(() => {
          return cb(null, {
            id: user.id,
            username: user.username,
            picture: user.picture
          });
        });
      });
      
      passport.deserializeUser((user, cb) => {
        process.nextTick(() => {
          return cb(null, user);
        });
      });
}