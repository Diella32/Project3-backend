export default (sequelize, Sequelize) => {
    const contactInfo = sequelize.define("contactInfo", {
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
    