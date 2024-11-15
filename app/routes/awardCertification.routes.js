module.exports = (app) => {
  const AwardCertifications = require("../controllers/awardCertification.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  const router = require("express").Router();

  // Create a new AwardCertification for a resume
  router.post("/", [authenticate], AwardCertification.create);

  // Retrieve all AwardCertifications for a specific resume
  router.get("/user/:userId", [authenticate], AwardCertification.findAllForUser);

  // Retrieve a single AwardCertification by ID
  router.get("/:id", [authenticate], AwardCertification.findOne);

  // Update an AwardCertification by ID
  router.put("/:id", [authenticate], AwardCertification.update);

  // Delete an AwardCertification by ID
  router.delete("/:id", [authenticate], AwardCertification.delete);

  // Delete all AwardCertifications for a specific resume
  router.delete("/resume/:resumeId", [authenticate], AwardCertification.deleteAll);

  
  app.use("/resume-t9/AwardCertification", router);
};





