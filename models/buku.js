const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

class Buku extends Sequelize.Model {}

Buku.init({
  isbn: Sequelize.STRING,
  judul: Sequelize.STRING,
  jumlah_halaman: Sequelize.STRING,
  harga: Sequelize.INTEGER,
  penerbitId: Sequelize.INTEGER
}, { sequelize, modelName: 'buku' });

module.exports = Buku;