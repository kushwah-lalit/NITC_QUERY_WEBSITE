// import the express
const express = require('express');
// run the router class of epxress 
const router = express.Router();
// import password for authentication
const passport = require('passport');
// import question controller to trigger the question releted actions
const questionController = require('../controllers/questions_controller');
console.log('Router file working Question');
// trigger create action to create new question
router.post('/create', passport.checkAuthentication, questionController.create);
// trigger destroy action to deleted the question
router.get('/destroy/:id', passport.checkAuthentication, questionController.destroy);
module.exports = router;