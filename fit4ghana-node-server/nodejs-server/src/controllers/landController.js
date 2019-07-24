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


// putUpForSale LAND
const putForSale = asyncMiddleware(async (req, res) => {
    var landNumber = req.params.landNumber;
    var user = req.params.user;
  
    const userExists = await wallet.exists(user);
    if (!userExists) {
        console.log('An identity for the user' + user + 'does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {wallet, identity: user, discovery: {enabled: false}});

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('fit4ghana');

    // Get the contract from the network.
    const contract = network.getContract('fit4ghana');

    await contract.submitTransaction('putLandUpForSale', landNumber);
    
    // Disconnect from the gateway.
    await gateway.disconnect();
});

// Withdraw LAND
const withdrawFromSale = asyncMiddleware(async (req, res) => {
    var landNumber = req.params.landNumber;
    var user = req.params.user;
  
    const userExists = await wallet.exists(user);
    if (!userExists) {
        console.log('An identity for the user' + user + 'does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {wallet, identity: user, discovery: {enabled: false}});

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('fit4ghana');

    // Get the contract from the network.
    const contract = network.getContract('fit4ghana');

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

    const userExists = await wallet.exists(seller);
    if (!userExists) {
        console.log('An identity for the user' + seller + 'does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const userExists = await wallet.exists(buyer);
    if (!userExists) {
        console.log('An identity for the user' + buyer + 'does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {wallet, identity: user, discovery: {enabled: false}});

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('fit4ghana');

    // Get the contract from the network.
    const contract = network.getContract('fit4ghana');

    await contract.submitTransaction('transactLand', landNumber, seller, buyer, price);
    
    // Disconnect from the gateway.
    await gateway.disconnect();
});

// Register Land
const register = asyncMiddleware(async (req, res) => {
    var landNumber = req.params.landNumber;
    var registrationType = req.params.registrationType;
    var user = reg.params.user;

    const userExists = await wallet.exists(user);
    if (!userExists) {
        console.log('An identity for the user ' + user + ' does not exist in the wallet');
        console.log('Register user before retrying');
    }
  
    const gateway = new Gateway();
    await gateway.connect(ccp, {wallet, identity: user, discovery: {enabled: false}});

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('fit4ghana');

    // Get the contract from the network.
    const contract = network.getContract('fit4ghana');

    await contract.submitTransaction('registerLand', landNumber, user, registrationType);
    
    // Disconnect from the gateway.
    await gateway.disconnect();
});

// QUERY LAND
const query = asyncMiddleware(async (req, res) => {
    var user = reg.params.user;

    const userExists = await wallet.exists(user);
    if (!userExists) {
        console.log('An identity for the user ' + user + ' does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: user, discovery: { enabled: false } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('fit4ghana');

    // Get the contract from the network.
    const contract = network.getContract('fit4ghana');

    const result = await contract.evaluateTransaction('queryUsersLands', user); 
    res.send(result);
    console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
});

// QUERY LAND FOR SALE
const queryForSale = asyncMiddleware(async (req, res) => {
    var user = reg.params.user;

    const userExists = await wallet.exists(user);
    if (!userExists) {
        console.log('An identity for the user ' + user + ' does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: user, discovery: { enabled: false } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('fit4ghana');

    // Get the contract from the network.
    const contract = network.getContract('fit4ghana');

    const result = await contract.evaluateTransaction('queryLandsForSale'); 
    res.send(result);
    console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
});

module.exports = {
    putForSale,
    withdrawFromSale,
    transact,
    register,
    query,
    queryForSale
};
