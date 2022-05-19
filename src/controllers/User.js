const db = require("../Models");
const Topic = db.topic;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};




exports.getPosts = async (req, res) => {
  const result = await Topic.find()
  res.send(result);
};
exports.postPost = async (req, res) => {
  const Post = new Topic(req.body);
  const created = await Post.save();
  res.json(created);
};