module.exports = (sequelize, Sequelize) => {
  const Resume = sequelize.define("resume", {
    resume_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    resume_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    template: {
      type: Sequelize.STRING,
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      onUpdate: Sequelize.NOW
    }
  }, {
    tableName: 'resumes', 
    timestamps: false     
  });

  return Resume;
};
