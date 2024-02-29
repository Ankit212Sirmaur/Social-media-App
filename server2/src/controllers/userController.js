const User = require("../models/UserSchema");
const { error, success } = require("../utils/responseWrapper");
const followOrUnfollowController = async (req, res) => {
    try {
        const { userIdToFollow } = req.body;
        const curUserId = req._id;
        
        const userToFollow = await User.findById(userIdToFollow);
        const curUser = await User.findById(curUserId);
        
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

module.exports = {
    followOrUnfollowController,
};
