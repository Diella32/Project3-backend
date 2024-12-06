module.exports = (app) => {
  const admin = require("../controllers/admin.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Match the exact endpoints from adminServices.js
  router.get("/users", [authenticate], admin.getAllUsers);
  router.delete("/users/:userId", [authenticate], admin.deleteUser);
  router.patch("/users/:userId/role", [authenticate], admin.updateUserRole);
  router.get("/stats", [authenticate], admin.getSystemStats);

  app.use("/resume-t9/admin", router);
};
