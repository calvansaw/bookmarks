/////////////// Dependencies /////////////
require('dotenv').config;
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const mongoURI = process.env.DB_URI || 'mongodb://localhost:27017/bookmark';
const db = mongoose.connection;

/////////////// Connect to mongoose /////////////
mongoose.connect(mongoURI, { useNewUrlParser: true }, () => {
	console.log('MongoDB connection established:', mongoURI);
});

/////////////// Error / Disconnection /////////////
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('disconnected', () => console.log('mongo disconnected'));

/////////////// Middleware /////////////
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON
app.use(express.static('public'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

/////////////// Controllers /////////////
app.get('/', (req, res) => {
	res.send('Hello World Bookmark');
});

const bookmarkController = require('./controllers/bookmark');
app.use('/bookmark', bookmarkController);

//////////////////////////////////////////////////
app.listen(port, () => console.log('Listening at port', port + ' ' + mongoURI));
