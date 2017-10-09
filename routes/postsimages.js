const express = require('express');
const app = express();
const Postimagerouter = express.Router();
const multer = require('multer');
const session = require('express-session');
const bodyParser = require('body-parser');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const postsimages = require('../models/postsimage');
var mkdirp = require('mkdirp');
const verify = require('./verifysession');

app.use(bodyParser.json());

let Storage = multer.diskStorage({
    destination: function (req, file, cb) {
	    var dest = 'public/uploads/';
	    mkdirp(dest, function (err) {
	        if (err) cb(err, dest);
	        else cb(null, dest);
	    });
  	},
    filename: function(req, file, callback) {
        callback(null, Date.now()+'-'+file.originalname);
    }
 });
let upload = multer({
    storage: Storage,
    fileFilter: function (req, file, callback) {
        var ext = file.mimetype;
        console.log(ext);
        if(ext !== 'image/jpeg' && ext !== 'image/jpg' && ext!== 'image/png') {
        	console.log("Inside");
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
 }).array('file',3);

Postimagerouter.route('/')
.get(verify,(req, res, next) => {
	res.send("Working");
})
.post(upload,function(req ,res, next ) {
	for(let i=0;i<req.files.length;i++) {
		console.log(req.files[i].filename);
		console.log(req.session.postid);
		postsimages.create({imagename: req.files[i].filename,post_id: req.session.postid}).then(()=> {
			console.log("Image saved");
		}).catch(err => {
			console.log(err);
			res.end(err);
		});
	}
    return res.end("File uploaded sucessfully!.");
});

module.exports= Postimagerouter;