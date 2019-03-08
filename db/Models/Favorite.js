const { conn } = require('../db');
const Favorite = conn.define('favorite', {
  rank: conn.Sequelize.INTEGER,
});

module.exports = Favorite;
