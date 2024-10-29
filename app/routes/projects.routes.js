const express = require('express');
const router = express.Router();
const projects = require("../controllers/projects.controller.js");

// Create a new Project for a resume
router.post("/", projects.create);

// Retrieve all Projects for a specific resume
router.get("/resume/:resumeId", projects.findAllForResume);

// Retrieve a single Project by ID
router.get("/:id", projects.findOne);

// Update a Project by ID
router.put("/:id", projects.update);

// Delete a Project by ID
router.delete("/:id", projects.delete);

module.exports = router;
