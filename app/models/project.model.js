// models/project.js

module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define('project', {

      project_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      // user_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false
      // },
      project_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      technologies_used: {
        type: Sequelize.STRING
      },
      project_link: {
        type: Sequelize.STRING
      }
    }); 
    return Project;
  };
  