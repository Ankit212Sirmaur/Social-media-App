const router = require('express').Router();
const {followOrUnfollowController} = require('../controllers/userController')

router.post('/toggleFollow', followOrUnfollowController);

module.exports = router;