"use strict";

const express        = require('express');
const router         = express.Router();

const LandRegisterController = require('../controllers/registerController');
const RequestController = require('../controllers/requestController')
const LandController = require('../controllers/landController')
const UserController = require('../controllers/userController.js')

//e.g.: create/familymember/statutory/chief/cls
//Endpoint - Create Landregistrationrequest for landtype; Send to chief and approver 
router.post('/create/:user/:landtype/:chief/:approver/:coords/:price', LandRegisterController.create);
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
router.post('/putForSale/:landnumber', LandController.putForSale);
//Endpoint - Withdraw Land with given landnumber from sale
router.post('/withDrawLandFromSale/:landnumber', LandController.withdrawFromSale);
//Endpoint -  Finally Register land with landnumber as registrationtype to user
// this should be called registerLand then and we don't need this here as registerLand transaction is invoked by the chaincode
router.post('/requestLandRegistration/:landnumber/:registrationType/:user', LandController.register);
//Endpoint - Request Landtransaction of land with landnumber with seller, buyer and price
router.post('/requestLandTransaction/:landnumber/:seller/:buyer/:price', LandController.transact);
//Endpoint - Approve Buy - Sell Request by approver
router.post('/approveBuySellRequest/:requestnumber/:approver', LandController.approve);
//Endpoint - Reject Buy - Sell Request by approver 
router.post('/rejectBuySellRequest/:requestnumber/:approver', LandController.reject)

//Endpoint to get user by name
router.get('/getUser/:user', async function(req, res) {
    var name = req.params.user;
    
    const userExists = await wallet.exists(user);
    if (!userExists) {
        console.log('An identity for the user' + user + 'does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {wallet, identity: user, discovery: {enabled: false}});

    // Get the network (channel) our contract is deployed to.
    const client = await gateway.getClient();

    const user = client.getUserContext(name);

    const result = user.getIdentity();

    res.send(result);
    console.log(`User has been evaluated, identity is: ${result.toString()}`);
    
    // Disconnect from the gateway.
    await gateway.disconnect();
})

//getUser

module.exports = router;