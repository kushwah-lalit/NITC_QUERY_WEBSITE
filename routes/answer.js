const express = require('express');
const router = express.Router();

const passport = require('passport');

const answerController = require('../controllers/answers_controllers');
console.log('Router file working');
router.post('/create', passport.checkAuthentication,answerController.create);
// router.get('/destroy/:id', passport.checkAuthentication,commentController.destroy);

module.exports=router; 