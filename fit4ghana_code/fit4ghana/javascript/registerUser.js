/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, '../../first-network');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

async function main() {

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    try {
        //Registering CLS Client to the system
        // Check to see if we've already enrolled the CLS.
        const userExists = await wallet.exists('cls');
        if (userExists) {
            console.log('An identity for the user "CLS" already exists in the wallet');
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists('admin');
        if (!adminExists) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: false } });

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({ affiliation: 'org1.department1', enrollmentID: 'cls', role: 'client' }, adminIdentity); //TO Check : department1?
        const enrollment = await ca.enroll({ enrollmentID: 'cls', enrollmentSecret: secret });
        const userIdentity = X509WalletMixin.createIdentity('Org1MSP', enrollment.certificate, enrollment.key.toBytes());
        wallet.import('cls', userIdentity);
        console.log('Successfully registered and enrolled admin user "CLS" and imported it into the wallet');

    } catch (error) {
        console.error(`Failed to register user "CLS": ${error}`);
        process.exit(1);
    }

    try {

        // Check to see if we've already enrolled the LC.
        const userExists = await wallet.exists('lc');
        if (userExists) {
            console.log('An identity for the user "LC" already exists in the wallet');
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists('admin');
        if (!adminExists) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: false } });

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({ affiliation: 'org2.department1', enrollmentID: 'lc', role: 'client' }, adminIdentity);
        const enrollment = await ca.enroll({ enrollmentID: 'lc', enrollmentSecret: secret });
        const userIdentity = X509WalletMixin.createIdentity('Org2MSP', enrollment.certificate, enrollment.key.toBytes());
        wallet.import('lc', userIdentity);
        console.log('Successfully registered and enrolled admin user "LC" and imported it into the wallet');

    } catch (error) {
        console.error(`Failed to register user "LC": ${error}`);
        process.exit(1);
    }

    try {

        // Check to see if we've already enrolled the chief.
        const userExists = await wallet.exists('chief');
        if (userExists) {
            console.log('An identity for the user "CHIEF" already exists in the wallet');
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists('admin');
        if (!adminExists) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: false } });

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({ affiliation: 'org3.department1', enrollmentID: 'chief', role: 'client' }, adminIdentity);
        const enrollment = await ca.enroll({ enrollmentID: 'chief', enrollmentSecret: secret });
        const userIdentity = X509WalletMixin.createIdentity('Org3MSP', enrollment.certificate, enrollment.key.toBytes());
        wallet.import('chief', userIdentity);
        console.log('Successfully registered and enrolled admin user "CHIEF" and imported it into the wallet');

    } catch (error) {
        console.error(`Failed to register user "CHIEF": ${error}`);
        process.exit(1);
    }

    try {
        
        // Check to see if we've already enrolled the Family Head.
        const userExists = await wallet.exists('familyHead');
        if (userExists) {
            console.log('An identity for the user "familyHead" already exists in the wallet');
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists('admin');
        if (!adminExists) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: false } });

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({ affiliation: 'org4.department1', enrollmentID: 'familyHead', role: 'client' }, adminIdentity);
        const enrollment = await ca.enroll({ enrollmentID: 'familyHead', enrollmentSecret: secret });
        const userIdentity = X509WalletMixin.createIdentity('Org4MSP', enrollment.certificate, enrollment.key.toBytes());
        wallet.import('familyHead', userIdentity);
        console.log('Successfully registered and enrolled admin user "familyHead" and imported it into the wallet');

    } catch (error) {
        console.error(`Failed to register user "familyHead": ${error}`);
        process.exit(1);
    }

    try {
        
        // Check to see if we've already enrolled the Buyer.
        const userExists = await wallet.exists('buyer');
        if (userExists) {
            console.log('An identity for the user "buyer" already exists in the wallet');
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists('admin');
        if (!adminExists) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: false } });

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({ affiliation: 'org4.department1', enrollmentID: 'buyer', role: 'client' }, adminIdentity);
        const enrollment = await ca.enroll({ enrollmentID: 'buyer', enrollmentSecret: secret });
        const userIdentity = X509WalletMixin.createIdentity('Org4MSP', enrollment.certificate, enrollment.key.toBytes());
        wallet.import('buyer', userIdentity);
        console.log('Successfully registered and enrolled admin user "buyer" and imported it into the wallet');

    } catch (error) {
        console.error(`Failed to register user "buyer": ${error}`);
        process.exit(1);
    }
}

main();
