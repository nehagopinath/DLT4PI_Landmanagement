"use strict";

const { FileSystemWallet, Gateway } = require('fabric-network');

const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, '../../../../fit4ghana_code/first-network/connection-org1.json');
console.log(ccpPath);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

const walletPath = path.resolve(__dirname, '../../../../fit4ghana_code/fit4ghana_application/javascript/wallet');
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


// Get Identity 
const get = asyncMiddleware(async (req, res) => {

    var name = req.params.user;
 
    const userExists = await wallet.exists(name);
    if (!userExists) {
        console.log('An identity for the user' + name + 'does not exist in the wallet');
        console.log('Register user before retrying');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {wallet, identity: name, discovery: {enabled: true, asLocalhost: true}});

    // Get the network (channel) our contract is deployed to.
    const client = await gateway.getClient();

    //console.log(client);

    const user = client.getUserContext(name).then(async user => {

        try {

        const result = user.getName();

        console.log(result);
    
        res.send({user: result});
        console.log(`User has been evaluated, identity is: ${result.toString()}`);

        // Disconnect from the gateway.
        await gateway.disconnect();  }

        catch(error) {console.log(error)}
        

    });
});

module.exports = {
    get
};
