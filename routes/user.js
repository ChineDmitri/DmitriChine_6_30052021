const express = require('express');
const limiter = require('../middleware/limiter');
const router = express.Router();


const userCtrl = require('../controllers/user.js');

router.post('/signup', limiter.signup, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;