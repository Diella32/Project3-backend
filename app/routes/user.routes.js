module.exports = (app) => {
  const user = require("../controllers/user.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new User
  router.post("/", [authenticate], user.create);

  
  // Retrieve all People
  router.get("/", [authenticate], user.findAll);

  // Retrieve a single User with id
  router.get("/:id", [authenticate], user.findOne);

  // Update a User with id
  router.put("/:id", [authenticate], user.update);

  // Delete a User with id
  router.delete("/:id", [authenticate], user.delete);

  // Delete all User
  router.delete("/", [authenticate], user.deleteAll);


  // Admin Routes
  router.get("/admin/list", [authenticate, user.isAdmin], user.findAllAdmins);
  router.put("/:id", [authenticate, user.isAdmin], user.update);
  router.delete("/:id", [authenticate, user.isAdmin], user.delete);


  app.use("/resume-t9/user", router);
};
