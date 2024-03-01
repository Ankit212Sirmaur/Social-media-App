const router = require('express').Router();
const {followOrUnfollowController, getPostsOfFollowing, getMyPosts} = require('../controllers/userController')

router.post('/toggleFollow', followOrUnfollowController);
router.get('/following/post', getPostsOfFollowing);
router.get('/getMyposts', getMyPosts);

module.exports = router;