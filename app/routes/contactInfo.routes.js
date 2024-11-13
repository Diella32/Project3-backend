const contactInfo = require("../controllers/contactInfo.controller.js");
const { authenticate } = require("../authorization/authorization.js");
var router = require("express").Router();

// Create a new ContactInfo
router.post("/", [authenticate], contactInfo.create);

// Retrieve all contactInfos
router.get("/", [authenticate], contactInfo.findAll);

// Retrieve all contactInfos for a specific user by userId
router.get("/user/:userId", [authenticate], contactInfo.findAllForUser);

// Retrieve a single contactInfo with id
router.get("/:id", [authenticate], contactInfo.findOne);

// Update a contactInfo with id
router.put("/:id", [authenticate], contactInfo.update);

// Delete a contactInfo with id
router.delete("/:id", [authenticate], contactInfo.delete);

// Delete all contactInfos
router.delete("/", [authenticate], contactInfo.deleteAll);

// Prefixing with /resume/contactInfo
console.log("Registering /resume/contactInfo routes");

module.exports = (app) => {
  app.use("/resume/contactInfo", router);
};
