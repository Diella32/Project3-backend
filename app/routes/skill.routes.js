module.exports = (app) => {
    const Skills = require("../controllers/skill.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    const router = require("express").Router();
  
    // Create a new Skill for a resume
    router.post("/", [authenticate], Skills.create);
  
    // Retrieve all Skills for a specific resume
    router.get("/resume/:resumeId", [authenticate], Skills.findAllForResume);
  
    // Retrieve a single Skill by ID
    router.get("/:id", [authenticate], Skills.findOne);
    
    // Update a Skill by ID
    router.put("/:id", [authenticate], Skills.update);
  
    // Delete a Skills by ID
    router.delete("/:id", [authenticate], Skills.delete);
  
    // Delete all Skills for a specific resume (if needed)
    router.delete("/resume/:resumeId", [authenticate], Skills.deleteAll);
  
    app.use("/resume-t9/Skills", router);
  };
  