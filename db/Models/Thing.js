const { conn } = require('../db');
const Thing = conn.define('thing', {
  name: conn.Sequelize.STRING,
});

module.exports = Thing;
