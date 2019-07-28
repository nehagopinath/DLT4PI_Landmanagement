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


// Get Registration Request 
const query = asyncMiddleware(async (req, res) => {
    var approver = req.params.approver;
    
    const userExists = await wallet.exists(approver);
    if (!userExists) {
        console.log('An identity for the user' + approver + 'does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {wallet, identity: approver, discovery: {enabled: true, asLocalhost: true}});

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('land');

    const result = await contract.evaluateTransaction('queryRegistrationRequestsAwaiting', approver); 
    res.send(result);
    
    // Disconnect from the gateway.
    await gateway.disconnect();
});

// Get Buy_Sell Request 
const queryBuySell = asyncMiddleware(async (req, res) => {
    var approver = req.params.approver;
    
    const userExists = await wallet.exists(approver);
    if (!userExists) {
        console.log('An identity for the user' + approver + 'does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {wallet, identity: approver, discovery: {enabled: true, asLocalhost: true}});

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('land');

    const result = await contract.evaluateTransaction('queryAllBuySellRequestsAwaiting', approver); 
    res.send(result);
    
    // Disconnect from the gateway.
    await gateway.disconnect();
});


module.exports = {
    query,
    queryBuySell
};
