// import the express
const express = require('express');
// run the express class router
const router = express.Router();
// import passport for authentication task
const passport = require('passport');
// import the profile controller to run the actions related to the profile page
const profileController = require('../controllers/profile_controller');
console.log('Router file working Profile');
// trigger the action of profile page to render it only on authentication
router.get('/profile', passport.checkAuthentication,profileController.create);

module.exports = router;