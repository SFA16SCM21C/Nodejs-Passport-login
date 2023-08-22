const express = require('express');
const router = express.Router();

// Login Page
router.get('/login', (req, res) => res.render('login'));

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
        res.send('pass');
    }
});

module.exports = router;