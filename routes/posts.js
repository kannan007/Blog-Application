const express = require('express');
const Postrouter = express.Router();
const session = require('express-session');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const posts = require('../models/post');
const users = require('../models/user');
const comments = require('../models/comment');
const postsimages = require('../models/postsimage');
const verify = require('./verifysession');

/* GET users listing. */
Postrouter.route('/')
.get(verify,(req, res, next) => {
	posts.findAll({order: [['createdAt', 'DESC']],attributes: ["id","title","content",'createdAt'],
		include: [
			{"model": comments, attributes: ["comment","username"]},
			{"model": postsimages, attributes: ["imagename"]},
			{"model": users, attributes: ["username"]},
		]
	}).then(posts => {
		res.send(posts);
	}).catch(err => {
		console.log(err);
		next(err);
	});
})
.post(verify,(req, res, next) => {
	console.log(req.session.userid);
	posts.create({title: req.body.title,content: req.body.content,user_id: req.session.userid}).then(post => {
		req.session.postid = post.id;
		console.log(post.id);
		res.send("Posts created");
	}).catch(err => {
		console.log(err);
		next(err);
		//res.send(err);
	});
});
Postrouter.post('/search',(req, res, next) => {
	posts.findAll({ where:
		{$or: [
			{
		  		title: { $like: '%' + req.body.title + '%'}
			}, {
		  		content: { $like: '%' + req.body.content + '%' }
			}]},
		attributes: ["id","title","content","createdAt"],
		include: [
			{"model": comments, attributes: ["comment","username"]},
			{"model": postsimages, attributes: ["imagename"]},
			{"model": users, attributes: ["username"]},
		]
	}).then(posts => {
		res.send(posts);
	}).catch(err => {
		console.log(err);
		//res.send(err);
		next(err);
	});
});

module.exports=Postrouter;