const db = require("../models");
const ContactInfo = db.ContactInfo;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.phone_number || !req.body.fname || !req.body.lname || !req.body.address || !req.body.email) {
    res.status(400).send({
      message: "Content can not be empty! Please provide all required fields."
    });
    return;
  }
  
  const contactInfo = {
    fName: req.body.fname,
    lName: req.body.lname,
    email: req.body.email,
    phone_number: req.body.phone_number,
    address: req.body.address,
  };

  ContactInfo.create(contactInfo)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the ContactInfo." }));
};

exports.findAll = (req, res) => {
  ContactInfo.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while retrieving contactInfos." }));
};

exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  ContactInfo.findAll({ where: { userId: userId } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ContactInfos for user with id=${userId}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || `Error retrieving ContactInfos for user with id=${userId}`,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  ContactInfo.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find ContactInfo with id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving ContactInfo with id=" + id }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  ContactInfo.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "ContactInfo was updated successfully." });
      } else {
        res.send({ message: `Cannot update ContactInfo with id=${id}. Maybe ContactInfo was not found or req.body is empty!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Error updating ContactInfo with id=" + id }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  ContactInfo.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "ContactInfo was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete ContactInfo with id=${id}. Maybe ContactInfo was not found!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Could not delete ContactInfo with id=" + id }));
};

exports.deleteAll = (req, res) => {
  ContactInfo.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} ContactInfos were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all contactInfos." }));
};
