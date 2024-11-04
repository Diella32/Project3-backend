module.exports = (app) => {
    const projects = require("../controllers/experience.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    const router = require("express").Router();
  
    // Create a new Project for a resume
    router.post("/", [authenticate], projects.create);
  
    // Retrieve all Experiences for a specific resume
    router.get("/resume/:resumeId", [authenticate], projects.findAllForResume);
  
    // Retrieve a single Project by ID
    router.get("/:id", [authenticate], projects.findOne);
    
    // Update a Project by ID
    router.put("/:id", [authenticate], projects.update);
  
    // Delete a Project by ID
    router.delete("/:id", [authenticate], projects.delete);
  
    // Delete all Experiences for a specific resume (if needed)
    router.delete("/resume/:resumeId", [authenticate], projects.deleteAll);
  
    app.use("/api/resumes/projects", router);
  };
  