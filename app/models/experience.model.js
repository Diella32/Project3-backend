// models/experience.js

module.exports = (sequelize, DataTypes) => {
    const Experience = sequelize.define('experience', {

      experience_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      job_title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      company: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.STRING
      },
      end_date: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      }
    });
      return Experience;
  };
  