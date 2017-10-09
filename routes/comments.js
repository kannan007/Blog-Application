const express = require('express');
const Commentrouter = express.Router();
const session = require('express-session');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const comments = require('../models/comment');
const verify = require('./verifysession');

Commentrouter.route('/')
.get(verify,(req, res, next) => {
	comments.findAll({}).then(comments => {
		res.send(comments);
	}).catch(err => {
		console.log(err);
		res.send(err);
	});
})
.post(verify,(req, res, next) => {
	let data= {
		comment: req.body.comment,
		username: req.session.username,
		post_id: req.body.postid,
		user_id: req.session.userid
	}
	comments.create(data).then(() => {
		res.send("Comments Created");
	}).catch(err => {
		console.log(err);
		res.send(err);
	})
});

module.exports = Commentrouter;
