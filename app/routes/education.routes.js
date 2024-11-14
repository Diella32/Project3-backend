module.exports = (app) => {
    const education = require("../controllers/education.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    const router = require("express").Router();
  
// Create a new Education entry for a resume
router.post("/", [authenticate], education.create);
  
// Retrieve all Education entries for a specific resume
router.get("/user/:userId", [authenticate], education.findAllForUser);
  
// Retrieve a single Education entry by ID
router.get("/:id", [authenticate], education.findOne);
  
// Update an Education entry by ID
router.put("/:id", [authenticate], education.update);
  
// Delete an Education entry by ID
router.delete("/:id", [authenticate], education.delete);
  
 // Delete all education
    router.delete("/resume/:resumeId", [authenticate], education.deleteAll);
  
    app.use("/resume-t9/education", router);
};
  