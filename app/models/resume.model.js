// models/resume.js
module.exports = (sequelize, Sequelize) => {
  const Resume = sequelize.define('Resume', {
    resume_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Assuming 'Users' is the name of the User model table
        key: 'user_id'
      },
      onDelete: 'CASCADE'
    },
    resume_name: {
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
