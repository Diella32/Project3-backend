const db = require("../models");
const Experience = db.Experience;
const Op = db.Sequelize.Op;

// Create and Save a new Experience
exports.create = (req, res) => {
  // Validate request
  if (!req.body.job_title || !req.body.company || !req.body.start_date) {
    console.log(req.body);
    return res.status(400).send({ message: "Job title, company, start date, and resume ID are required!" });
  }

  // Create an Experience object
  const experience = {
    job_title: req.body.job_title,
    company: req.body.company,

    start_date: req.body.start_date,
    end_date: req.body.end_date,
    //resumeId: req.body.resumeId,
    description: req.body.description, // Fixed spelling
    user_id: req.body.userId

  };

  // Save Experience in the database
  Experience.create(experience)
    .then(data => res.send(data))
    .catch(err => {
      console.error("Error creating Experience:", err);
      console.log(experience);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Experience."
      });
    });
};

// Retrieve all Experience entries for a specific Resume
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Experience.findAll({ where: { user_id: userId } })
    .then(data => res.send(data))
    .catch(err => {
      console.error("Error retrieving Experience:", err);
      res.status(500).send({
        message: err.message || "Error retrieving Experience."
      });
    });
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
    .catch(err => {
      console.error("Error retrieving Experience with id:", id, err);
      res.status(500).send({
        message: err.message || `Error retrieving Experience with id=${id}`
      });
    });
};

// Update an Experience by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  // Validate request
  if (!req.body.job_title || !req.body.company || !req.body.start_date) {
    return res.status(400).send({ 
      success: false,
      message: "Job title, company, and start date are required for updating!" 
    });
  }

  Experience.update(req.body, { where: { experience_id: id } })
    .then(num => {
      if (num == 1) {
        res.send({
          success: true,
          message: "Experience was updated successfully."
        });
      } else {
        res.status(404).send({
          success: false,
          message: `Cannot update Experience with id=${id}. Maybe Experience was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      console.error("Error updating Experience with id:", id, err);
      res.status(500).send({
        success: false,
        message: err.message || `Error updating Experience with id=${id}`
      });
    });
};

// Delete an Experience with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Experience.destroy({ where: { experience_id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Experience was deleted successfully!" });
      } else {
        res.status(404).send({
          message: `Cannot delete Experience with id=${id}. Maybe Experience was not found!`
        });
      }
    })
    .catch(err => {
      console.error("Error deleting Experience with id:", id, err);
      res.status(500).send({
        message: err.message || `Could not delete Experience with id=${id}`
      });
    });
};

// Delete all Experience entries from the database.
exports.deleteAll = (req, res) => {
  Experience.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Experience entries were deleted successfully!` }))
    .catch(err => {
      console.error("Error removing all Experience entries:", err);
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Experience entries."
      });
    });
};
