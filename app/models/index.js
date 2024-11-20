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

// Models
db.User = require("./user.model.js")(sequelize, Sequelize);
db.Session = require("./session.model.js")(sequelize, Sequelize);
db.Education = require("./education.model.js")(sequelize, Sequelize);
db.Skill = require("./skill.model.js")(sequelize, Sequelize);
db.PersonalLink = require("./personalLink.model.js")(sequelize, Sequelize);
db.Resume = require("./resume.model.js")(sequelize, Sequelize);
// db.Skill = require("./skill.model.js")(sequelize, Sequelize);
// db.PersonalLink = require("./personalLink.model.js")(sequelize, Sequelize);
db.Experience = require("./experience.model.js")(sequelize, Sequelize);
db.Project = require("./project.model.js")(sequelize, Sequelize);
db.Interest = require("./interest.model.js")(sequelize, Sequelize);
db.AwardCertification = require("./awardCertification.model.js")(sequelize, Sequelize);
db.ContactInfo =require("./contactInfo.model.js")(sequelize, Sequelize);

// Associations

db.User.hasMany(db.Session, { as: "sessions", foreignKey: "user_id", onDelete: "CASCADE" });
db.Session.belongsTo(db.User, { as: "user", foreignKey: "user_id" });

// User and Resume (One-to-Many)
db.User.hasMany(db.Resume, { as: "resumes", foreignKey: "user_id", onDelete: "CASCADE" });
db.Resume.belongsTo(db.User, { as: "user", foreignKey: "user_id" });


// User and Project (One-to-Many)
db.User.hasMany(db.Project, { as: db.Project.name, foreignKey: "user_id", onDelete: "CASCADE" });
db.Project.belongsTo(db.User, { as: db.User.name, foreignKey: "user_id", onDelete: "CASCADE" });
// Resume and Projects (Many-to-Many)
db.Resume.belongsToMany(db.Project, { through: "ResumeProjects", as: "projects", foreignKey: "resume_id" });
db.Project.belongsToMany(db.Resume, { through: "ResumeProjects", as: "resumes", foreignKey: "project_id" });



// user and ContactInfo (One-to-One)
db.User.hasMany(db.ContactInfo, { as: db.ContactInfo.name, foreignKey: "user_id", onDelete: "CASCADE" });
db.ContactInfo.belongsTo(db.User, { as: db.User.name, foreignKey: "user_id", onDelete: "CASCADE" });
// Resume and ContactInfo (Many-to-Many)
db.Resume.belongsToMany(db.ContactInfo, { through: "ResumeContactInfo", as: "ContactInfo", foreignKey: "resume_id" });
db.ContactInfo.belongsToMany(db.Resume, { through: "ResumeContactInfo", as: "resumes", foreignKey: "contact_id" });


// User and Education (One-to-Many)
db.User.hasMany(db.Education, { as: db.Education.name, foreignKey: "user_id", onDelete: "CASCADE" });
db.Education.belongsTo(db.User, { as: db.User.name, foreignKey: "user_id", onDelete: "CASCADE" });
// Resume and Education (Many-to-Many)
db.Resume.belongsToMany(db.Education, { through: "ResumeEducation", as: "education", foreignKey: "resume_id" });
db.Education.belongsToMany(db.Resume, { through: "ResumeEducation", as: "resumes", foreignKey: "education_id" });


// User and Skills (One-to-Many)
db.User.hasMany(db.Skill, { as: db.Skill.name, foreignKey: "skill_id", onDelete: "CASCADE" });
db.Skill.belongsTo(db.User, { as: db.User.name, foreignKey: "user_id", onDelete: "CASCADE" });
// Resume and Skills (Many-to-Many)
db.Resume.belongsToMany(db.Skill, { through: "ResumeSkills", as: "skills", foreignKey: "resume_id" });
db.Skill.belongsToMany(db.Resume, { through: "ResumeSkills", as: "resumes", foreignKey: "skill_id" });


// User and Personal Links (One-to-Many)
db.User.hasMany(db.PersonalLink, { as: db.PersonalLink.name, foreignKey: "user_id", onDelete: "CASCADE" });
db.PersonalLink.belongsTo(db.User, { as: db.User.name, foreignKey: "user_id", onDelete: "CASCADE" });
// Resume and Personal Links (Many-to-Many)
db.Resume.belongsToMany(db.PersonalLink, { through: "ResumePersonalLinks", as: "personalLinks", foreignKey: "resume_id" });
db.PersonalLink.belongsToMany(db.Resume, { through: "ResumePersonalLinks", as: "resumes", foreignKey: "personal_link_id" });



// User and Experiences (One-to-Many)
db.User.hasMany(db.Experience, { as: db.Experience.name, foreignKey: "user_id", onDelete: "CASCADE" });
db.Experience.belongsTo(db.User, { as: db.User.name, foreignKey: "user_id", onDelete: "CASCADE" });
// Resume and Experiences (Many-to-Many)
db.Resume.belongsToMany(db.Experience, { through: "ResumeExperiences", as: "experiences", foreignKey: "resume_id" });
db.Experience.belongsToMany(db.Resume, { through: "ResumeExperiences", as: "resumes", foreignKey: "experience_id" });


// User and Interests (One-to-Many)
db.User.hasMany(db.Interest, { as: db.Interest.name, foreignKey: "user_id", onDelete: "CASCADE" });
db.Interest.belongsTo(db.User, { as: db.User.name, foreignKey: "user_id", onDelete: "CASCADE" });
// Resume and Interests (Many-to-Many)
db.Resume.belongsToMany(db.Interest, { through: "ResumeInterests", as: "interests", foreignKey: "resume_id" });
db.Interest.belongsToMany(db.Resume, { through: "ResumeInterests", as: "resumes", foreignKey: "interest_id" });


// User and Awards/Certifications (One-to-Many)
db.User.hasMany(db.AwardCertification, { as: db.AwardCertification.name, foreignKey: "user_id", onDelete: "CASCADE" });
db.AwardCertification.belongsTo(db.User, { as: db.User.name, foreignKey: "user_id", onDelete: "CASCADE" });
// Resume and Awards/Certifications (One-to-Many)
db.Resume.hasMany(db.AwardCertification, { as: "awardCertifications", foreignKey: "resume_id", onDelete: "CASCADE" });
db.AwardCertification.belongsTo(db.Resume, { as: "resume", foreignKey: "resume_id" });

module.exports = db;
