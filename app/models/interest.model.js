// models/interest.js

module.exports = (sequelize, Sequelize) => {
    const Interest = sequelize.define('interest', {

      interest_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      interest: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return Interest;
  };
  