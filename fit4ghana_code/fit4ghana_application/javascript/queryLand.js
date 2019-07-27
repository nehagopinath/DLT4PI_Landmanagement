/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..','..','first-network','connection-org1.json');

async function main() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the CLS.
        const userExists = await wallet.exists('cls');
        if (!userExists) {
            console.log('An identity for the user "CLS" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        /*// Check to see if we've already enrolled the LC.
        const userExists = await wallet.exists('lc');
        if (!userExists) {
            console.log('An identity for the user "LC" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('chief');
        if (!userExists) {
            console.log('An identity for the user "chief" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('familyMember');
        if (!userExists) {
            console.log('An identity for the user "familyMember" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        } */

        //if ("caller of this method" === cls) {       //check how to check the identity of the person calling this method

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccpPath, { wallet, identity: 'cls', discovery: { enabled: true, asLocalhost: true }});

        //}

        /*if ("caller of this method" === lc) {       //check how to check the identity of the person calling this method

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccpPath, { wallet, identity: 'lc', discovery: { enabled: true, asLocalhost: true }});

        }

        if ("caller of this method" === chief) {       //check how to check the identity of the person calling this method

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccpPath, { wallet, identity: 'chief', discovery: { enabled: true, asLocalhost: true }});

        }

        if ("caller of this method" === familyHead) {       //check how to check the identity of the person calling this method

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccpPath, { wallet, identity: 'familyHead', discovery: { enabled: true, asLocalhost: true }});

        } */

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('land');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'landNumber')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryAllLands');  //This takes literal values. Should find out a way for it to take values from console
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();
