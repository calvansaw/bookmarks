const mongoose = require('mongoose');

////create schema//////
const bookmarkSchema = new mongoose.Schema({
	title: String,
	url: String,
});

////create model/////
const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

////export/////
module.exports = Bookmark;
