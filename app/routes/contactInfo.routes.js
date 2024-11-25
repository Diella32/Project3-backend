module.exports = (app) => {
    const ContactInfo = require("../controllers/contactInfo.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Resume
    router.post("/", [authenticate], ContactInfo.create);
  
    // Retrieve all contactInfo
    //router.get("/", [authenticate], contactInfo.findAll);
  
    // Retrieve all contactInfo for user

    router.get("/user/:userId", [authenticate], ContactInfo.findAllForUser);

  
    // Retrieve a single contactInfo with id
    router.get("/:id", [authenticate], ContactInfo.findOne);
  
    // Update a contactInfo with id
    router.put("/:id", [authenticate], ContactInfo.update);
  
    // Delete a contactInfo with id
    router.delete("/:id", [authenticate], ContactInfo.delete);
  
    // Delete all contactInfo
    router.delete("/", [authenticate], ContactInfo.deleteAll);
  
    app.use("/resume/ContactInfo", router);
  };