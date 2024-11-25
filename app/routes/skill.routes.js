const express = require("express");
const { authenticate } = require("../authorization/authorization.js");
const skills = require("../controllers/skill.controller.js"); // Make sure this path is correct

const router = express.Router();

// Create a new Skill for a resume
router.post("/", authenticate, skills.create);

// Retrieve all Skills for a specific user
router.get("/user/:userId", authenticate, skills.findAllForUser);

// Retrieve a single Skill by ID
router.get("/:id", authenticate, skills.findOne);

// Update a Skill by ID
router.put("/:id", authenticate, skills.update);

// Delete a Skill by ID
router.delete("/:id", authenticate, skills.delete);

// Delete all Skills for a specific resume (if needed)
router.delete("/resume/:resumeId", authenticate, skills.deleteAll);

module.exports = (app) => {
  app.use("/resume-t9/skills", router);
};
