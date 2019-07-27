"use strict";

const { FileSystemWallet, Gateway } = require('fabric-network');

const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, '../../../../fit4ghana_code/first-network/connection-org1.json');
console.log(ccpPath);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

const walletPath = path.resolve(__dirname, '../../../../fit4ghana_code/fit4ghana_application/javascript/wallet');
console.log(walletPath);
const wallet = new FileSystemWallet(walletPath);
console.log(`Wallet path: ${walletPath}`);


const asyncMiddleware = fn =>
    (req, res, next) => {
        Promise
            .resolve(fn(req, res, next))
            .catch((e) => {
                res.status(500);
                res.json({
                    success: false,
                    message: 'Server error has occured: ' + e
                });
            });
    };


// Register LAND
const create = asyncMiddleware(async (req, res) => {
    //var user = req.params.user;
    var registrationType = req.params.registrationType;
    var chief = req.params.chief;
    var cls = req.params.cls;
    var landCommission = req.params.landCommission;
    var claimer = req.params.claimer;
    var approver = req.params.approver;
    //var coords = req.params.coords;
    //var price = req.params.price;
    var requestNumber = Math.random().toString(36).substr(2, 9).toString();
    var landNumber = Math.random().toString(36).substr(2, 9).toString();
    

    let userExists = await wallet.exists(claimer);
    if (!userExists) {
        console.log('An identity for the user' + claimer + 'does not exist in the wallet');
        console.log('Register user before retrying');
    }

    userExists = await wallet.exists(approver);
    if (!userExists) {
        console.log('An identity for the user' + approver + 'does not exist in the wallet');
        console.log('Register user before retrying');
    }

    userExists = await wallet.exists(chief);
    if (!userExists) {
        console.log('An identity for the user' + chief + 'does not exist in the wallet');
        console.log('Register user before retrying');
    }

    userExists = await wallet.exists(landCommission);
    if (!userExists) {
        console.log('An identity for the user' + landCommission + 'does not exist in the wallet');
        console.log('Register user before retrying');
    }

    userExists = await wallet.exists(cls);
    if (!userExists) {
        console.log('An identity for the user' + cls + 'does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {wallet, identity: claimer, discovery: {enabled: true, asLocalhost: true}});

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('land');

    //await contract.submitTransaction('createLand', landNumber, coords, false, price);
    await contract.submitTransaction('createRegistrationRequest', requestNumber, claimer,registrationType, chief,cls, landCommission, landNumber);

    if (registrationType == 'statutory') {
        await contract.submitTransaction('createRegistrationRequest', requestNumber, claimer,
        registrationType, null, null, approver, landNumber);
    }
    else if (registrationType == 'customary') {
        await contract.submitTransaction('createRegistrationRequest', requestNumber, claimer,
        registrationType, approver, null, null, landNumber);
    }
    else {
        console.log('Land needs to be either statutory or customary')
    }
    
    // Disconnect from the gateway.
    await gateway.disconnect();
});

// Approve Request 
const approve = asyncMiddleware(async (req, res) => {
    var approver = req.params.approver;
    var requestNumber = req.params.requestnumber

    const userExists = await wallet.exists(approver);
    if (!userExists) {
        console.log('An identity for the user ' + approver + ' does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {wallet, identity: approver, discovery: {enabled: true, asLocalhost: true}});

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('land');

    await contract.submitTransaction('approveRegistrationRequest', requestNumber, approver);
    
    // Disconnect from the gateway.
    await gateway.disconnect();
});

// Reject Request 
// const reject = asyncMiddleware(async (req, res) => {
//     var approver = req.params.approver;
//     var requestNumber = req.params.requestnumber

//     const userExists = await wallet.exists(approver);
//     if (!userExists) {
//         console.log('An identity for the user ' + approver + ' does not exist in the wallet');
//         console.log('Register user before retrying');
//     }

//     const gateway = new Gateway();
//     await gateway.connect(ccp, {wallet, identity: approver, discovery: {enabled: true, asLocalhost: true}});

//     // Get the network (channel) our contract is deployed to.
//     const network = await gateway.getNetwork('mychannel');

//     // Get the contract from the network.
//     const contract = network.getContract('land');

//     await contract.submitTransaction('rejectRegistrationRequest', requestNumber, approver);
    
//     // Disconnect from the gateway.
//     await gateway.disconnect();
// });

module.exports = {
    create,
    approve,
    reject
};
