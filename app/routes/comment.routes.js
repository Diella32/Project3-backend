module.exports = app => {
  const comments = require("../controllers/comment.controller.js");
  const { authJwt } = require("../middleware"); // Assuming you have authentication middleware
  
  var router = require("express").Router();

  // Create a new Comment
  router.post("/", [authJwt.verifyToken], comments.create);

  // Retrieve all Comments for a resume
  router.get("/resume/:resumeId", [authJwt.verifyToken], comments.findAllByResume);

  // Delete a Comment
  router.delete("/:id", [authJwt.verifyToken], comments.delete);

  app.use('/api/comments', router);
};
