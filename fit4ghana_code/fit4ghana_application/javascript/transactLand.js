/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..','..','first-network','connection-org1.json');


//same as transact land and changing Land Owner
//add methods to get approvals 
async function main() {

    try{
        var requestNumber =  process.argv[2];
        var seller =  process.argv[3];
        var buyer =  process.argv[4];
        var price =  process.argv[5];
        var registrationType =  process.argv[6];
        var cls =  process.argv[7];
        var landCommission =  process.argv[8];
        var landNumber =  process.argv[9];

    } catch(error) {
        console.error("Add landnumber,coords,isForSale,price to execution command. e.g.: node transactLand.js 'REQUEST11' 'familyMember' 'externalMember' '2000' 'customary' 'cls' 'null' 'LAND10' ");
    } 
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
        await gateway.connect(ccpPath, { wallet, identity: 'familyMember', discovery: { enabled: true, asLocalhost: true }});

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('land');

        // Submit the specified transaction.
        // transactLand transaction - requires 3 argument, ex: ('seller', 'buyer', 'price')
        
        console.log('Transacting the land');
        
        // Steps
        // 1. Create BuysellRequest
        // 2. Approve statutory buy sell request by cls
        // 3. Above automatically calls transactLand Transaction
        // 4. Get status of Land Asset now : owner should be externalMember

        // Step 1
        // ctx, requestNumber, seller, buyer, price,
        // registrationType, cls, landCommission, landNumber
        await contract.submitTransaction('createBuySellRequest', requestNumber, seller, buyer,price, registrationType, cls, landCommission,landNumber);  
        console.log('Transaction for creating Buy Sell Request has been created.');

        // Step 2
        await contract.submitTransaction('approveBuySellRequest', requestNumber, cls);
        console.log('Transaction for approving buy sell request by cls.');

        // Step 3
        // Automatically done by Step 2

        // Step 4
        /*const land = await contract.evaluateTransaction('queryLand', 998);
        console.log(`Current state of land: ${land.toString()}`); */

       
        console.log('All transactions successful');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
