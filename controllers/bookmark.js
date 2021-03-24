const express = require('express');
const bookmark = express.Router();
const Bookmarks = require('../models/bookmarks');

///////////////////////////////////////////////////////////////////////////////////

////// Create //////
bookmark.post('/', (req, res) => {
	Bookmarks.create(req.body, (err, createdBookmark) => {
		if (err) console.log(err);
		if (createdBookmark) {
			console.log(createdBookmark);
			res.json(createdBookmark);
		}
	});
});

////// Read //////
bookmark.get('/', (req, res) => {
	Bookmarks.find({}, (err, foundBookmark) => {
		if (err) console.log(err);
		if (foundBookmark) {
			console.log(foundBookmark);
			res.json(foundBookmark);
		}
	});
});

////// Update //////
bookmark.put('/:id', (req, res) => {
	Bookmarks.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
		(err, updatedBookmark) => {
			if (err) console.log(err);
			if (updatedBookmark) {
				console.log(updatedBookmark);
				res.json(updatedBookmark);
			}
		}
	);
});

////// Delete //////
bookmark.delete('/:id', (req, res) => {
	Bookmarks.findByIdAndRemove(req.params.id, (err, deletedBookmark) => {
		if (err) console.log(err);
		if (deletedBookmark) {
			console.log(deletedBookmark);
			res.json(deletedBookmark);
		}
	});
});

module.exports = bookmark;
