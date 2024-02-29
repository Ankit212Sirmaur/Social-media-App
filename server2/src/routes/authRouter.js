const router = require('express').Router();
const {loginController,signupController, refreshAccessTokenController} = require('../controllers/authController')

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/refresh', refreshAccessTokenController)

module.exports = router;