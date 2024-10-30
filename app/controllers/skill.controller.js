const db = require("../models");
const Skill = db.skill;
const Op = db.Sequelize.Op;

// Create and Save a new Skill
exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ message: "Name can not be empty!" });
  }

  const skill = {
    name: req.body.name,
    category: req.body.category, // e.g., beginner, intermediate, expert
    resumeId: req.body.resumeId,
  };

  Skill.create(skill)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the Skill." }));
};

// Retrieve all Skills for a specific Resume
exports.findAllForResume = (req, res) => {
  const resumeId = req.params.resumeId;
  Skill.findAll({ where: { resumeId: resumeId } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Skills." }));
};

// Find a single Skill with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Skill.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find Skill with id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Skill with id=" + id }));
};

// Update a Skill by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Skill.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Skill was updated successfully." });
      } else {
        res.send({ message: `Cannot update Skill with id=${id}. Maybe Skill was not found or req.body is empty!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Error updating Skill with id=" + id }));
};

// Delete a Skill with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Skill.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Skill was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Skill with id=${id}. Maybe Skill was not found!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Could not delete Skill with id=" + id }));
};

// Delete all Skills from the database.
exports.deleteAll = (req, res) => {
  Skill.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Skills were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all Skills." }));
};
