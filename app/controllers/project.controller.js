const db = require("../models");
const Project = db.project;
const Op = db.Sequelize.Op;

// Create and Save a new Project
exports.create = (req, res) => {
  if (!req.body.project_name) {
    return res.status(400).send({ message: "Title can not be empty!" });
  }

  const project = {
    project_name: req.body.project_name,
    description: req.body.description,
    url: req.body.url,
    resumeId: req.body.resumeId,
  };

  Project.create(project)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the Project." }));
};

// Retrieve all Projects for a specific Resume
exports.findAllForResume = (req, res) => {
  const resumeId = req.params.resumeId;
  Project.findAll({ where: { resumeId: resumeId } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Projects." }));
};

// Find a single Project with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Project.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find Project with id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Project with id=" + id }));
};

// Update a Project by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Project.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Project was updated successfully." });
      } else {
        res.send({ message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Error updating Project with id=" + id }));
};

// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Project.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Project was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Project with id=${id}. Maybe Project was not found!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Could not delete Project with id=" + id }));
};

// Delete all Projects from the database.
exports.deleteAll = (req, res) => {
  Project.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Projects were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all Projects." }));
};
