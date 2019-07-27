/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..','..','first-network','connection-org1.json');

async function main() {
    try{
        var requestNumber =  process.argv[2];
        var claimer =  process.argv[3];
        var registrationType =  process.argv[4];
        var chief =  process.argv[5];
        var cls =  process.argv[6];
        var landCommission =  process.argv[7];
        var landNumber =  process.argv[8];

    } catch(error) {
        console.error("Add landnumber,coords,isForSale,price to execution command. e.g.: node registerLand.js 'REQUEST10' 'familyMember' 'customary' 'chief' 'cls' 'null' 'LAND10' ");
    } 

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
        const contract = network.getContract('land');

        // Submit the specified transaction.
        console.log('Registering the land');

       /* Steps
        1. Create RegistrationRequest (Customary)
        2. Approve customary request by chief
        3. Approve customary request by CLS
        4. Above automatically calls registerLand Transaction
        5. Get status of Land Asset now : owner should be familyMember */

        // Step 1
       
        await contract.submitTransaction('createRegistrationRequest', requestNumber, claimer,registrationType, chief,cls, landCommission, landNumber);  
        console.log('Transaction for creating Registration Request has been created.');

        // Step 2
        await contract.submitTransaction('approveRegistrationRequest', requestNumber, chief);
        console.log('Transaction for approving registration request by chief');
        
        // Step 3
        await contract.submitTransaction('approveRegistrationRequest', requestNumber, cls);
        console.log('Transaction for approving registration request by cls'); 

        // Step 4
        //await contract.submitTransaction('registerLand', landNumber, claimer, registrationType);
        console.log('Registering the land'); 

        // Step 5
        //land = await contract.evaluateTransaction('queryLand',landNumber);
        //console.log(`Current state of land: ${land.toString()}`);

        console.log('All transactions successful');

        // Disconnect from the gateway.
        await gateway.disconnect();


    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
