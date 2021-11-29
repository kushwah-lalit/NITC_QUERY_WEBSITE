// import express
const express = require('express');
// run the express router class
const router = express.Router();
// import the passport
const passport = require('passport');
// import the user controller for user related actions
const userController = require('../controllers/user_controllers');
console.log('Router file working user');
// trigger sign-up action to render signup page
router.get('/sign-up', userController.signUp);
// trigger sign-in action to render signin page
router.get('/sign-in', userController.signIn);
// trigger create action to create new user
router.post('/create', userController.create);
// trigger create session action to log in user
// usemiddleware to authenticate
router.post('/create-session', passport.authenticate(
    // call passport local strategy
    'local', { failureRedirect: '/users/sign-in' }
), userController.createSession);
// // sign out
router.get('/sign-out', userController.destroySession);
// trigger the verify email action to verify the user from the mail link
router.get('/verify-email', userController.verifyEmail);

module.exports = router;