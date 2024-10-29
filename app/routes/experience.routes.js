const express = require('express');
const router = express.Router();
const experience = require("../controllers/experience.controller.js");

// Create a new Experience for a resume
router.post("/", experience.create);

// Retrieve all Experiences for a specific resume
router.get("/resume/:resumeId", experience.findAllForResume);

// Retrieve a single Experience by ID
router.get("/:id", experience.findOne);

// Update an Experience by ID
router.put("/:id", experience.update);

// Delete an Experience by ID
router.delete("/:id", experience.delete);

module.exports = router;
