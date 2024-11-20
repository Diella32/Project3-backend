// models/experience.js
module.exports = (sequelize, DataTypes) => {
    const Experience = sequelize.define('experience', {
      experience_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      job_title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      company: {
        type: DataTypes.STRING
      },
      start_date: {
        type: DataTypes.DATE
      },
      end_date: {
        type: DataTypes.DATE
      },
      description: {
        type: DataTypes.TEXT
      }
    });
      return Experience;
  };
  