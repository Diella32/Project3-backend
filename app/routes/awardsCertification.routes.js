const express = require('express');
const router = express.Router();
const awardsCertifications = require("../controllers/awardsCertifications.controller.js");

// Create a new Award/Certification for a resume
router.post("/", awardsCertifications.create);

// Retrieve all Awards/Certifications for a specific resume
router.get("/resume/:resumeId", awardsCertifications.findAllForResume);

// Retrieve a single Award/Certification by ID
router.get("/:id", awardsCertifications.findOne);

// Update an Award/Certification by ID
router.put("/:id", awardsCertifications.update);

// Delete an Award/Certification by ID
router.delete("/:id", awardsCertifications.delete);

module.exports = router;
