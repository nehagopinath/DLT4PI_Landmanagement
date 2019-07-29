"use strict";

const express        = require('express');
const router         = express.Router();

const LandRegisterController = require('../controllers/registerController');
const RequestController = require('../controllers/requestController')
const LandController = require('../controllers/landController')
const UserController = require('../controllers/userController.js')

//e.g.: create/familymember/statutory/chief/cls
//Endpoint - Create Landregistrationrequest for landtype; Send to chief and approver 
router.post('/create/:user/:registrationType/:chief/:approver/:coords/:price', LandRegisterController.create);
//Endpoint - Approve Landregistationrequest with Requestnumber by approver
router.post('/approveregistrationrequest/:requestnumber/:approver',LandRegisterController.approve);
//Endpoint - Reject Landregistationrequest with Requestnumber by approver
router.post('/rejectregistrationrequest/:requestnumber/:approver',LandRegisterController.reject);

//Endpoint - Show all RegistrationRequest awatingi for approve from Approver 
router.get('/getAllRegistrationRequestAwating/:approver', RequestController.query);
//Endpoint - Show all SellBuyRequest awatingi for approve from Approver 
router.get('/getAllSellBuyRequestAwating/:approver', RequestController.queryBuySell);

//Endpoint - Query all Land which belongs to user
router.get('/queryLand/:user', LandController.query);
//Endpoint - Query all LAnd which is for sale (don't necessarily belong to user)
router.get('/queryLandForSale/:user', LandController.queryForSale);
//Endpoint - Punt Land with given landnumber for sale
router.post('/putForSale/:landNumber/:user', LandController.putForSale);
//Endpoint - Withdraw Land with given landnumber from sale
router.post('/withDrawLandFromSale/:landNumber/:user', LandController.withdrawFromSale);
//Endpoint -  Finally Register land with landnumber as registrationtype to user
// this should be called registerLand then and we don't need this here as registerLand transaction is invoked by the chaincode
//router.post('/requestLandRegistration/:landnumber/:registrationType/:user', LandController.register);
//Endpoint - Request Landtransaction of land with landnumber with seller, buyer and price
router.post('/requestLandTransaction/:landNumber/:seller/:buyer/:price', LandController.transact);
//Endpoint - Approve Buy - Sell Request by approver
router.post('/approveBuySellRequest/:requestNumber/:approver', LandController.approve);
//Endpoint - Reject Buy - Sell Request by approver 
router.post('/rejectBuySellRequest/:requestNumber/:approver', LandController.reject)

//Endpoint - Create BuySellRequest for  
router.post('/createBuySell/:seller/:buyer/:price/:registrationType/:approver/:landNumber', LandController.createBuySellRequest);

//Endpoint to get user by name
router.get('/getUser/:user', UserController.get)


module.exports = router;