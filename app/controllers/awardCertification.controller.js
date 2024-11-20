
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
    const award_id = req.params.award_id;
    AwardCertifications.findByPk(award_id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Award/Certification with award_id=${award_id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Error retrieving Award/Certification with award_id=" + award_id
        });
      });
  };
  
  exports.update = (req, res) => {
    const award_id = req.params.award_id;
    const updateData = {
      award_name: req.body.award_name,
      organization: req.body.organization,
      user_id: req.body.user_id
    };
    AwardCertifications.update(updateData, {
      where: { award_id: award_id }  // Use award_id in where clause
    })
      .then(num => {
        if (num[0] === 1) {
          res.send({
            message: "Award/Certification was updated successfully."
          });
        } else {
          res.status(404).send({
            message: `Cannot update Award/Certification with award_id=${award_id}. Maybe Award/Certification was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Error updating Award/Certification with award_id=${award_id}: ${err.message}`
        });
      });
  };
 
  
  exports.delete = (req, res) => {
    const award_id = req.params.award_id;
    AwardCertifications.destroy({
      where: { award_id: award_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Award/Certification was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Award/Certification with award_id=${award_id}. Maybe Award/Certification was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Could not delete Award/Certification with award_id=" + award_id
        });
      });
  };
  