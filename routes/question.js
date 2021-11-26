const express = require('express');
const router = express.Router();

const passport = require('passport');

const questionController = require('../controllers/questions_controller');
console.log('Router file working');
router.post('/create', passport.checkAuthentication,questionController.create);
// router.get('/destroy/:id', passport.checkAuthentication,postController.destroy);
module.exports=router; 