const router = require('express').Router();
const {followOrUnfollowController, getPostsOfFollowing, getMyPosts, getUserPosts} = require('../controllers/userController')

router.post('/toggleFollow', followOrUnfollowController);
router.get('/following/post', getPostsOfFollowing);
router.get('/getMyposts', getMyPosts);
router.get('/getUserPost', getUserPosts);

module.exports = router;