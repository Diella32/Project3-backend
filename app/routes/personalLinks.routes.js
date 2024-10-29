const express = require('express');
const router = express.Router();
const personalLinks = require("../controllers/personalLinks.controller.js");

// Create a new Personal Link for a resume
router.post("/", personalLinks.create);

// Retrieve all Personal Links for a specific resume
router.get("/resume/:resumeId", personalLinks.findAllForResume);

// Retrieve a single Personal Link by ID
router.get("/:id", personalLinks.findOne);

// Update a Personal Link by ID
router.put("/:id", personalLinks.update);

// Delete a Personal Link by ID
router.delete("/:id", personalLinks.delete);

module.exports = router;
