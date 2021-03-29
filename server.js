/////////////// Dependencies /////////////
require('dotenv').config();
const { request, response } = require('express');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const mongoURI = process.env.DB_URI || 'mongodb://localhost:27017/bookmark';
const db = mongoose.connection;
const request = require('request');
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
	res.header('Access-Control-Allow-Methods', '*');
	next();
});

/////////////// Controllers /////////////
app.get('/', (req, res) => {
	res.send('Hello World Bookmark');
});

app.get('/carpark', (req, res) => {
	request(
		{
			url:
				'https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability',
			headers: {
				'Content-Type': 'application/json',
				AccessKey: '3fe311cb-5e09-42cc-b91f-49469ced4d67',
				Token:
					'Me-s4-23B+pSbts2X4-HebB1-@4k9+2dUS99DKhEPuGfpt@BtED9e-6rgt7@4Q9edpc63-NbjnVs2D513y6497E9bnf49991DbF-',
			},
		},
		(error, response, body) => {
			if (error || response.statusCode !== 200) {
				return res
					.status(500)
					.json({ type: 'error', message: error.message });
			}
			res.json(body);
		}
	);
});

const bookmarkController = require('./controllers/bookmark');
app.use('/bookmark', bookmarkController);

//////////////////////////////////////////////////
app.listen(port, () => console.log('Listening at port', port + ' ' + mongoURI));
