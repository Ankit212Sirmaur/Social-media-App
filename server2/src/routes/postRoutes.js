const router = require('express').Router();
const {getAllPost, createPost, likeAndUnlikePost} = require('../controllers/postController')

router.get('/all', getAllPost);
router.post('/create', createPost);
router.post('/toogleLike', likeAndUnlikePost);

module.exports = router;