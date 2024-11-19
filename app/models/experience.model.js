// models/experience.js
module.exports = (sequelize, DataTypes) => {
    const Experience = sequelize.define('Experience', {
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
        type: DataTypes.STRING
      },
      end_date: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      }
    });
      return Experience;
  };
  