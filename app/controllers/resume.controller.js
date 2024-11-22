const db = require("../models");
const Resume = db.Resume;

const ContactInfo = db.ContactInfo;
const Project= db.Project;
const Education=db.Education;
const PersonalLink= db.PersonalLink;
const Skill= db.Skill;
const Experience= db.Experience;
const AwardCertification= db.AwardCertification;
const Interest= db.Interest;


const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({ message: "Title cannot be empty!" });
  }

  const {
    title,
    introduction,
    template_choice,
    userId,
    selectedContacts,
    selectedEducation,
    selectedProjects,
    selectedPersonalLinks,
    selectedExperiences,
    selectedSkills,
    selectedInterests,
    selectedAwards,
  } = req.body;

  const resume = {
    title: req.body.title,
    userId: req.body.userId,
    introduction: req.body.introduction,
    template_choice: req.body.template_choice,
  };


  console.log(req.body);

  try {
    // Create the resume
    const resume = await Resume.create({
      title,
      introduction,
      template_choice,
      user_id: userId,
    });

    // Add relationships dynamically
    if (Array.isArray(selectedContacts)) await resume.addContactInfo(selectedContacts);
    if (Array.isArray(selectedEducation)) await resume.addEducation(selectedEducation);
    if (Array.isArray(selectedProjects)) await resume.addProjects(selectedProjects);
    if (Array.isArray(selectedSkills)) await resume.addSkills(selectedSkills);
    if (Array.isArray(selectedPersonalLinks)) await resume.addPersonalLinks(selectedPersonalLinks);
    if (Array.isArray(selectedExperiences)) await resume.addExperiences(selectedExperiences);
    if (Array.isArray(selectedInterests)) await resume.addInterests(selectedInterests);
    if (Array.isArray(selectedAwards)) await resume.addAwards(selectedAwards);

    res.status(201).send(resume);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message || "Some error occurred while creating the Resume." });
  }
};


// Retrieve all Resumes for a specific User
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Resume.findAll({ where: { user_id: userId } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error retrieving Resumes." }));
};

// Find a single Resume with an id and include ContactInfo details
exports.findOne = (req, res) => {
  const resume_id = req.params.id; // Ensure this matches the parameter name from your route

  Resume.findByPk(resume_id, {
    include: [
      {
        model: ContactInfo,
        as: "ContactInfo", // Alias for ContactInfo
      },
      {
        model: Project,
        as: "projects", // Alias for Projects
      },
      {
        model: Experience,
        as: "experiences", // Alias for Experiences
      },
      {
        model: Education,
        as: "education", // Alias for Education
      },
      {
        model: Skill,
        as: "skills", // Alias for Skills
      },
      {
        model: PersonalLink,
        as: "personalLinks", // Alias for Personal Links
      },
      {
        model: Interest,
        as: "interests", // Alias for Interests
      },
      {
        model: AwardCertification,
        as: "awards", // Alias for Award Certifications
      },
    ],
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find Resume with id=${resume_id}.` });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retrieving Resume with id=" + resume_id,
      });
    });
};


// Update a Resume by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Resume.update(req.body, { where: { resume_id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Resume was updated successfully." });
      } else {
        res.send({ message: `Cannot update Resume with id=${id}. Maybe Resume was not found or req.body is empty!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Error updating Resume with id=" + id }));
};

// Delete a Resume with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Resume.destroy({ where: { resume_id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Resume was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Resume with id=${id}. Maybe Resume was not found!` });
      }
    })
    .catch(err => res.status(500).send({ message: err.message || "Could not delete Resume with id=" + id }));
};

// Delete all Resumes from the database.
exports.deleteAll = (req, res) => {
  Resume.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Resumes were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all Resumes." }));
};
