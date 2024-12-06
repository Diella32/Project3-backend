const db = require("../models");
const User = db.User;
const Resume = db.Resume;

// Matches getAllUsers() in adminServices.js
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['user_id', 'fName', 'lName', 'email', 'role', 'isAdmin'],
      order: [['createdAt', 'DESC']]
    });
    res.send(users);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving users."
    });
  }
};

// Matches deleteUser(userId) in adminServices.js
exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await User.destroy({
      where: { user_id: userId }
    });

    if (result === 1) {
      res.send({ message: "User was deleted successfully!" });
    } else {
      res.status(404).send({
        message: `Cannot delete User with id=${userId}. Maybe User was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete User with id=" + userId
    });
  }
};

// Matches updateUserRole(userId, role) in adminServices.js
exports.updateUserRole = async (req, res) => {
  const userId = req.params.userId;
  const { role } = req.body;

  if (!role || !['admin', 'student'].includes(role)) {
    return res.status(400).send({
      message: "Role must be either 'admin' or 'student'"
    });
  }

  try {
    const result = await User.update(
      { 
        role: role,
        isAdmin: role === 'admin'
      },
      { where: { user_id: userId } }
    );

    if (result[0] === 1) {
      res.send({
        message: "User role was updated successfully."
      });
    } else {
      res.status(404).send({
        message: `Cannot update role for user with id=${userId}. User not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating user role with id=" + userId
    });
  }
};

// Matches getSystemStats() in adminServices.js
exports.getSystemStats = async (req, res) => {
  try {
    const [totalUsers, adminCount, studentCount, totalResumes] = await Promise.all([
      User.count(),
      User.count({ where: { role: 'admin' } }),
      User.count({ where: { role: 'student' } }),
      Resume.count()
    ]);

    res.send({
      totalUsers,
      adminCount,
      studentCount,
      totalResumes,
      lastUpdated: new Date()
    });
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving system statistics"
    });
  }
};
