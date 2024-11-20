// models/interest.js
module.exports = (sequelize, DataTypes) => {
    const Interest = sequelize.define('interest', {
      interest_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      interest: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return Interest;
  };
  