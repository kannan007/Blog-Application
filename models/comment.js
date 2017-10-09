const Sequelize = require('sequelize');
const sequelize = require('../config');
const posts = require('./post');
const users = require('./user');
let Comments = sequelize.define('comments', {
	id : {
		type: Sequelize.INTEGER,
		primaryKey: true,
        autoIncrement: true
	},
    comment: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
    	type: Sequelize.STRING,
    	allowNull: false
    }
});
posts.hasMany(Comments, {foreignKey: 'post_id'});
Comments.belongsTo(posts, {foreignKey: 'post_id'});
users.hasMany(Comments, {foreignKey: 'user_id'});
Comments.belongsTo(users, {foreignKey: 'user_id'});
module.exports = Comments;