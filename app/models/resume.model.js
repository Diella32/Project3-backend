// models/resume.js
module.exports = (sequelize, Sequelize) => {
  const Resume = sequelize.define('Resume', {
    resume_id: {
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
  });

  // Define associations
  Resume.associate = (models) => {
    // Association with User
    Resume.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });

    // Associations with other entities (Skills, Education, etc.)
    Resume.hasMany(models.Skill, {
      foreignKey: 'resume_id',
      as: 'skills',
      onDelete: 'CASCADE'
    });

    Resume.hasMany(models.Education, {
      foreignKey: 'resume_id',
      as: 'education',
      onDelete: 'CASCADE'
    });

    Resume.hasMany(models.PersonalLink, {
      foreignKey: 'resume_id',
      as: 'personalLinks',
      onDelete: 'CASCADE'
    });

    Resume.hasMany(models.Experience, {
      foreignKey: 'resume_id',
      as: 'experiences',
      onDelete: 'CASCADE'
    });

    Resume.hasMany(models.Project, {
      foreignKey: 'resume_id',
      as: 'projects',
      onDelete: 'CASCADE'
    });

    Resume.hasMany(models.Interest, {
      foreignKey: 'resume_id',
      as: 'interests',
      onDelete: 'CASCADE'
    });

    Resume.hasMany(models.AwardCertification, {
      foreignKey: 'resume_id',
      as: 'awardCertifications',
      onDelete: 'CASCADE'
    });
  };

  return Resume;
};
