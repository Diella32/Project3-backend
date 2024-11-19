require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./app/models");

db.sequelize.sync({force:true});

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple welcome route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the resume management application." });
});

// Routes for authentication and user management
require("./app/routes/auth.routes.js")(app);
require("./app/routes/resume.routes")(app);
require("./app/routes/user.routes")(app);

// Resume-related routes
require("./app/routes/education.routes")(app);
require("./app/routes/experience.routes")(app);
require("./app/routes/project.routes")(app);
require("./app/routes/skill.routes")(app);
require("./app/routes/awardCertification.routes")(app);
require("./app/routes/personalLink.routes")(app);
require("./app/routes/interest.routes")(app);
require("./app/routes/contactInfo.routes.js")(app)

// Set port and listen for requests
const PORT = process.env.PORT || 3029;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
