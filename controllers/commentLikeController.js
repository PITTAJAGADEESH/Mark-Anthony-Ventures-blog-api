const { Comment, Like } = require("../models/models");

exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { id: postId } = req.params;

    const comment = await Comment.create({
      content,
      PostId: postId,
      UserId: req.userId,
    });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const comments = await Comment.findAll({ where: { PostId: postId } });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);

    if (!comment || comment.UserId !== req.userId)
      return res.status(403).json({ message: "Unauthorized" });

    await comment.destroy();
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.addLike = async (req, res) => {
  try {
    const { id: postId } = req.params;
    await Like.create({ PostId: postId, UserId: req.userId });
    res.json({ message: "Liked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.removeLike = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const like = await Like.findOne({
      where: { PostId: postId, UserId: req.userId },
    });

    if (!like) return res.status(404).json({ message: "Like not found" });

    await like.destroy();
    res.json({ message: "Like removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getLikeCount = async (req, res) => {
  try {
    const count = await Like.count({ where: { PostId: req.params.id } });
    res.json({ likes: count });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
