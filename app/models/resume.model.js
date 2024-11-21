// models/resume.js
module.exports = (sequelize, Sequelize) => {
  const Resume = sequelize.define('resume', {
    resume_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    introduction: {
      type: Sequelize.TEXT
    },
    template_choice: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  return Resume;
};
