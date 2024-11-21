// models/experience.js
module.exports = (sequelize, Sequelize) => {
  const Experience = sequelize.define('experience', {
      experience_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      job_title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      company: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.TEXT
      }
    });
      return Experience;
  };
  