// models/skill.js
module.exports = (sequelize, Sequelize) => {
  const Skill = sequelize.define('Skill', {
    skill_id: {
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
    skill_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    category: {
      type: Sequelize.STRING
    }
  });

  // Define associations if needed
  Skill.associate = (models) => {
    Skill.belongsTo(models.Resume, {
      foreignKey: 'resume_id',
      as: 'resume'
    });
    Skill.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return Skill;
};
