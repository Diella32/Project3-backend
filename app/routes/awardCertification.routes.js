module.exports = (app) => {
    const AwardCertifications = require("../controllers/awardCertification.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    const router = require("express").Router();
  
    // Create a new AwardCertification for a resume
    router.post("/", [authenticate], AwardCertifications.create);
  
    // Retrieve all AwardCertifications for a specific resume
    router.get("/resume/:resumeId", [authenticate], AwardCertifications.findAllForResume);
  
    // Retrieve a AwardCertifications Skill by ID
    router.get("/:id", [authenticate], AwardCertifications.findOne);
    
    // Update a AwardCertification by ID
    router.put("/:id", [authenticate], AwardCertifications.update);
  
    // Delete a AwardCertification by ID
    router.delete("/:id", [authenticate], AwardCertifications.delete);
  
    // Delete all AwardCertifications for a specific resume (if needed)
    router.delete("/resume/:resumeId", [authenticate], AwardCertifications.deleteAll);
  
    app.use("/resume/AwardCertifications", router);
  };
  