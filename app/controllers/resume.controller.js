const db = require("../models");
const Resume = db.Resume;
const Op = db.Sequelize.Op;

// Create and Save a new Resume
exports.create = (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({ message: "Title cannot be empty!" });
  }

  const resume = {
    title: req.body.title,
    userId: req.body.userId,
    introduction: req.body.introduction,
    template_choice: req.body.template_choice,
  };

  Resume.create(resume)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the Resume." }));
};

// Retrieve all Resumes for a specific User
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Resume.findAll({ where: { user_id: userId } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Resumes." }));
};

// Find a single Resume with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Resume.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find Resume with id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Resume with id=" + id }));
};

// Update a Resume by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Resume.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Resume was updated successfully." });
      } else {
        res.send({ message: `Cannot update Resume with id=${id}. Maybe Resume was not found or req.body is empty!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Error updating Resume with id=" + id }));
};

// Delete a Resume with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Resume.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Resume was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Resume with id=${id}. Maybe Resume was not found!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Could not delete Resume with id=" + id }));
};

// Delete all Resumes from the database.
exports.deleteAll = (req, res) => {
  Resume.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Resumes were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all Resumes." }));
};
