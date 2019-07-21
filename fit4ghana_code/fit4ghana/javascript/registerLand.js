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

//creating Land same as registering land?
//add methods to get approvals
async function main() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        //Family Head is the only person who can register the land
        // Check to see if we've already enrolled the Family Head.
        const userExists = await wallet.exists('familyMember');
        if (!userExists) {
            console.log('An identity for the user "familyHead" does not exist in the wallet');
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
        // createLand transaction - requires 6 argument, ex: ('landNumber', 'coords', 'isForSale=false', 'price')
       

        // Steps
        // 1. Create RegistrationRequest (100) (statutory) for land 999
        // 2. Approve statutory request by land commission
        // 3. Above automatically calls registerLand Transaction
        // 4. Get status of Land 999 Asset now

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

        console.log('All transactions successful');





        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
