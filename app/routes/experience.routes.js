module.exports = (app) => {
    const experiences = require("../controllers/experience.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    const router = require("express").Router();
  
    // Create a new Experience for a resume
    router.post("/", [authenticate], experiences.create);
  
    // Retrieve all Experiences for a specific resume
    router.get("/resume/:resumeId", [authenticate], experiences.findAllForResume);
  
    // Retrieve a single Experience by ID
    router.get("/:id", [authenticate], experiences.findOne);
  
    // Update an Experience by ID
    router.put("/:id", [authenticate], experiences.update);
  
    // Delete an Experience by ID
    router.delete("/:id", [authenticate], experiences.delete);
  
    // Delete all Experiences for a specific resume (if needed)
    router.delete("/resume/:resumeId", [authenticate], experiences.deleteAll);
  
    app.use("/api/resumes/experiences", router);
  };
  