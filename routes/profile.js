const express = require('express');
const router = express.Router();

const passport = require('passport');

const profileController = require('../controllers/profile_controller');
console.log('Router file working Profile');
router.get('/profile', profileController.create);

module.exports = router;