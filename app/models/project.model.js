// models/project.js
module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
      project_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      resume_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      project_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      technologies_used: {
        type: DataTypes.STRING
      },
      project_link: {
        type: DataTypes.STRING
      }
    }); 
    return Project;
  };
  