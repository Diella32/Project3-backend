module.exports = (app) => {
    const PersonalLinks = require("../controllers/personalLink.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    const router = require("express").Router();
  
    // Create a new PersonalLink for a resume
    router.post("/", [authenticate], PersonalLinks.create);
  
    // Retrieve all PersonalLinks for a specific resume
    router.get("/user/:userId", [authenticate], PersonalLinks.findAllForUser);
  
    // Retrieve a single PersonalLink by ID
    router.get("/:id", [authenticate], PersonalLinks.findOne);
    
    // Update a PersonalLinks by ID
    router.put("/:id", [authenticate], PersonalLinks.update);
  
    // Delete a PersonalLink by ID
    router.delete("/:id", [authenticate], PersonalLinks.delete);
  
    // Delete all PersonalLinks for a specific resume (if needed)
    router.delete("/resume/:resumeId", [authenticate], PersonalLinks.deleteAll);
  
    app.use("/resume/PersonalLinks", router);
  };
  