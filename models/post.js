const Sequelize = require('sequelize');
const sequelize = require('../config');
const users = require('./user');
let Posts = sequelize.define('posts', {
	id : {
		type: Sequelize.INTEGER,
		primaryKey: true,
        autoIncrement: true
	},
    title : {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT('tiny'),
        allowNull: false
    }
});
users.hasMany(Posts, {foreignKey: 'user_id'});
Posts.belongsTo(users, {foreignKey: 'user_id'});
module.exports = Posts;