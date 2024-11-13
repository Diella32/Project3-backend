const education = require("../controllers/education.controller.js");  // Ensure correct import
const { authenticate } = require("../authorization/authorization.js");
var router = require("express").Router();

// Create a new education entry
router.post("/", [authenticate], education.create);

// Retrieve all education entries for a specific resume
router.get("/:resumeId", [authenticate], education.findAllForResume);

// Retrieve a single education entry by ID
router.get("/:id", [authenticate], education.findOne);

// Update an education entry by ID
router.put("/:id", [authenticate], education.update);

// Delete a specific education entry by ID
router.delete("/:id", [authenticate], education.delete);

// Delete all education entries
router.delete("/", [authenticate], education.deleteAll);

// Prefixing with /resume/education
console.log("Registering /resume/education routes");

module.exports = (app) => {
  app.use("/resume/education", router);
};
