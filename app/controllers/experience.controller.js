const db = require("../models");
const Experience = db.Experience;
const Op = db.Sequelize.Op;

// Create and Save a new Experience
exports.create = (req, res) => {
  if (!req.body.company) {
    return res.status(400).send({ message: "Company can not be empty!" });
  }

  const experience = {
    job_title: req.body.job_title,
    company: req.body.company,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    decription:req.body.decription,
    user_id: req.body.userId,

  };

  Experience.create(experience)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the Experience." }));
};

// Retrieve all Experience entries for a specific Resume
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Experience.findAll({ where: { user_id: userId } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Experience." }));
};

// Find a single Experience with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Experience.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find Experience with id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Experience with id=" + id }));
};

// Update an Experience by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Experience.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Experience was updated successfully." });
      } else {
        res.send({ message: `Cannot update Experience with id=${id}. Maybe Experience was not found or req.body is empty!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Error updating Experience with id=" + id }));
};

// Delete an Experience with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Experience.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Experience was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Experience with id=${id}. Maybe Experience was not found!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Could not delete Experience with id=" + id }));
};

// Delete all Experience entries from the database.
exports.deleteAll = (req, res) => {
  Experience.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Experience entries were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all Experience entries." }));
};
