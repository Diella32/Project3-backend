// models/resume.js
module.exports = (sequelize, DataTypes) => {
  const Resume = sequelize.define('Resume', {
    resume_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    resume_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    introduction: {
      type: DataTypes.TEXT
    },
    template_choice: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }
  )}; 
