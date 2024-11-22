module.exports = (sequelize, Sequelize) => {
  const contactInfo = sequelize.define("contactinfo", {

    contact_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },  
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
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
        allowNull: false
    },
    },
    {
        timestamps: false
        }
        );
        return contactInfo;
}
    