// models/skill.js
module.exports = (sequelize, Sequelize) => {
  const Skill = sequelize.define('skill', {
    skill_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    skill_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    category: {
      type: Sequelize.STRING
    }
  });

  

  return Skill;
};
