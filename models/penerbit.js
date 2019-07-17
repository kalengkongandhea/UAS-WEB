const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

class Penerbit extends Sequelize.Model {}

Penerbit.init({
  name: Sequelize.STRING,
  price: Sequelize.INTEGER
}, { sequelize, modelName: 'penerbit' });

module.exports = Penerbit;