const db = require("../models");
const Request = db.request;
const User = db.user;
const Resume = db.resume;
const Op = db.Sequelize.Op;

//create a new request and add it to the database
exports.create = async (req, res) => {
  if (!req.body.resumeId) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

    
    const request = {
      dateMade: new Date(),
      approvedBy: null,
      status: 'Open',
      userId: req.body.userId,
      resumeId: req.body.resumeId,
    };

   
    const createdRequest = await Request.create(request);
    res.send(createdRequest);
  
};

//retrieve all requests from the database
exports.findAll = (req, res) => {
  const requestId = req.query.requestId;
  var condition = requestId ? { requestId: { [Op.like]: `%${requestId}%` } } : null;
  Request.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred whilst retrieving requests"

      });
    });
};

//find all requests for status of either 'Open' or 'Closed'
exports.findAllForStatus = (req, res) => {
  const status = req.params.status
  Request.findAll({ where: { status: status }, include: [{model: db.user}]})
    .then((data) => {
      if (data) {
        res.send(data);
      }
      else {
        res.status(404).send({
          message: `Cannot find ${status} requests.`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message ||
          'Error retrieving ' + status + ' requests.',
      });
    });
};

exports.findAllForUser = (req, res) => {
    const userId = req.params.userId
    Request.findAll({where: {userId: userId}, include: [{model: db.user}]})
        .then((data) => {
            if(data){
                res.send(data);
            }
            else{
                res.status(404).send({
                    message: `Cannot find ${user}'s requests.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Error retrieving " + user + "'s requests.",
            });
        });
};

//find a single request with an id
exports.findOne = (req, res) => {
  const id = req.params.requestId;
  Request.findByPk(id, { include: [db.user, db.resume] })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Request with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Request with id=" + id,
      });
    });
};

//update a request by the id in the request
exports.update = (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  console.log("in update: " + id);
  Request.update(req.body, {
    where: { requestId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "request was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update request with id=${id}. Maybe request was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating request with id=" + id,
      });
    });
};

// Delete a request with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.requestId;
  Request.destroy({
    where: { requestId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "request was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete request with id=${id}. Maybe request was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete request with id=" + id,
      });
    });
};

