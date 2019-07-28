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


// putUpForSale LAND
const putForSale = asyncMiddleware(async (req, res) => {
    var landNumber = req.params.landNumber;
    var user = req.params.user;
  
    let userExists = await wallet.exists(user);
    if (!userExists) {
        console.log('An identity for the user' + user + 'does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {wallet, identity: user, discovery: {enabled: true, asLocalhost: true}});

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('land');

    await contract.submitTransaction('putLandUpForSale', landNumber);
    
    // Disconnect from the gateway.
    await gateway.disconnect();
});

// Withdraw LAND
const withdrawFromSale = asyncMiddleware(async (req, res) => {
    var landNumber = req.params.landNumber;
    var user = req.params.user;
  
    let userExists = await wallet.exists(user);
    if (!userExists) {
        console.log('An identity for the user' + user + 'does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {wallet, identity: user, discovery: {enabled: true, asLocalhost: true}});

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('land');

    await contract.submitTransaction('withdrawLandFromSale', landNumber);
    
    // Disconnect from the gateway.
    await gateway.disconnect();
});

// Transact LAND
const transact = asyncMiddleware(async (req, res) => {
    var landNumber = req.params.landNumber;
    var seller = req.params.seller;
    var buyer = req.params.buyer;
    var price = req.params.price;

    let userExists = await wallet.exists(seller);
    if (!userExists) {
        console.log('An identity for the user' + seller + 'does not exist in the wallet');
        console.log('Register user before retrying');
    }

    userExists = await wallet.exists(buyer);
    if (!userExists) {
        console.log('An identity for the user' + buyer + 'does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {wallet, identity: user, discovery: {enabled: true, asLocalhost: true}});

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('land');

    await contract.submitTransaction('transactLand', landNumber, seller, buyer, price);
    
    // Disconnect from the gateway.
    await gateway.disconnect();
});

// Register Land
const register = asyncMiddleware(async (req, res) => {
    var landNumber = req.params.landNumber;
    var registrationType = req.params.registrationType;
    var user = req.params.user;

    const userExists = await wallet.exists(user);
    if (!userExists) {
        console.log('An identity for the user ' + user + ' does not exist in the wallet');
        console.log('Register user before retrying');
    }
  
    const gateway = new Gateway();
    await gateway.connect(ccp, {wallet, identity: user, discovery: {enabled: true, asLocalhost: true}});

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('land');
    
    await contract.submitTransaction('registerLand', landNumber, user, registrationType);
    
    // Disconnect from the gateway.
    await gateway.disconnect();
});

// QUERY LAND
const query = asyncMiddleware(async (req, res) => {
    var user = req.params.user;

    const userExists = await wallet.exists(user);
    if (!userExists) {
        console.log('An identity for the user ' + user + ' does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: user, discovery: { enabled: true, asLocalhost: true} });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('land');

    console.log('going to get all lands now!');

    const result = await contract.evaluateTransaction('queryAllLandsOwned', user); 
    res.send(result);
    console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
});

// QUERY LAND FOR SALE
const queryForSale = asyncMiddleware(async (req, res) => {
    var user = req.params.user;

    const userExists = await wallet.exists(user);
    if (!userExists) {
        console.log('An identity for the user ' + user + ' does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('land');

    contract.evaluateTransaction('queryAllLandsForSale').then(result => {
        let lands = [];

        console.log('getting all lands for user for sale ' + user);
        for(let land of result) {
            if (land.Record.owner === user) {
                lands.push(land);
            }
        }
        console.log(lands);
        res.send(lands);
        console.log(`Transaction has been evaluated, result is: ${lands.toString()}`);
    }); 
    
});

// Approve Request 
const approve = asyncMiddleware(async (req, res) => {
    var approver = req.params.approver;
    var requestNumber = req.params.requestNumber

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
    await gateway.connect(ccp, {wallet, identity: approver, discovery: {enabled: true, asLocalhost: true}});

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('land');

    await contract.submitTransaction('rejectBuySellRequest', requestNumber, approver);
    
    // Disconnect from the gateway.
    await gateway.disconnect();
});

module.exports = {
    putForSale,
    withdrawFromSale,
    transact,
    register,
    query,
    queryForSale,
    approve,
    reject
};
