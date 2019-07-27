"use strict";

const express        = require('express');
const router         = express.Router();

const LandRegisterController = require('../controllers/registerLand');
const RequestController = require('../controllers/requestController')
const LandController = require('../controllers/landController')

//e.g.: create/familymember/statutory/chief/cls
//Endpoint - Create Landregistrationrequest for landtype; Send to chief and approver 
router.post('/create/:user/:landtype/:chief/:approver', LandRegisterController.create);

//Endpoint - Show all RegistrationRequest awatingi for approve from Approver 
router.get('/getAllRegistrationRequestAwating/:approver', RequestController.query);
//Endpoint - Show all SellBuyRequest awatingi for approve from Approver 
router.get('/getAllSellBuyRequestAwating/:approver', RequestController.queryBuySell);

//Endpoint - Query all Land which belongs to user
router.get('/queryLand/:user', LandController.query);
//Endpoint - Query all LAnd which is for sale (don't necessarily belong to user)
router.get('/queryLandForSale/:user', LandController.queryForSale);
//Endpoint - Punt Land with given landnumber for sale
router.post('/putForSale/:landnumber', LandController.putForSale);
//Endpoint - Withdraw Land with given landnumber from sale
router.post('/withDrawLandFromSale/:landnumber', LandController.withdrawFromSale);
//Endpoint -  Finally Register land with landnumber as registrationtype to user
// this should be called registerLand then and we don't need this here as registerLand transaction is invoked by the chaincode
router.post('/requestLandRegistration/:landnumber/:registrationType/:user', LandController.register);
//Endpoint - Request Landtransaction of land with landnumber with seller, buyer and price
router.post('/requestLandTransaction/:landnumber/:seller/:buyer/:price', LandController.transact);

module.exports = router;