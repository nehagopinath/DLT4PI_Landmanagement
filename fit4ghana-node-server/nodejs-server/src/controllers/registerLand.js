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

    const userExists = await wallet.exists('familyMember');
    if (!userExists) {
        console.log('An identity for the user "familyMember" does not exist in the wallet');
        console.log('Register user before retrying');
    }

    let id = req.params.id;
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


// QUERY LAND
const query = asyncMiddleware(async (req, res) => {
    // Check to see if we've already enrolled the CLS.
    const userExists1 = await wallet.exists('cls');
    if (!userExists1) {
        console.log('An identity for the user "CLS" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
    }

    // Check to see if we've already enrolled the LC.
    const userExists2 = await wallet.exists('lc');
    if (!userExists2) {
        console.log('An identity for the user "LC" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
    }

    // Check to see if we've already enrolled the user.
    const userExists3 = await wallet.exists('chief');
    if (!userExists3) {
        console.log('An identity for the user "chief" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
    }

    // Check to see if we've already enrolled the user.
    const userExists4 = await wallet.exists('familyMember');
    if (!userExists4) {
        console.log('An identity for the user "familyMember" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
    }

    if ("caller of this method" === cls) {       //check how to check the identity of the person calling this method

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'cls', discovery: { enabled: false } });

    }

    if ("caller of this method" === lc) {       //check how to check the identity of the person calling this method

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'lc', discovery: { enabled: false } });

    }

    if ("caller of this method" === chief) {       //check how to check the identity of the person calling this method

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'chief', discovery: { enabled: false } });

    }

    if ("caller of this method" === familyHead) {       //check how to check the identity of the person calling this method

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'familyHead', discovery: { enabled: false } });

    }

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('fit4ghana');

    // Get the contract from the network.
    const contract = network.getContract('fit4ghana');

    // Evaluate the specified transaction.
    // queryCar transaction - requires 1 argument, ex: ('queryCar', 'landNumber')
    // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
    const result = await contract.evaluateTransaction('queryLand','landNumber');  //This takes literal values. Should find out a way for it to take values from console
    console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
});


module.exports = {
    create,
    query
};
