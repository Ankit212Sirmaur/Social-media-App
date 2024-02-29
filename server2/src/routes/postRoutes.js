const router = require('express').Router();
const postController = require('../controllers/postController')

router.post('/', postController);

module.exports = router;