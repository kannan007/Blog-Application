const Sequelize = require('sequelize');
/*const sequelize = new Sequelize('blog', 'postgres', 'abcdef', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});*/
//Heroku
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    }
});
module.exports=sequelize;