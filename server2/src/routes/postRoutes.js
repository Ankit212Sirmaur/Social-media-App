const router = require('express').Router();
const middleware = require('../middlewares/requireLogin')
const { getAllPost, createPost, updatePost, likeAndUnlikePost, deletePost } = require('../controllers/postController')

router.post('/all',middleware,getAllPost);
router.post('/',middleware, createPost);
router.post('/toogleLike', middleware, likeAndUnlikePost);
router.put('/', middleware, updatePost);
router.delete('/', middleware, deletePost);

module.exports = router;