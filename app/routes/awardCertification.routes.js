module.exports = (app) => {
  const AwardCertifications = require("../controllers/awardCertification.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  const router = require("express").Router();

  // Create a new AwardCertification for a resume
  router.post("/", [authenticate], AwardCertifications.create);

  // Retrieve all AwardCertifications for a specific resume
  router.get("/user/:userId", [authenticate], AwardCertifications.findAllForUser);

  // Retrieve a single AwardCertification by ID
  router.get("/:id", [authenticate], AwardCertifications.findOne);

  // Update an AwardCertification by ID
  router.put("/:id", [authenticate], AwardCertifications.update);

  // Delete an AwardCertification by ID
  router.delete("/:id", [authenticate], AwardCertifications.delete);

  // Delete all AwardCertifications for a specific resume
  router.delete("/resume/:resumeId", [authenticate], AwardCertifications.deleteAll);

  
  app.use("/resume-t9/AwardCertifications", router);
};





