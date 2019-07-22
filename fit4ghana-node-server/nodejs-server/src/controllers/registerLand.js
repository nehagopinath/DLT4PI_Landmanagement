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

const create = asyncMiddleware(async (req, res) => {
    const userExists = await wallet.exists('familyMember');
    if (!userExists) {
        console.log('An identity for the user "familyMember" does not exist in the wallet');
        console.log('Register user before retrying');
    }

    let id = req.params.id;
    const gateway = new Gateway();
    await gateway.connect(ccp, {wallet, identity: 'familyMember', discovery: {enabled: false}});

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('fit4ghana');

    // Get the contract from the network.
    const contract = network.getContract('fit4ghana');

    console.log('Registering the first land - 999 as a statutory land');

    // Steps
    // 1. Create RegistrationRequest (100) (statutory) for land 999
    // 2. Approve statutory request by land commission
    // 3. Above automatically calls registerLand Transaction
    // 4. Get status of Land 999 Asset now : owner should be familyMember

    // Step 1
    // ctx, requestNumber, claimer,
    // registrationType, chief, cls, landCommission, landNumber
    await contract.submitTransaction('createRegistrationRequest', 100, 'familyMember',
        'statutory', null, null, 'lc', 999);  //This takes literal values. Should find out a way for it to take values from console
    console.log('Transaction for creating Registration Request has been created.');

    // Step 2
    await contract.submitTransaction('approveRegistrationRequest', 100, 'lc');
    console.log('Transaction for approving registration request by land commission.');

    // Step 3
    // Automatically done by Step 2

    // Step 4
    const land = await contract.evaluateTransaction('queryLand', 999);
    console.log(`Current state of land: ${land.toString()}`);


    console.log('Registering the second land - 998 as a customary land');

    // Steps
    // 1. Create RegistrationRequest (100) (customary) for land 999
    // 2. Approve customary request by chief
    // 3. Approve customary request by CLS
    // 4. Above automatically calls registerLand Transaction
    // 5. Get status of Land 998 Asset now : owner should be familyMember

    // Step 1
    // ctx, requestNumber, claimer,
    // registrationType, chief, cls, landCommission, landNumber
    await contract.submitTransaction('createRegistrationRequest', 101, 'familyMember',
        'customary', 'chief', 'cls', null, 998);  //This takes literal values. Should find out a way for it to take values from console
    console.log('Transaction for creating Registration Request has been created.');

    // Step 2
    await contract.submitTransaction('approveRegistrationRequest', 101, 'chief');
    console.log('Transaction for approving registration request by land commission.');

    // Step 3
    await contract.submitTransaction('approveRegistrationRequest', 101, 'cls');
    console.log('Transaction for approving registration request by land commission.');

    // Step 4
    // Automatically done by Step 3

    // Step 5
    const land1 = await contract.evaluateTransaction('queryLand', 998);
    console.log(`Current state of land: ${land1.toString()}`);

    console.log('All transactions successful');

    // Disconnect from the gateway.
    await gateway.disconnect();
});


module.exports = {
    create
};
