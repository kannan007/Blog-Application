const Sequelize = require('sequelize');
const sequelize = require('../config');
let Users = sequelize.define('users', {
	id : {
		type: Sequelize.INTEGER,
		primaryKey: true,
        autoIncrement: true
	},
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
    	type: Sequelize.STRING,
        allowNull: false
    }
});
module.exports = Users;