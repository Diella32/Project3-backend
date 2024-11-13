const db = require("../models");
const Education = db.Education; // Corrected to db.Education
const Op = db.Sequelize.Op;

// Create and Save a new Education
exports.create = (req, res) => {
  if (!req.body.institution) {
    return res.status(400).send({ message: "Institution cannot be empty!" });
  }

  const education = {
    degree: req.body.degree,
    FieldOfStudy: req.body.fieldOfStudy, // Matching model's case-sensitive field
    institution: req.body.institution,
    start_date: req.body.startDate, // Matching model's field name
    end_date: req.body.endDate, // Matching model's field name
    gpa: req.body.gpa,
    resume_id: req.body.resumeId,
    user_id: req.body.userId // Add user_id if needed in your logic
  };

  Education.create(education)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the Education." }));
};

// Retrieve all Education entries for a specific Resume
exports.findAllForResume = (req, res) => {
  const resumeId = req.params.resumeId;
  Education.findAll({ where: { resume_id: resumeId } }) // Matching model's field name
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Education." }));
};

// Find a single Education with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Education.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find Education with id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Education with id=" + id }));
};

// Update an Education by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Education.update(req.body, { where: { education_id: id } }) // Matching model's primary key
    .then(num => {
      if (num == 1) {
        res.send({ message: "Education was updated successfully." });
      } else {
        res.send({ message: `Cannot update Education with id=${id}. Maybe Education was not found or req.body is empty!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Error updating Education with id=" + id }));
};

// Delete an Education with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Education.destroy({ where: { education_id: id } }) // Matching model's primary key
    .then(num => {
      if (num == 1) {
        res.send({ message: "Education was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Education with id=${id}. Maybe Education was not found!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Could not delete Education with id=" + id }));
};

// Delete all Education entries from the database.
exports.deleteAll = (req, res) => {
  Education.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Education entries were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all Education entries." }));
};
