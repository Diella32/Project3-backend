
  const db = require("../models");
  const AwardCertification = db.AwardCertification;
  const Op = db.Sequelize.Op;
  
  // Create and Save a new Certification
  exports.create = (req, res) => {
    if (!req.body.url) {
      return res.status(400).send({ message: "URL can not be empty!" });
    }
  
    const awardCertification = {
      award_name: req.body.award_name,
      organization: req.body.organization,
      user_id: req.body.userId,
    };
  
    AwardCertification.create(awardCertification)
      .then(data => res.send(data))
      .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the Award/Certification." }));
  };
  
  // Retrieve all Award/Certification for a specific Resume
  exports.findAllForUser = (req, res) => {
    const userId = req.params.userId;
    AwardCertification.findAll({ where: { user_id: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find the Award/Certification for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({message:err.message ||"Error retrieving Award/Certification for user with id=" 
      });
    });
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
      .catch(err => res.status(500).send({ message: err.message || "Error retrieving PersonalLink with id=" + id }));
  };
  
  // Update an AwardCertification by the id in the request
  exports.update = (req, res) => {
    const id = req.params.id;
    AwardCertification.update(req.body, { where: { id: id } })
      .then(num => {
        if (num == 1) {
          res.send({ message: "Award/Certifications was updated successfully." });
        } else {
          res.send({ message: `Cannot update AwardCertifications with id=${id}. Maybe the Award/Certifications was not found or req.body is empty!` });
        }
      })
      .catch(err => res.status(500).send({ message: err.message || "Error updating PersonalLink with id=" + id }));
  };
  
  // Delete an Award/Certification with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
    AwardCertification.destroy({ where: { id: id } })
      .then(num => {
        if (num == 1) {
          res.send({ message: "Award/Certificate was deleted successfully!" });
        } else {
          res.send({ message: `Cannot delete Award/Certificate with id=${id}. Maybe Award/Certifications was not found!` });
        }
      })
      .catch(err => res.status(500).send({ message: err.message || "Could not delete Award/Certifications with id=" + id }));
  };
  
  // Delete all PersonalLinks from the database.
  exports.deleteAll = (req, res) => {
    AwardCertification.destroy({ where: {}, truncate: false })
      .then(nums => res.send({ message: `${nums} Award/Certifications were deleted successfully!` }))
      .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all Award/Certifications." }));
  };
  