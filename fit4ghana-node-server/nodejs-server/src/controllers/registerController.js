"use strict";

const { FileSystemWallet, Gateway } = require('fabric-network');

const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, '../../../../fit4ghana_code/first-network/connection-org1.json');
console.log(ccpPath);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

const walletPath = path.resolve(__dirname, '../../../../fit4ghana_code/fit4ghana/javascript/wallet');
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
    var user = req.params.user;
    var landtype = req.params.landtype;
    var chief = req.params.chief;
    var approver = req.params.approver;
    var requestNumber = parseInt(Math.random().toString(36).substr(2, 9));
    var landNumber = parseInt(Math.random().toString(36).substr(2, 9));

    const userExists = await wallet.exists(user);
    if (!userExists) {
        console.log('An identity for the user' + user + 'does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const userExists = await wallet.exists(approver);
    if (!userExists) {
        console.log('An identity for the user' + approver + 'does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const userExists = await wallet.exists(chief);
    if (!userExists) {
        console.log('An identity for the user' + chief + 'does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {wallet, identity: user, discovery: {enabled: false}});

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('fit4ghana');

    // Get the contract from the network.
    const contract = network.getContract('fit4ghana');

    if (landtype == 'statutory') {
        await contract.submitTransaction('createRegistrationRequest', requestNumber, user,
        landtype, null, null, approver, landNumber);
    }
    else if (landtype == 'customary') {
        await contract.submitTransaction('createRegistrationRequest', requestNumber, user,
        landtype, chief, approver, null, landNumber);
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
    await gateway.connect(ccp, {wallet, identity: approver, discovery: {enabled: false}});

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('fit4ghana');

    // Get the contract from the network.
    const contract = network.getContract('fit4ghana');

    await contract.submitTransaction('approveBuySellRequest', requestNumber, approver);
    
    // Disconnect from the gateway.
    await gateway.disconnect();
});

// Reject Request 
const reject = asyncMiddleware(async (req, res) => {
    var approver = req.params.approver;
    var requestNumber = req.params.requestnumber

    const userExists = await wallet.exists(approver);
    if (!userExists) {
        console.log('An identity for the user ' + approver + ' does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {wallet, identity: approver, discovery: {enabled: false}});

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('fit4ghana');

    // Get the contract from the network.
    const contract = network.getContract('fit4ghana');

    await contract.submitTransaction('rejectBuySellRequest', requestNumber, approver);
    
    // Disconnect from the gateway.
    await gateway.disconnect();
});

module.exports = {
    create,
    approve,
    reject
};
