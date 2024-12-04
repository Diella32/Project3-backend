//const { Experience } = require("../models/index.js");

module.exports = (app) => {
  const experiences = require("../controllers/experience.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  const express = require("express");
  const router = express.Router();

  // Create a new Experience for a resume
  router.post("/", authenticate, experiences.create);

  // Retrieve all Experiences for a specific resume
  router.get("/user/:userId", authenticate, experiences.findAllForUser);

  // Retrieve a single Experience by ID
  router.get("/:id", authenticate, experiences.findOne);

  // Update an Experience by ID
  router.put("/:id", authenticate, experiences.update);

  // Delete an Experience by ID
  router.delete("/:id", authenticate, experiences.delete);

  // Delete all Experiences for a specific resume (if needed)
  router.delete("/resume/:resumeId", authenticate, experiences.deleteAll);

  // Use the router for all "/resume/experiences" routes
  app.use("/resume-t9/experiences", router);
};
