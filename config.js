const Sequelize = require('sequelize');
const sequelize = new Sequelize('blog', 'postgres', 'abcdef', {
  host: 'postgres://dmakepbjdxtobp:55f9a1a6a0b65d2c58b5e2c248701683f43fa1442bf27f729f26efb0d21b2c80@ec2-184-72-230-93.compute-1.amazonaws.com:5432/de2hcic5t16k0j',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
module.exports=sequelize;