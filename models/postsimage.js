const Sequelize = require('sequelize');
const sequelize = require('../config');
const posts = require('./post');
let Postsimages = sequelize.define('postsimages', {
	id : {
		type: Sequelize.INTEGER,
		primaryKey: true,
        autoIncrement: true
	},
    imagename: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
posts.hasMany(Postsimages, {foreignKey: 'post_id'});
Postsimages.belongsTo(posts, {foreignKey: 'post_id'});
module.exports = Postsimages;