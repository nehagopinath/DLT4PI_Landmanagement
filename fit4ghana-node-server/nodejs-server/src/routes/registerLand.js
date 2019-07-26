"use strict";

const express        = require('express');
const router         = express.Router();

const LandRegisterController = require('../controllers/registerLand');
const RequestController = require('../controllers/requestController')
const LandController = require('../controllers/landController')

//e.g.: create/familymember/statutory/chief/cls
router.post('/create/:user/:landtype/:chief/:approver', LandRegisterController.create);

router.get('/getAllRegistrationRequestAwating/:approver', RequestController.query);
router.get('/getAllSellBuyRequestAwating/:approver', RequestController.queryBuySell);

router.get('/queryLand/:user', LandController.query);
router.get('/queryLandForSale/:user', LandController.queryForSale);
router.post('/putForSale/:landnumber', LandController.putForSale);
router.post('/withDrawLandFromSale/:landnumber', LandController.withdrawFromSale);
router.post('/requestLandRegistration/:landnumber/:registrationType/:user', LandController.register);
router.post('/requestLandTransaction/:landnumber/:seller/:buyer/:price', LandController.transact);

module.exports = router;