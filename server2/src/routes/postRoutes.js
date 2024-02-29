const router = require('express').Router();
const postController = require('../controllers/postController')

router.get('/all', postController);

module.exports = router;