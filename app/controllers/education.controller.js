const db = require("../models");
const Education = db.Education;
const Op = db.Sequelize.Op;

// Create and Save a new Education
exports.create = (req, res) => {
  if (!req.body.institution) {
    return res.status(400).send({ message: "Institution can not be empty!" });
  }

  const education = {
    degree: req.body.degree,
    FieldOfStudy: req.body.FieldOfStudy,
    institution: req.body.institution,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    gpa:req.body.gpa,
    user_id: req.body.userId,

  };

  Education.create(education)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the Education." }));
};

// Retrieve all Education entries for a specific Resume
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Education.findAll({ where: { user_Id: userId } })
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
  Education.update(req.body, { where: { id: id } })
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
  Education.destroy({ where: { id: id } })
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
