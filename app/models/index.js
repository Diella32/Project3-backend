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
db.PersonalLinks = require("./personalLink.model.js")(sequelize, Sequelize);
db.Resume = require("./resume.model.js")(sequelize, Sequelize);
db.Skill = require("./skill.model.js")(sequelize, Sequelize);
// db.PersonalLink = require("./personalLink.model.js")(sequelize, Sequelize);
db.Experience = require("./experience.model.js")(sequelize, Sequelize);
db.Project = require("./project.model.js")(sequelize, Sequelize);
db.Interest = require("./interest.model.js")(sequelize, Sequelize);
db.AwardCertification = require("./awardCertification.model.js")(sequelize, Sequelize);
db.ContactInfo =require("./contactInfo.model.js")(sequelize, Sequelize);

// Associations

db.User.hasMany(db.Session, { as: "session", foreignKey: {allowNull: false}, onDelete: "CASCADE" });
db.Session.belongsTo(db.User, { as: "user", foreignKey: {allowNull: false} });

// User and Resume (One-to-Many)
db.User.hasMany(db.Resume, { as: "resume", foreignKey: {allowNull: false}, onDelete: "CASCADE" });
db.Resume.belongsTo(db.User, { as: "user", foreignKey: {allowNull: false} });


// User and Project (One-to-Many)
db.User.hasMany(db.Project, { as: db.Project.name, foreignKey: {allowNull: false}, onDelete: "CASCADE" });
db.Project.belongsTo(db.User, { as: db.User.name, foreignKey: {allowNull: false}, onDelete: "CASCADE" });
// Resume and Projects (Many-to-Many)
db.Resume.belongsToMany(db.Project, { through: "ResumeProjects", as: "projects", foreignKey: {allowNull: false} });
db.Project.belongsToMany(db.Resume, { through: "ResumeProjects", as: "resumes", foreignKey: {allowNull: false} });



// user and ContactInfo (One-to-One)
db.User.hasMany(db.ContactInfo, { as: db.ContactInfo.name, foreignKey: {allowNull: false}, onDelete: "CASCADE" });
db.ContactInfo.belongsTo(db.User, { as: db.User.name, foreignKey: {allowNull: false}, onDelete: "CASCADE" });
// Resume and ContactInfo (Many-to-Many)
db.Resume.belongsToMany(db.ContactInfo, { through: "ResumeContactInfo", as: "ContactInfo", foreignKey: {allowNull: false} });
db.ContactInfo.belongsToMany(db.Resume, { through: "ResumeContactInfo", as: "resumes", foreignKey: {allowNull: false} });


// User and Education (One-to-Many)
db.User.hasMany(db.Education, { as: db.Education.name, foreignKey: {allowNull: false}, onDelete: "CASCADE" });
db.Education.belongsTo(db.User, { as: db.User.name, foreignKey: {allowNull: false}, onDelete: "CASCADE" });
// Resume and Education (Many-to-Many)
db.Resume.belongsToMany(db.Education, { through: "ResumeEducation", as: "education", foreignKey:{allowNull: false} });
db.Education.belongsToMany(db.Resume, { through: "ResumeEducation", as: "resumes", foreignKey:{allowNull: false} });


// User and Skills (One-to-Many)
db.User.hasMany(db.Skill, { as: db.Skill.name, foreignKey: {allowNull: false}, onDelete: "CASCADE" });
db.Skill.belongsTo(db.User, { as: db.User.name, foreignKey:{allowNull: false}, onDelete: "CASCADE" });
// Resume and Skills (Many-to-Many)
db.Resume.belongsToMany(db.Skill, { through: "ResumeSkills", as: "skills", foreignKey:{allowNull: false} });
db.Skill.belongsToMany(db.Resume, { through: "ResumeSkills", as: "resumes", foreignKey:{allowNull: false} });


// User and Personal Links (One-to-Many)
db.User.hasMany(db.PersonalLinks, { as: db.PersonalLinks.name, foreignKey: {allowNull: false}, onDelete: "CASCADE" });
db.PersonalLinks.belongsTo(db.User, { as: db.User.name, foreignKey: {allowNull: false}, onDelete: "CASCADE" });
// Resume and Personal Links (Many-to-Many)
db.Resume.belongsToMany(db.PersonalLinks, { through: "ResumePersonalLinks", as: "personalLinks", foreignKey: {allowNull: false} });
db.PersonalLinks.belongsToMany(db.Resume, { through: "ResumePersonalLinks", as: "resumes", foreignKey: {allowNull: false} });



// User and Experiences (One-to-Many)
db.User.hasMany(db.Experience, { as: db.Experience.name, foreignKey: {allowNull: false}, onDelete: "CASCADE" });
db.Experience.belongsTo(db.User, { as: db.User.name, foreignKey: {allowNull: false}, onDelete: "CASCADE" });
// Resume and Experiences (Many-to-Many)
db.Resume.belongsToMany(db.Experience, { through: "ResumeExperiences", as: "experiences", foreignKey: {allowNull: false} });
db.Experience.belongsToMany(db.Resume, { through: "ResumeExperiences", as: "resumes", foreignKey: {allowNull: false} });


// User and Interests (One-to-Many)
db.User.hasMany(db.Interest, { as: db.Interest.name, foreignKey: {allowNull: false}, onDelete: "CASCADE" });
db.Interest.belongsTo(db.User, { as: db.User.name, foreignKey: {allowNull: false}, onDelete: "CASCADE" });
// Resume and Interests (Many-to-Many)
db.Resume.belongsToMany(db.Interest, { through: "ResumeInterests", as: "interests", foreignKey: {allowNull: false} });
db.Interest.belongsToMany(db.Resume, { through: "ResumeInterests", as: "resumes", foreignKey: {allowNull: false} });


// User and Awards/Certifications (One-to-Many)
db.User.hasMany(db.AwardCertification, { as: db.AwardCertification.name, foreignKey: {allowNull: false}, onDelete: "CASCADE" });
db.AwardCertification.belongsTo(db.User, { as: db.User.name, foreignKey: {allowNull: false}, onDelete: "CASCADE" });
// Resume and Awards/Certifications (One-to-Many)
db.Resume.hasMany(db.AwardCertification, { as: "awardCertifications", foreignKey:{allowNull: false}, onDelete: "CASCADE" });
db.AwardCertification.belongsTo(db.Resume, { as: "resume", foreignKey: {allowNull: false} });

module.exports = db;
