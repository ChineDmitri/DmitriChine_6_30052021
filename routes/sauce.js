const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');

router.get('/', sauceCtrl.getAllSauce);
// router.post('/', auth, sauceCtrl.createSauce);

module.exports = router;