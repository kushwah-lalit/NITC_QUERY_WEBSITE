// import express
const express = require('express');
// call the express router class to handel the routes
const router = express.Router();
// import the homecontroller to render home page
const homecontroller = require('../controllers/home_controller');
// triggers homecroller home on / as address
router.get('/', homecontroller.home);
// import the user.js router file for all the address starting with /users
router.use('/users', require('./user'));
// import the question.js router file for all the address starting with /question
router.use('/question', require('./question'));
// import the answer.js router file for all the address starting with /answer
router.use('/answer', require('./answer'));
// import the profile.js router file for all the address starting with /profile
router.get('/profile', require('./profile'));
module.exports = router;