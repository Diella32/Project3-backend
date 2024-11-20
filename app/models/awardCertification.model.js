// models/awardCertification.js
module.exports = (sequelize, DataTypes) => {
    const AwardCertification = sequelize.define('awardCertification', {
      award_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      award_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      organization: {
        type: DataTypes.STRING
      },
      
    });  
    return AwardCertification;
  };
  