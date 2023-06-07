const Sequelize = require('sequelize');
const connection = require('../database/database');

const Game = connection.define('games', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
}, {
  timestamps: false // Desativa os campos "createdAt" e "updatedAt"
});

//Game.sync({ force: true });

module.exports = Game;