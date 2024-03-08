const router = require('express').Router();
const middleware = require('../middlewares/requireLogin')
const { followOrUnfollowController, getPostsOfFollowing, getMyPosts,
    getUserPosts, deleteMyProfile, getMyInfo, updateUserProfile } = require('../controllers/userController');

router.post('/toggleFollow',middleware, followOrUnfollowController);
router.get('/following/post',middleware, getPostsOfFollowing);
router.get('/getMyposts',middleware, getMyPosts);
router.get('/getUserPost',middleware, getUserPosts);
router.delete('/', middleware, deleteMyProfile);
router.get('/getMyInfo',middleware, getMyInfo);
router.put('/', middleware, updateUserProfile);



module.exports = router;