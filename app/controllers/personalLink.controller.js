const db = require("../models");
const PersonalLink = db.personalLink;
const Op = db.Sequelize.Op;

// Create and Save a new PersonalLink
exports.create = (req, res) => {
  if (!req.body.url) {
    return res.status(400).send({ message: "URL can not be empty!" });
  }

  const personalLink = {
    url: req.body.url,
    type: req.body.type, // e.g., social, GitHub, portfolio
    resumeId: req.body.resumeId,
  };

  PersonalLink.create(personalLink)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the Personal Link." }));
};

// Retrieve all PersonalLinks for a specific Resume
exports.findAllForResume = (req, res) => {
  const resumeId = req.params.resumeId;
  PersonalLink.findAll({ where: { resumeId: resumeId } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Personal Links." }));
};

// Find a single PersonalLink with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  PersonalLink.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find PersonalLink with id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving PersonalLink with id=" + id }));
};

// Update a PersonalLink by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  PersonalLink.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "PersonalLink was updated successfully." });
      } else {
        res.send({ message: `Cannot update PersonalLink with id=${id}. Maybe PersonalLink was not found or req.body is empty!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Error updating PersonalLink with id=" + id }));
};

// Delete a PersonalLink with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  PersonalLink.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "PersonalLink was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete PersonalLink with id=${id}. Maybe PersonalLink was not found!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Could not delete PersonalLink with id=" + id }));
};

// Delete all PersonalLinks from the database.
exports.deleteAll = (req, res) => {
  PersonalLink.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Personal Links were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all Personal Links." }));
};
