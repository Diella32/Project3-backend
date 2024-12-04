const db = require("../models");
const Comment = db.comments;
const User = db.users;

// Create and Save a new Comment
exports.create = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Only admins can add comments" });
    }

    const comment = await Comment.create({
      content: req.body.content,
      resume_id: req.body.resumeId,
      user_id: req.user.id
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Comments for a specific resume
exports.findAllByResume = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { resume_id: req.params.resumeId },
      include: [{
        model: User,
        attributes: ['fName', 'lName'] // Only include name fields from user
      }]
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Comment
exports.delete = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (!user.isAdmin && comment.user_id !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await comment.destroy();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
