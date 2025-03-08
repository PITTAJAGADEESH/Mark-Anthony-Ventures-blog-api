const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const User = sequelize.define("User", {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
});

const Post = sequelize.define("Post", {
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  tags: DataTypes.STRING,
});

const Comment = sequelize.define("Comment", {
  content: DataTypes.TEXT,
});

const Like = sequelize.define("Like", {});

User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Like);
Like.belongsTo(Post);

User.hasMany(Like);
Like.belongsTo(User);

module.exports = { sequelize, User, Post, Comment, Like };
