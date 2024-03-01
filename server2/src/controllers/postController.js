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
        if(!caption){
            res.send(error('caption is required', 400));
        }
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
const likeAndUnlikePost = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req._id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.send(error('post not found', 404));
        }
        if (post.likes.includes(userId)) {
            const idx = post.likes.indexOf(userId);
            post.likes.splice(idx, 1);
            await post.save();
            return res.send(success('unlike the post', 200));
        } else {
            post.likes.push(userId);
            await post.save();
            return res.send(success('like the post', 200));
        }
    } catch (e) {
        return res.send(error(e.message, 500));
    }
}

const updatePost = async (req, res) => {
    try {
        const { postId, caption } = req.body;
        const currUserId = req._id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.send(error('Post not found', 400));
        }
        if (post.owner.toString() !== currUserId) {
            return res.send(error('Only owners can update the post', 403));
        }
        if (caption) {
            post.caption = caption;
        }
        await post.save();
        return res.send(success('Post update', 200));
    } catch (e) {
        return res.send(error(e.message, 500));
    }
}

const  deletePost = async (req, res) =>{
    try {
        const {postId} = req.body;
        const curruserId = req._id;
        // console.log(curruserId);
        const post = await Post.findById(postId);
        if (!post) {
            return res.send(error('Post not found', 400));
        }
        if(post.owner.toString() !== curruserId){
            return res.send(error('Only owners can delete the post', 403));
        }
        const currUser = await User.findById(curruserId);
        if(currUser.posts.includes(postId)){
            const idx = currUser.posts.indexOf(postId);
            currUser.posts.splice(idx, 1);
            await currUser.save();   
        }
        await Post.findByIdAndDelete(postId);
        return res.send(success('Deleted the post', 200));
    } catch (e) {
        return res.send((error(e.message, 500)));
    }
}

module.exports = {
    getAllPost,
    createPost,
    likeAndUnlikePost,
    updatePost,
    deletePost
}