module.exports = (app) => {
  const resume = require("../controllers/resume.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Resume
  router.post("/", [authenticate], resume.create);

  // Retrieve all resume
  router.get("/", [authenticate], resume.findAll);

  // Retrieve all resume for user
  router.get("/userTut/:userId", [authenticate], resume.findAllForUser);

  // Retrieve a single Resume with id
  router.get("/:id", [authenticate], resume.findOne);

  // Update a Resume with id
  router.put("/:id", [authenticate], resume.update);

  // Delete a Resume with id
  router.delete("/:id", [authenticate], resume.delete);

  // Delete all resume
  router.delete("/", [authenticate], resume.deleteAll);

  app.use("/resume/resumes", router);
};
