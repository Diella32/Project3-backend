const db = require("../models");
const AwardCertification = db.awardCertification;
const Op = db.Sequelize.Op;

// Create and Save a new AwardCertification
exports.create = (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({ message: "Title can not be empty!" });
  }

  const awardCertification = {
    title: req.body.title,
    organization: req.body.organization,
    date: req.body.date,
    resumeId: req.body.resumeId,
  };

  AwardCertification.create(awardCertification)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the Award/Certification." }));
};

// Retrieve all Award/Certification entries for a specific Resume
exports.findAllForResume = (req, res) => {
  const resumeId = req.params.resumeId;
  AwardCertification.findAll({ where: { resumeId: resumeId } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Award/Certification." }));
};

// Find a single Award/Certification with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  AwardCertification.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find Award/Certification with id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Award/Certification with id=" + id }));
};

// Update an Award/Certification by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  AwardCertification.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Award/Certification was updated successfully." });
      } else {
        res.send({ message: `Cannot update Award/Certification with id=${id}. Maybe Award/Certification was not found or req.body is empty!` });
      }
    })
    .catch(err => res.status)
};