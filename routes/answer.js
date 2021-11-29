// import express
const express = require('express');
// run the express router class
const router = express.Router();
// import passport to handel the check for the local user i.e the logged in user
const passport = require('passport');
// import the controller for the answers
const answerController = require('../controllers/answers_controllers');
console.log('Router file working Answer');
// trigger the create from answer controller only on authentication
router.post('/create', passport.checkAuthentication, answerController.create);
// trigger the delete from answer controller only on authentication
router.get('/destroy/:id', passport.checkAuthentication, answerController.destroy);

module.exports = router;