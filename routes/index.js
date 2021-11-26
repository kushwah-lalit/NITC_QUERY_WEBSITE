const express = require('express');
const router = express.Router();
const homecontroller = require('../controllers/home_controller');
router.get('/',homecontroller.home);
router.use('/users',require('./user'));
router.use('/question', require('./question'));
router.use('/answer', require('./answer'));
module.exports = router;