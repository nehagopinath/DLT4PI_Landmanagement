/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..','..','first-network','connection-org1.json');

//putting land up for sale can be done only be the familyMember
async function main() {
    try {
        /*try{
            var landnumber =  process.argv[2];
        } catch(error) {
            console.error('Add landnumber to execution command. e.g.: node putLandUpForSale.js 123')
        } */


        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        //Family Member is the only person who can register the land
        // Check to see if we've already enrolled the Family Member.
        const userExists = await wallet.exists('familyMember');
        if (!userExists) {
            console.log('An identity for the user "familyMember" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'familyMember',discovery: { enabled: true, asLocalhost: true }});

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar1');

        // Submit the specified transaction.
        // putLandUpForSale transaction - requires 1 argument, ex: ('landNumber')
       
        await contract.submitTransaction('putLandUpForSale', 'LAND0');  
        console.log('Transaction putLandUpForSale has been submitted for land LAND0');

        await contract.submitTransaction('putLandUpForSale', 'LAND1');  
        console.log('Transaction putLandUpForSale has been submitted for land LAND1');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
