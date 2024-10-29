// models/skill.js
module.exports = (sequelize, DataTypes) => {
    const Skill = sequelize.define('Skill', {
      skill_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      
      resume_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      skill_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING
      }
    });  
    return Skill;
  };
  