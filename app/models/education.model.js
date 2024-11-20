// models/education.js

module.exports = (sequelize, DataTypes) => {
    const Education = sequelize.define('education', {

      education_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      FieldOfStudy: {
        type: Sequelize.STRING,
        allowNull: false
      },

      institution: {
        type: Sequelize.STRING,
        allowNull: false
      },

      degree: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.STRING
      },
      end_date: {
        type: Sequelize.STRING
      },
      gpa: {
        type: Sequelize.DECIMAL(3, 2)
      }
    });
  
  
    return Education;
  };
  