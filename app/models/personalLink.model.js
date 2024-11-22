// models/personalLinks.js

module.exports = (sequelize, Sequelize) => {
    const PersonalLinks = sequelize.define('personallinks', {

      link_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true

      },      

      url: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
  
    return PersonalLinks;
  };
  