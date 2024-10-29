const express = require('express');
const router = express.Router();
const interests = require("../controllers/interests.controller.js");

// Create a new Interest for a resume
router.post("/", interests.create);

// Retrieve all Interests for a specific resume
router.get("/resume/:resumeId", interests.findAllForResume);

// Retrieve a single Interest by ID
router.get("/:id", interests.findOne);

// Update an Interest by ID
router.put("/:id", interests.update);

// Delete an Interest by ID
router.delete("/:id", interests.delete);

module.exports = router;
