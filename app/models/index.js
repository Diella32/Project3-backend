const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.resume = require("./resume.model.js")(sequelize, Sequelize);
db.personalLink = require("./personalLink.model.js")(sequelize, Sequelize);
db.education = require("./education.model.js")(sequelize, Sequelize);
db.experience = require("./experience.model.js")(sequelize, Sequelize);
db.project = require("./project.model.js")(sequelize, Sequelize);
db.skill = require("./skill.model.js")(sequelize, Sequelize);
db.awardCertification = require("./awardCertification.model.js")(sequelize, Sequelize);
db.interest = require("./interest.model.js")(sequelize, Sequelize);


// User to Resume (One-to-Many)
db.user.hasMany(db.resume, { as: "resumes", foreignKey: "user_id", onDelete: "CASCADE" });
db.resume.belongsTo(db.user, { as: "user", foreignKey: "user_id" });

// Resume to other entities (One-to-Many)
db.resume.hasMany(db.personalLink, { as: "personalLinks", foreignKey: "resume_id", onDelete: "CASCADE" });
db.personalLink.belongsTo(db.resume, { as: "resume", foreignKey: "resume_id" });

db.resume.hasMany(db.education, { as: "education", foreignKey: "resume_id", onDelete: "CASCADE" });
db.education.belongsTo(db.resume, { as: "resume", foreignKey: "resume_id" });

db.resume.hasMany(db.experience, { as: "experience", foreignKey: "resume_id", onDelete: "CASCADE" });
db.experience.belongsTo(db.resume, { as: "resume", foreignKey: "resume_id" });

db.resume.hasMany(db.project, { as: "projects", foreignKey: "resume_id", onDelete: "CASCADE" });
db.project.belongsTo(db.resume, { as: "resume", foreignKey: "resume_id" });

db.resume.hasMany(db.awardCertification, { as: "awardCertifications", foreignKey: "resume_id", onDelete: "CASCADE" });
db.awardCertification.belongsTo(db.resume, { as: "resume", foreignKey: "resume_id" });

db.resume.hasMany(db.interest, { as: "interests", foreignKey: "resume_id", onDelete: "CASCADE" });
db.interest.belongsTo(db.resume, { as: "resume", foreignKey: "resume_id" });

// Many-to-Many relationship between Resume and Skill through resumeSkill bridge table
db.resume.belongsToMany(db.skill, {
  through: db.resumeSkill,
  as: "skills",
  foreignKey: "resume_id",
  otherKey: "skill_id",
});
db.skill.belongsToMany(db.resume, {
  through: db.resumeSkill,
  as: "resumes",
  foreignKey: "skill_id",
  otherKey: "resume_id",
});

module.exports = db;