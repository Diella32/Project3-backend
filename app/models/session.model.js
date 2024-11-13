module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define("Session", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: Sequelize.STRING(3000),
      allowNull: false,
      unique: true, // Ensure tokens are unique
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    expirationDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER, // Ensure user_id is an integer
      allowNull: false, // Set this to false if user_id is required
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });

  return Session;
};
