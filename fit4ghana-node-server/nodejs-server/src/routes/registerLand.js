"use strict";

const express        = require('express');
const router         = express.Router();

const LandRegisterController = require('../controllers/registerLand');


router.post('/create', LandRegisterController.create);
router.get('/query', LandRegisterController.query);

module.exports = router;
