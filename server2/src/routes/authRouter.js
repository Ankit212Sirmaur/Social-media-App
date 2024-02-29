const router = require('express').Router();
const {loginController,signupController, refreshAccessTokenController} = require('../controllers/authController')

router.post('/signup', signupController);
router.post('/login', loginController);
router.get('/refresh', refreshAccessTokenController)

module.exports = router;