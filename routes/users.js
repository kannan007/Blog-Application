const express = require('express');
const Userrouter = express.Router();
const session = require('express-session');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const users = require('../models/user');
const verify = require('./verifysession');

/* GET users listing. */
Userrouter.route('/')
.get(verify,(req, res, next) => {
	users.findAll({}).then(user => {
		res.send(user);
	}).catch(err => {
		console.log(err);
		res.send(err);
	});
});
Userrouter.post('/register',(req,res,next) => {
	bcrypt.hash(req.body.password, saltRounds).then(hash => {
		let data= {
			username: req.body.username,
			password: hash
		};
		users.create(data).then(user => {
			req.session.username = user.username;
			req.session.userid = user.id;
			res.send("Account Registered Succesfully");
		})
		.catch(err => {
			console.log(err);
			//res.send(err);
			next(new Error("Username is already taken"));
		});
	}).catch(err => {
		console.log(err);
		//res.send(err);
		next(new Error("Problem with hashing password please contact administrator"));
	});
});
Userrouter.post('/login',(req,res,next) => {
	users.findAll({where : {username: req.body.username}}).then(user => {
		if(user.length<1) {
			console.log("inside");
			//res.send("No username found");
			let err= new Error("Username Invalid");
			next(err);
		}
		else {
			bcrypt.compare(req.body.password, user[0].password).then(result => {
			// res == true
				if(result) {
					req.session.username = user[0].username;
					req.session.userid = user[0].id;
					console.log(req.session.username);
					res.send(user);
				}
				else {
					let err = new Error("Invalid password");
					next(err);
				}
			})
			.catch(err => {
				console.log(err);
				//res.send(err)
				next(err);
			});
		}
	})
	.catch(err => {
		console.log(err);
		//res.send(err);
		next(err);
	});
});

Userrouter.get('/logout', (req, res, next) => {
	req.session.destroy(() => {
	    console.log("user logged out.");
	    res.send("Logged out Succesfully");
	});
});

module.exports = Userrouter;
