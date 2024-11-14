// models/education.js
module.exports = (sequelize, DataTypes) => {
    const Education = sequelize.define('Education', {
      education_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      FieldOfStudy: {
        type: DataTypes.STRING,
        allowNull: false
      },

      institution: {
        type: DataTypes.STRING,
        allowNull: false
      },

      degree: {
        type: DataTypes.STRING
      },
      start_date: {
        type: DataTypes.STRING
      },
      end_date: {
        type: DataTypes.STRING
      },
      gpa: {
        type: DataTypes.DECIMAL(3, 2)
      }
    });
  
  
    return Education;
  };
  