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

        //familyHead is the only person who can sell the land
        // Check to see if we've already enrolled the familyHead.
        const userExists = await wallet.exists('familyHead');
        if (!userExists) {
            console.log('An identity for the user "familyHead" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'familyHead', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('fit4ghana');

        // Get the contract from the network.
        const contract = network.getContract('fit4ghana');

        // Submit the specified transaction.
        // transactLand transaction - requires 3 argument, ex: ('seller', 'buyer', 'price')
       
        await contract.submitTransaction('transactLand', 'seller', 'buyer', 'price');  //This takes literal values. Should find out a way for it to take values from console
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
