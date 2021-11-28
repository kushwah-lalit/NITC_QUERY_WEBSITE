const express = require('express');
const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/user_controllers');
console.log('Router file working user');
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.post('/create', userController.create);

// usemiddleware to authenticate
router.post('/create-session', passport.authenticate(
    'local', { failureRedirect: '/users/sign-in' }
), userController.createSession);
// // sign out
router.get('/sign-out', userController.destroySession);
router.get('/verify-email', userController.verifyEmail);

module.exports = router;