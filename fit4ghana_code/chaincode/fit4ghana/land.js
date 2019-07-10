/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Land extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const lands = [
            {
                owner: 'person1',
                ownershipType: 'statutory',
                coords: '1.1.2.4',
                isForSale: false,
                price: 20000
            },
            {
                owner: 'person2',
                ownershipType: 'statutory',
                coords: '3.1.2.4',
                isForSale: false,
                price: 20000
            },
            {
                owner: 'person3',
                ownershipType: 'customary',
                coords: '2.1.2.4',
                isForSale: false,
                price: 20000
            },
            {
                owner: 'person4',
                ownershipType: 'customary',
                coords: '1.3.2.4',
                isForSale: false,
                price: 20000
            }
        ];

        for (let i = 0; i < lands.length; i++) {
            lands[i].docType = 'land';
            await ctx.stub.putState('LAND' + i, Buffer.from(JSON.stringify(lands[i])));
            console.info('Added <--> ', lands[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryLand(ctx, landNumber) {
        const landAsBytes = await ctx.stub.getState(landNumber); // get the land from chaincode state
        if (!landAsBytes || landAsBytes.length === 0) {
            throw new Error(`${landNumber} does not exist`);
        }
        console.log(landAsBytes.toString());
        return landAsBytes.toString();
    }

    async createLand(ctx, landNumber, ownershipType, owner, coords, isForSale=false, price) {
        console.info('============= START : Create Land ===========');

        const land = {
            docType: 'land',
            owner,
            ownershipType,
            coords,
            isForSale,
            price
        };

        await ctx.stub.putState(landNumber, Buffer.from(JSON.stringify(land)));
        console.info('============= END : Create Land ===========');
    }

    async queryAllLands(ctx) {
        const startKey = 'LAND0';
        const endKey = 'LAND999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async changeLandOwner(ctx, landNumber, newOwner) {
        console.info('============= START : changeLandOwner ===========');

        const landAsBytes = await ctx.stub.getState(landNumber); // get the land from chaincode state
        if (!landAsBytes || landAsBytes.length === 0) {
            throw new Error(`${landNumber} does not exist`);
        }
        const land = JSON.parse(landAsBytes.toString());
        land.owner = newOwner;

        await ctx.stub.putState(landNumber, Buffer.from(JSON.stringify(land)));
        console.info('============= END : changeLandOwner ===========');
    }

    async putLandUpForSale(ctx, landNumber) {
        console.info('============= START : Putting Land up for sale ===========');

        const landAsBytes = await ctx.stub.getState(landNumber); // get the land from chaincode state
        if (!landAsBytes || landAsBytes.length === 0) {
            throw new Error(`${landNumber} does not exist`);
        }
        const land = JSON.parse(landAsBytes.toString());
        land.isForSale = true;

        await ctx.stub.putState(landNumber, Buffer.from(JSON.stringify(land)));
        console.info('============= END : Land up for sale ===========');
    }

    async withdrawLandFromSale(ctx, landNumber) {
        console.info('============= START : Withdraw Land from sale ===========');

        const landAsBytes = await ctx.stub.getState(landNumber); // get the land from chaincode state
        if (!landAsBytes || landAsBytes.length === 0) {
            throw new Error(`${landNumber} does not exist`);
        }
        const land = JSON.parse(landAsBytes.toString());
        land.isForSale = false;

        await ctx.stub.putState(landNumber, Buffer.from(JSON.stringify(land)));
        console.info('============= END : Land not anymore for sale ===========');
    }

    async registerLand(ctx, claimer, registrationType) {
        console.info('============= START : registerLand ===========');

        const landAsBytes = await ctx.stub.getState(landNumber); // get the land from chaincode state
        if (!landAsBytes || landAsBytes.length === 0) {
            throw new Error(`${landNumber} does not exist`);
        }
        const land = JSON.parse(landAsBytes.toString());
        land.owner = claimer;
        land.registrationType = registrationType;

        await ctx.stub.putState(landNumber, Buffer.from(JSON.stringify(land)));
        console.info('============= END : registerLand ===========');
    }

    async transactLand(ctx, seller, buyer, price) {
        console.info('============= START : registerLand ===========');

        const landAsBytes = await ctx.stub.getState(landNumber); // get the land from chaincode state
        if (!landAsBytes || landAsBytes.length === 0) {
            throw new Error(`${landNumber} does not exist`);
        }
        const land = JSON.parse(landAsBytes.toString());
        land.isForSale = false;
        land.owner = buyer;

        await ctx.stub.putState(landNumber, Buffer.from(JSON.stringify(land)));
        console.info('============= END : registerLand ===========');
    }
    

}

module.exports = Land;
