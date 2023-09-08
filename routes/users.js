const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('/local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', (req, res) => {
    //console.log(req.body);
    //res.send('post request was successful');

    const { name, email, password, password2 } = req.body;
    let errors = [];

    // checking for the required fields to generate errors
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // checking if the password mathc or not
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // checking for password length
    if (password.length < 6) {
        errors.push({ msg: 'Password should have a minmum length of 6 characters'});
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else {
        //res.send('pass');

        //adding code for validation passed
        User.findOne({ email: email })
        .then(user => {
            if (user) {
                // user exists then condition
                errors.push({ msg: 'Email is aleady registered'});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                // console.log(newUser);
                // res.send('hello');

                // Generate Hash password and then send to API
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        // set password to hashed
                        newUser.password = hash;
                        // save the user generated
                        newUser.save()
                            .then(user => {
                                req.flash('sucess_msg', 'You are now registered and can log in');
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err0))

                }));
            }
        });
    }
});

// Logout hadlee
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You aare logged out');
    res.redirect('/users/login');
});

module.exports = router;