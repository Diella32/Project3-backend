module.exports = (app) => {
    const interest = require("../controllers/interest.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    const router = require("express").Router();
  
    // Create a new interest for a resume
    router.post("/", [authenticate], interest.create);
  
    // Retrieve all interest for a specific resume
    router.get("/resume/:resumeId", [authenticate], interest.findAllForResume);
  
    // Retrieve a single interest by ID
    router.get("/:id", [authenticate], interest.findOne);
    
    // Update a interest by ID
    router.put("/:id", [authenticate], interest.update);
  
    // Delete a interest by ID
    router.delete("/:id", [authenticate], interest.delete);
  
    // Delete all interest for a specific user (if needed)
    router.delete("/resume/:resumeId", [authenticate], interest.deleteAllForUser);
  
    app.use("/api/resumes/interest", router);
  };
  