"use strict";

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');
const LandRegisterController = require('../controllers/registerLand');


router.post('/create', LandRegisterController.create);

module.exports = router;
