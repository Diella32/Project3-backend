module.exports = (sequelize, Sequelize) => {
  const contactInfo = sequelize.define("contactInfo", {
    phone_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    fName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    resume_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Resumes',
        key: 'resume_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  }, {
    timestamps: false,  // Disable timestamps for this table
  });

  // Optional: If you want to create an association between contactInfo and Resumes
  contactInfo.associate = function(models) {
    contactInfo.belongsTo(models.Resumes, { foreignKey: 'resume_id', targetKey: 'resume_id' });
  };

  return contactInfo;
};
