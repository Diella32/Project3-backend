// models/interest.js
module.exports = (sequelize, Sequelize) => {
    const Interest = sequelize.define('Interest', {
      interest_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      interest: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return Interest;
  };
  