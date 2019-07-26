/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', 'first-network', 'connection-org1.json');

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
        await gateway.connect(ccpPath, { wallet, identity: 'familyMember',  discovery: { enabled: true, asLocalhost: true }});

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar1');

        // Submit the specified transaction.
        // createLand transaction - requires 4 argument, ex: ('landNumber', 'coords', 'isForSale=false', 'price')
       
        console.log('We will create two lands here LAND0 and LAND1');

        // land 1 : statutory

        await contract.submitTransaction('createLand', 'LAND0', 'coords2' , 'false' , '2000');  //This takes literal values. Should find out a way for it to take values from console
        console.log('Transaction createLand has been submitted for land0');

        // land 1 : customary

        await contract.submitTransaction('createLand', 'LAND1', 'coords1' , 'false' , '1000');  //This takes literal values. Should find out a way for it to take values from console
        console.log('Transaction createLand has been submitted for land1');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
