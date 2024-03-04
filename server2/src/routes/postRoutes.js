const router = require('express').Router();
const { getAllPost, createPost, updatePost, likeAndUnlikePost, deletePost } = require('../controllers/postController')

router.post('/all', getAllPost);
router.post('/', createPost);
router.post('/toogleLike', likeAndUnlikePost);
router.put('/', updatePost);
router.delete('/', deletePost);

module.exports = router;