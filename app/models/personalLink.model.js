// models/personalLinks.js
module.exports = (sequelize, DataTypes) => {
    const PersonalLinks = sequelize.define('personalLinks', {
      link_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      
      url: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
  
    return PersonalLinks;
  };
  