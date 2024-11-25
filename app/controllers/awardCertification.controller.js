
  const db = require("../models");
  const AwardCertifications = db.AwardCertification;
  const Op = db.Sequelize.Op;
  
  // Create and Save a new Certification
  exports.create = (req, res) => {
    if (!req.body.user_id) {
      return res.status(400).send({ message: "User ID cannot be empty!" });
    }
  
    const awardCertification = {
      award_name: req.body.award_name,
      organization: req.body.organization,
      user_id: req.body.user_id
    };
  
    AwardCertifications.create(awardCertification)
      .then(data => res.send(data))
      .catch(err => res.status(500).send({
        message: err.message || "Error creating Award/Certification."
      }));
  };
  
  // Retrieve all Award/Certification for a specific Resume
  exports.findAllForUser = (req, res) => {
    const userId = req.params.userId;
    AwardCertifications.findAll({ where: { user_id: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find Award/Certification with id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Award/Certification with id=" + id }));
};

// Find a single Award/Certification with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  AwardCertifications.findByPk(id)
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
  AwardCertifications.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Award/Certification was updated successfully." });
      } else {
        res.send({ message: `Cannot update Award/Certification with id=${id}. Maybe Award/Certification was not found or req.body is empty!` });
      }
    })
    .catch(err => res.status)
};

// Delete an AwardCertification with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  AwardCertifications.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "AwardCertification was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete AwardCertification with id=${id}. Maybe AwardCertification was not found!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Could not delete AwardCertification with id=" + id }));
};

// Delete all AwardCertification entries from the database.
exports.deleteAll = (req, res) => {
  AwardCertifications.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} AwardCertification entries were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all AwardCertification entries." }));
};
