
module.exports = (app) => {
    const requests = require ("../controllers/request.controller.js");
    const {authenticate} = require("../authorization/authorization.js");
    var router = require("express").Router();

    //create a new request
    router.post("/", [authenticate], requests.create);

    //retrieve one request with id
    router.get("/requestId/:requestId",  requests.findOne)

    //retrieve all requests
    router.get("/", [authenticate], requests.findAll);
    
    //Retrieve all requests for a user
    router.get("/userReq/:userId", [authenticate], requests.findAllForUser);

    //Retrieve all requests for a particular status (most usually 'Open')
    router.get("/statusReq/:status", [authenticate], requests.findAllForStatus);

    //update a request with id
    router.put("/:id", [authenticate], requests.update);

    //delete a request with id
    router.delete("/:id", [authenticate], requests.delete);

    app.use("/resume-t9/requests", router);
};