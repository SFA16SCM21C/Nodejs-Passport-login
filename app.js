const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// DB
const mongoURI = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDb Atlas'))
    .catch(err => console.log(err));

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection error'));
// db.once('open', () => {
//     console.log('Connected to MongoDb Atlas')
// });

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(PORT, console.log(`Server started on port ${PORT}`));