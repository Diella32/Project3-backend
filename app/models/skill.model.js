// models/skill.js
module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
    skill_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Assuming 'Users' is the name of the User model table
        key: 'user_id'
      },
      onDelete: 'CASCADE'
    },
    skill_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING
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
