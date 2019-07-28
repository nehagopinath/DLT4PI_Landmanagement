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
    var user = req.params.user;
    var approver = req.params.approver;
    var registrationType = req.params.registrationType;
    var chief = req.params.chief;
    var coords = req.params.coords;
    var price = req.params.price;
    var requestNumber = Math.random().toString(36).substr(2, 9).toString();
    var landNumber = Math.random().toString(36).substr(2, 9).toString();
    
    let userExists = await wallet.exists(user);
    if (!userExists) {
        console.log('An identity for the user' + user + 'does not exist in the wallet');
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

    const gateway = new Gateway();
    await gateway.connect(ccp, {wallet, identity: user, discovery: {enabled: true, asLocalhost: true}});

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('land');

    console.log('land will be created.');
    console.log('land Number:' + landNumber);
    console.log('land coords:' + coords);
    console.log('land price:' + price.toString());
    


    await contract.submitTransaction('createLand', landNumber, coords, 'false', price.toString());

    console.log('land created.');

    if (registrationType == 'statutory') {
        console.log('land is statutory.');

        await contract.submitTransaction('createRegistrationRequest', requestNumber, user,
        registrationType, chief, 'null', approver, landNumber);
        console.log('done.');

        // res.end('done');
    }
    else if (registrationType == 'customary') {
        console.log('land is customary.');
        await contract.submitTransaction('createRegistrationRequest', requestNumber, user,
        registrationType, chief, approver, 'null', landNumber);
        console.log('done.');
    }
    else {
        console.log('Land needs to be either statutory or customary');
    }
    
    res.send({result: 'done'});
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
 const reject = asyncMiddleware(async (req, res) => {
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

     await contract.submitTransaction('rejectRegistrationRequest', requestNumber, approver);
    
     // Disconnect from the gateway.
     await gateway.disconnect();
 });

module.exports = {
    create,
    approve,
    reject
};
