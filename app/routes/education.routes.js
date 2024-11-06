module.exports = (app) => {
    const education = require("../controllers/education.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    const router = require("express").Router();
  
// Create a new Education entry for a resume
router.post("/", [authenticate], education.create);
  
// Retrieve all Education entries for a specific resume
router.get("/resume/:rsume_id", [authenticate], education.findAllForResume);
  
// Retrieve a single Education entry by ID
router.get("/:id", [authenticate], education.findOne);
  
// Update an Education entry by ID
router.put("/:id", [authenticate], education.update);
  
// Delete an Education entry by ID
router.delete("/:id", [authenticate], education.delete);
  
 // Delete all education
    router.delete("/", [authenticate], education.deleteAll);
  
    app.use("/api/resumes/education", router);
};
  