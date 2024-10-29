const express = require('express');
const router = express.Router();
const education = require("../controllers/education.controller.js");

// Create a new Education entry for a resume
router.post("/", education.create);

// Retrieve all Education entries for a specific resume
router.get("/resume/:resumeId", education.findAllForResume);

// Retrieve a single Education entry by ID
router.get("/:id", education.findOne);

// Update an Education entry by ID
router.put("/:id", education.update);

// Delete an Education entry by ID
router.delete("/:id", education.delete);

module.exports = router;
