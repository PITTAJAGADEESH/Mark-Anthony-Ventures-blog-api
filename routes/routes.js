const express = require("express");
const {
  signup,
  login,
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  validateSignup,
} = require("../controllers/controllers.js");
const {
  addComment,
  getComments,
  deleteComment,
  addLike,
  removeLike,
  getLikeCount,
} = require("../controllers/commentLikeController.js");
const authMiddleware = require("../middleware/middleware.js");

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/login", login);

router.post("/posts", authMiddleware, createPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPost);
router.put("/posts/:id", authMiddleware, updatePost);
router.delete("/posts/:id", authMiddleware, deletePost);

router.post("/posts/:id/comments", authMiddleware, addComment);
router.get("/posts/:id/comments", getComments);
router.delete("/comments/:id", authMiddleware, deleteComment);

router.post("/posts/:id/likes", authMiddleware, addLike);
router.delete("/posts/:id/likes", authMiddleware, removeLike);
router.get("/posts/:id/likes/count", getLikeCount);

module.exports = router;
