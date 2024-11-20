// models/personalLinks.js

module.exports = (sequelize, DataTypes) => {
    const PersonalLinks = sequelize.define('personalLinks', {

      link_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      
      url: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
  
    return PersonalLinks;
  };
  