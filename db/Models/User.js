const { conn } = require('../db');
const User = conn.define('user', {
  name: conn.Sequelize.STRING,
});

module.exports = User;
