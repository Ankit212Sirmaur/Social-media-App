const router = require('express').Router();
const { followOrUnfollowController, getPostsOfFollowing, getMyPosts,
    getUserPosts, deleteMyProfile } = require('../controllers/userController');

router.post('/toggleFollow', followOrUnfollowController);
router.get('/following/post', getPostsOfFollowing);
router.get('/getMyposts', getMyPosts);
router.get('/getUserPost', getUserPosts);
router.delete('/',deleteMyProfile);



module.exports = router;