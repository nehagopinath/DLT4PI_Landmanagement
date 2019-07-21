/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, '../../first-network');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

//same as transact land and changing Land Owner
//add methods to get approvals 
async function main() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        //familyMember is the only person who can sell the land
        // Check to see if we've already enrolled the familyMember.
        const userExists = await wallet.exists('familyMember');
        if (!userExists) {
            console.log('An identity for the user "familyMember" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'familyMember', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('fit4ghana');

        // Get the contract from the network.
        const contract = network.getContract('fit4ghana');

        // Submit the specified transaction.
        // transactLand transaction - requires 3 argument, ex: ('seller', 'buyer', 'price')

        // Steps
        // 1. Create BuysellRequest (100) (statutory) for land 999
        // 2. Approve statutory buy sell request by land commission
        // 3. Above automatically calls transactLand Transaction
        // 4. Get status of Land 999 Asset now : owner should be externalMember

        // Step 1
        // ctx, requestNumber, seller, buyer, price,
        // registrationType, familyMember, cls, landCommission, landNumber
        await contract.submitTransaction('createBuySellRequest', 101, 'familyMember', 'externalMember',
        'statutory', null, null, 'lc', 999);  //This takes literal values. Should find out a way for it to take values from console
        console.log('Transaction for creating Buy Sell Request has been created.');

        // Step 2
        await contract.submitTransaction('approveBuySellRequest', 101, 'lc');
        console.log('Transaction for approving buy sell request by land commission.');

        // Step 3
        // Automatically done by Step 2

        // Step 4
        const land = await contract.evaluateTransaction('queryLand', 999);
        console.log(`Current state of land: ${land.toString()}`);

       
        console.log('All transactions successful');


        // await contract.submitTransaction('transactLand', 'seller', 'buyer', 'price');  //This takes literal values. Should find out a way for it to take values from console
        // console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
