const DB = require('../models/post');
const Helper = require('../utils/helper');

const all = async (req, res, next) => {
   let posts = await DB.find().populate('user cat', '-password -__v');
   Helper.fMsg(res, "All Posts", posts);
}

const get = async (req, res, next) => {
   let post = await DB.findById(req.params.id).populate("user");
   if (post) {
      Helper.fMsg(res, "Single Post", post);
   } else {
      next(new Error("No Post with that id sir!"));
   }
}

const post = async (req, res, next) => {
   let userId = req.body.user._id;
   delete req.body.user;
   req.body.user = userId;
   let result = await new DB(req.body).save();
   Helper.fMsg(res, "Post Added", result);
}

const patch = async (req, res, next) => {
   let post = await DB.findById(req.params.id);
   if (post) {
      await DB.findByIdAndUpdate(post._id, req.body);
      let result = await DB.findById(post._id);
      Helper.fMsg(res, "Post Updated", result);
   } else {
      next(new Error("No post with that id"));
   }
}
const drop = async (req, res, next) => {
   let post = await DB.findById(req.params.id);
   if (post) {
      await DB.findByIdAndDelete(post._id);
      Helper.fMsg(res, "Post Deleted");
   } else {
      next(new Error("No post with that id"));
   }
}

const byCatId = async (req, res, next) => {
   let posts = await DB.find({ cat: req.params.id });
   Helper.fMsg(res, "All Posts By Category", posts);
}

const byUserId = async (req, res, next) => {
   let posts = await DB.find({ user: req.params.id }).populate('user');
   Helper.fMsg(res, "All Post By User", posts);
}

module.exports = {
   all,
   get,
   post,
   patch,
   drop,
   byCatId,
   byUserId
}