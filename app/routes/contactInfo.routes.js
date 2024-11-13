module.exports = (app) => {
    const contactInfo = require("../controllers/contactInfo.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Resume
    router.post("/", [authenticate], contactInfo.create);
  
    // Retrieve all contactInfo
    router.get("/", [authenticate], contactInfo.findAll);
  
    // Retrieve all contactInfo for user
    router.get("/:userId", [authenticate], contactInfo.findAllForUser);
  
    // Retrieve a single contactInfo with id
    router.get("/:id", [authenticate], contactInfo.findOne);
  
    // Update a contactInfo with id
    router.put("/:id", [authenticate], contactInfo.update);
  
    // Delete a contactInfo with id
    router.delete("/:id", [authenticate], contactInfo.delete);
  
    // Delete all contactInfo
    router.delete("/", [authenticate], contactInfo.deleteAll);
  
    app.use("/resume/contactInfo", router);
  };