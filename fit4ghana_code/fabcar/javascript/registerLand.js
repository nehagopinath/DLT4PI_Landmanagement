/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..','..','first-network','connection-org1.json');
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
            console.log('An identity for the user "familyMember" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'familyMember', discovery: { enabled: true, asLocalhost: true }});

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar1');

        // Submit the specified transaction.
       

        console.log('Registering the first land - LAND0 as a statutory land');

        // Steps
        // 1. Create RegistrationRequest (100) (statutory) for land 999
        // 2. Approve statutory request by land commission
        // 3. Above automatically calls registerLand Transaction
        // 4. Get status of Land 999 Asset now : owner should be familyMember

        // Step 1
        // ctx, requestNumber, claimer,
        // registrationType, chief, cls, landCommission, landNumber
        await contract.submitTransaction('registerLand', 'LAND0', 'Neha','customary');  //This takes literal values. Should find out a way for it to take values from console
        console.log('Transaction for creating Registration Request has been created.');

        // Step 2
        //await contract.submitTransaction('approveRegistrationRequest', 100, 'lc');
        //console.log('Transaction for approving registration request by land commission.');

        // Step 3
        // Automatically done by Step 2

        // Step 4
        //const land = await contract.evaluateTransaction('queryLand', 999);
        //console.log(`Current state of land: ${land.toString()}`);


        

        //console.log('Registering the second land - 998 as a customary land');

        // Steps
        // 1. Create RegistrationRequest (100) (customary) for land 999
        // 2. Approve customary request by chief
        // 3. Approve customary request by CLS
        // 4. Above automatically calls registerLand Transaction
        // 5. Get status of Land 998 Asset now : owner should be familyMember

        // Step 1
        // ctx, requestNumber, claimer,
        // registrationType, chief, cls, landCommission, landNumber
        //await contract.submitTransaction('createRegistrationRequest', 101, 'familyMember',
        //'customary', 'chief', 'cls', null, 998);  //This takes literal values. Should find out a way for it to take values from console
        //console.log('Transaction for creating Registration Request has been created.');

        // Step 2
        //await contract.submitTransaction('approveRegistrationRequest', 101, 'chief');
        //console.log('Transaction for approving registration request by land commission.');
        
        // Step 3
        //await contract.submitTransaction('approveRegistrationRequest', 101, 'cls');
        //console.log('Transaction for approving registration request by land commission.');

        // Step 4
        // Automatically done by Step 3

        // Step 5
        //land = await contract.evaluateTransaction('queryLand', 998);
        //console.log(`Current state of land: ${land.toString()}`);

        //console.log('All transactions successful');





        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
