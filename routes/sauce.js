const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const limiter = require('../middleware/limiter');

router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/', auth, limiter.createDelete, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, limiter.modify, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, limiter.createDelete, multer, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, limiter.like, sauceCtrl.voteSauce);

module.exports = router;