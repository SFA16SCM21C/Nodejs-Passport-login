const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3001;

// Passport Config
require('./config/passport')(passport);

// DB
const mongoURI = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDb Atlas...'))
    .catch(err => console.log(err));

// The below is also a way to connect to atlas mongo db connection

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection error'));
// db.once('open', () => {
//     console.log('Connected to MongoDb Atlas')
// });

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.sucess_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(PORT, console.log(`Server started on port ${PORT}`));