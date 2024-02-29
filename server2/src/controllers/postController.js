const { success, error } = require("../utils/responseWrapper");
const User = require("../models/UserSchema");
const Post = require('../models/PostSchema');
const getAllPost = async (req, res) => {
    console.log(req._id);
    try {
        return res.send(success('getting all the post', 200));
    } catch (e) {
        console.log(e);
        return res.send(error('something wrong', 500));
    }
}

const createPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const owner = req._id;

        const user = await User.findById(req._id);
        const post = await Post.create({
            owner,
            caption,
        });

        user.posts.push(post._id);
        await user.save();

        return res.send(success({ post }, 201));
    } catch (e) {
        return res.send(error(e.message, 500));
    }
}
const likeAndUnlikePost = async (req, res) =>{
    try {
        const {postId} = req.body;
        const userId = req._id;
        const post = await Post.findById(postId);
        if(!post){
            return res.send(error('post not found', 404));
        }
        if(post.likes.includes(userId)){
            const idx = post.likes.indexOf(userId);
            post.likes.splice(idx,1);
            await post.save();
            return res.send(success('unlike the post',200));
        } else {
            post.likes.push(userId);
            await post.save();
            return res.send(success('like the post',200));
        }
    } catch (e) {
        return res.send(error(e.message, 500));
    }
}

module.exports = {
    getAllPost,
    createPost,
    likeAndUnlikePost,

}