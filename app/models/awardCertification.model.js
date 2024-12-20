// models/awardCertification.js



module.exports = (sequelize, Sequelize) => {
    const AwardCertification = sequelize.define('awardCertification', {


      award_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      award_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      organization: {
        type: Sequelize.STRING
      },
      
    });  
    return AwardCertification;
  };
  