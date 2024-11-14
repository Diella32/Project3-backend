module.exports = (app) => {
  const awardCertification = require("../controllers/awardCertification.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  const router = require("express").Router();

  // Create a new AwardCertification for a resume
  router.post("/", [authenticate], awardCertification.create);

  // Retrieve all AwardCertifications for a specific resume
  router.get("/user/:userId", [authenticate], awardCertification.findAllForUser);

  // Retrieve a single AwardCertification by ID
  router.get("/:id", [authenticate], awardCertification.findOne);

  // Update an AwardCertification by ID
  router.put("/:id", [authenticate], awardCertification.update);

  // Delete an AwardCertification by ID
  router.delete("/:id", [authenticate], awardCertification.delete);

  // Delete all AwardCertifications for a specific resume
  router.delete("/resume/:resumeId", [authenticate], awardCertification.deleteAll);

  
  app.use("/resume-t9/AwardCertifications", router);
};





