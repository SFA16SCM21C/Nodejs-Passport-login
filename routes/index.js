const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('Welcome'));

// Dashbaord
router.get('/dashboard', ensureAuthenticated, (req, res) => 
res.render('dashboard', {
    nameß: req.user.name
}));

module.exports = router;