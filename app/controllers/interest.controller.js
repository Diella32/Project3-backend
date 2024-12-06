const db = require("../models");
const Interest = db.Interest;
const Op = db.Sequelize.Op;

// Create and Save a new Interest
exports.create = (req, res) => {
  if (!req.body.interest || !req.body.user_id) {
    return res.status(400).send({ message: "Interest name and userId cannot be empty!" });
  }

  const interest = {
    interest: req.body.interest,
    user_id: req.body.user_id
  };

  Interest.create(interest)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the Interest." }));
};

// Retrieve all Interests for a specific Resume and User
exports.findAllForResume = (req, res) => {
  const { resumeId, userId } = req.params;
  Interest.findAll({ where: { resumeId: resumeId, userId: userId } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Interests." }));
};

// Retrieve all Interests for a specific User
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Interest.findAll({ where: {user_id: userId } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Interests." }));
};

// Find a single Interest with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Interest.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find Interest with id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Interest with id=" + id }));
};

// Update an Interest by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Interest.update(req.body, { where: { id: id, userId: req.body.userId } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Interest was updated successfully." });
      } else {
        res.send({ message: `Cannot update Interest with id=${id}. Maybe Interest was not found or req.body is empty!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Error updating Interest with id=" + id }));
};

// Delete an Interest with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Interest.destroy({ where: { interest_id: id} })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Interest was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Interest with id=${id}. Maybe Interest was not found!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Could not delete Interest with id=" + id }));
};

// Delete all Interests for a User
exports.deleteAllForUser = (req, res) => {
  const user_id = req.params.user_id;
  Interest.destroy({ where: { user_id: userId }, truncate: false })
    .then(nums => res.send({ message: `${nums} Interests were deleted successfully for user ${userId}!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all Interests for user." }));
};