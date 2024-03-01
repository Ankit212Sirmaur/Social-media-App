const User = require("../models/UserSchema");
const Posts = require("../models/PostSchema");
const { error, success } = require("../utils/responseWrapper");

const followOrUnfollowController = async (req, res) => {
    try {
        const { userIdToFollow } = req.body;
        const curUserId = req._id;

        const curUser = await User.findById(curUserId);
        const userToFollow = await User.findById(userIdToFollow);
        console.log(curUser);
        if (curUserId === userIdToFollow) {
            return res.send(error(409, "Users cannot follow themselves"));
        }

        if (!userToFollow) {
            return res.send(error(404, "User to follow not found"));
        }

        if (curUser.followings.includes(userIdToFollow)) { // already followed

            const followingIndex = curUser.followings.indexOf(userIdToFollow);
            curUser.followings.splice(followingIndex, 1);

            const followerIndex = userToFollow.followers.indexOf(curUser);
            userToFollow.followers.splice(followerIndex, 1);
        } else {
            userToFollow.followers.push(curUserId);
            curUser.followings.push(userIdToFollow);
        }

        await userToFollow.save();
        await curUser.save();
        return res.send(success(200, 'Toggling follow and unfollow'));
    } catch (e) {
        console.log(e);
        return res.send(error(e.message, 500));
    }
};

const getPostsOfFollowing = async (req, res) => {
    try {
        const currUser = await User.findById(req._id);
        // i want all post curruser following f
        // const followings = currUser.followings;
        const posts = await Posts.find({
            'owner': {
                '$in': currUser.followings
            }
        });
        return res.send(success({ posts }, 200));
    } catch (e) {
        return res.send(error('not post', 500));
    }

}

const getMyPosts = async (req, res) => {
    try {
        const currUserId = req._id;
        const UserPosts = await Posts.find({
            owner : currUserId  
        }).populate('likes'); 
         //  by populating this like we get all the details who have liked this post  by ref 'user' 
        //  before this we getting only liked id in the liked arrray of post schema
        return res.send(success({UserPosts}, 200));
    } catch (e) {
        return res.send(error(e.message, 500));
    }
}

const getUserPosts = async (req, res) =>{
    try {
        const userId = req.body.userId;
        if(!userId) {
            return res.send(error('user id required', 400));
        }
        const UserPosts = await Posts.find({
            owner : userId
        }).populate('likes').sort({ updatedAt: 1 });  // getting in the increasing order  which post is comes at last come first
        return res.send(success({UserPosts}, 200));
    } catch (e) {
        return res.send(error(e.message, 500));
    }
}
module.exports = {
    followOrUnfollowController,
    getPostsOfFollowing,
    getMyPosts,
    getUserPosts,
};
