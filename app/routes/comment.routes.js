module.exports = app => {
  const comments = require("../controllers/comment.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  const router = require("express").Router();

  // Create a new Comment
  router.post("/", comments.create);

  // Retrieve all Comments for a resume
  router.get("/resume/:resumeId", comments.findAllByResume);

  // Delete a Comment
  router.delete("/:id", comments.delete);

  app.use('/api/comments', router);
};
