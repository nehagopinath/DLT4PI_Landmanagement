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
                landNumber: 123,
                owner: 'person1',
                registrationType: 'statutory',
                coords: '1.1.2.4',
                isForSale: 'false',
                price: 20000
            },
            {
                landNumber: 456,
                owner: 'person2',
                registrationType: 'statutory',
                coords: '3.1.2.4',
                isForSale: 'false',
                price: 20000
            },
            {
                landNumber: 789,
                owner: 'person3',
                registrationType: 'customary',
                coords: '2.1.2.4',
                isForSale: 'true',
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

    // only creates land - no owner or registration type set yet
    async createLand(ctx, landNumber, coords, isForSale=false, price) {
        console.info('============= START : Create Land ===========');

        const land = {
            docType: 'land',
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

    async queryAllLandsOwned(ctx, owner) {
        const startKey = 'LAND0';
        const endKey = 'LAND999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value && JSON.parse(res.value.value.toString('utf8')).owner == owner) {

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
                
            }

            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async queryAllLandsForSale(ctx) {
        const startKey = 'LAND0';
        const endKey = 'LAND999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();
            if(res.value && res.value.value && JSON.parse(res.value.value.toString('utf8')).isForSale == 'true') {
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
        land.isForSale = 'true';

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
        land.isForSale = 'false';

        await ctx.stub.putState(landNumber, Buffer.from(JSON.stringify(land)));
        console.info('============= END : Land not anymore for sale ===========');
    }

    // registers land to a particular person with a registration type (customary / statutory)
    async registerLand(ctx, landNumber, claimer, registrationType) {
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

    async transactLand(ctx, landNumber, seller, buyer, price) {
        console.info('============= START : registerLand ===========');

        const landAsBytes = await ctx.stub.getState(landNumber); // get the land from chaincode state
        if (!landAsBytes || landAsBytes.length === 0) {
            throw new Error(`${landNumber} does not exist`);
        }
        const land = JSON.parse(landAsBytes.toString());
        land.isForSale = 'false';
        land.owner = buyer;

        await ctx.stub.putState(landNumber, Buffer.from(JSON.stringify(land)));
        console.info('============= END : registerLand ===========');
    }
    async queryRegistrationRequest(ctx, requestNumber) {
        const requestAsBytes = await ctx.stub.getState(requestNumber); // get the request from chaincode state
        if (!requestAsBytes || requestAsBytes.length === 0) {
            throw new Error(`${requestNumber} does not exist`);
        }
        console.log(requestAsBytes.toString());
        return requestAsBytes.toString();
    }
    async createRegistrationRequest(ctx, requestNumber, claimer,
        registrationType, chief, cls, landCommission, landNumber) {
        console.info('============= START : Create RegistrationRequest ===========');
        let request;
        if (registrationType === 'statutory') {
            request = {
                docType: 'registrationrequest',
                claimer,
                registrationType,
                currentlyAwaitingResponseFrom: 'landCommission',
                landCommission,
                responseFromLandCommission: null,
                status: 'pending',
                landNumber
            };
        } else if (registrationType === 'customary') {
            request = {
                docType: 'registrationrequest',
                claimer,
                registrationType,
                currentlyAwaitingResponseFrom: 'chief',
                chief,
                responseFromChief: null,
                cls,
                responseFromCLS: null,
                status: 'pending',
                landNumber
            };
        }

        await ctx.stub.putState(requestNumber, Buffer.from(JSON.stringify(request)));
        console.info('============= END : Create RegistrationRequest ===========');
    }
    async queryAllRegistrationRequests(ctx) {
        const startKey = 'RR0';
        const endKey = 'RR999';

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
    async approveRegistrationRequest(ctx, requestNumber, approver) {
        console.info('============= START : approveRegistrationRequest ===========');

        const requestAsBytes = await ctx.stub.getState(requestNumber); // get the request from chaincode state
        if (!requestAsBytes || requestAsBytes.length === 0) {
            throw new Error(`${requestNumber} does not exist`);
        }
        const request = JSON.parse(requestAsBytes.toString());

        // this means we allow somebody to approve only when the request 
        // is currently waiting his/her approval
        if (request.currentlyAwaitingResponseFrom === 'chief'
        && request.chief === approver) {
           request.responseFromChief = 'approved';
           request.currentlyAwaitingResponseFrom = 'cls';
        } else if (request.currentlyAwaitingResponseFrom === 'cls'
        && request.cls === approver) {
            request.responseFromCLS = 'approved';
            request.currentlyAwaitingResponseFrom = null;
            request.status = 'approved';  // approved for customary land
        } else if (request.currentlyAwaitingResponseFrom === 'landCommission'
         && request.landCommission === approver) {
            request.responseFromLandCommission = 'approved';
            request.currentlyAwaitingResponseFrom = null;
            request.status = 'approved';
        }

        if (request.status === 'approved') {
            await this.registerLand(ctx, request.landNumber, request.claimer, request.registrationType);
            // land.registerLand(request.claimer, request.registrationType);
        }
        await ctx.stub.putState(requestNumber, Buffer.from(JSON.stringify(request)));
        console.info('============= END : changeRegistrationRequestOwner ===========');
    }
    async rejectRegistrationRequest(ctx, requestNumber, approver) {
        console.info('============= START : rejectRegistrationRequest ===========');

        const requestAsBytes = await ctx.stub.getState(requestNumber); // get the request from chaincode state
        if (!requestAsBytes || requestAsBytes.length === 0) {
            throw new Error(`${requestNumber} does not exist`);
        }
        const request = JSON.parse(requestAsBytes.toString());

        // this means we allow somebody to approve only when the request 
        // is currently waiting his/her approval
        if (request.currentlyAwaitingResponseFrom === 'chief'
        && request.chief === approver) {
           request.responseFromChief = 'rejected';
           request.currentlyAwaitingResponseFrom = 'cls';
        } else if (request.currentlyAwaitingResponseFrom === 'cls'
        && request.cls === approver) {
            request.responseFromCLS = 'rejected';
            request.currentlyAwaitingResponseFrom = null;
            request.status = 'approved';  // approved for customary land
        } else if (request.currentlyAwaitingResponseFrom === 'landCommission'
         && request.landCommission === approver) {
            request.responseFromLandCommission = 'rejected';
            request.currentlyAwaitingResponseFrom = null;
            request.status = 'approved';
        }

        if (request.status === 'approved') {
            await this.registerLand(ctx, request.landNumber, request.claimer, request.registrationType);
            // land.registerLand(request.claimer, request.registrationType);
        }
        await ctx.stub.putState(requestNumber, Buffer.from(JSON.stringify(request)));
        console.info('============= END : changeRegistrationRequestOwner ===========');
    }
    async queryBuySellRequest(ctx, requestNumber) {
        const requestAsBytes = await ctx.stub.getState(requestNumber); // get the request from chaincode state
        if (!requestAsBytes || requestAsBytes.length === 0) {
            throw new Error(`${requestNumber} does not exist`);
        }
        console.log(requestAsBytes.toString());
        return requestAsBytes.toString();
    }
    async createBuySellRequest(ctx, requestNumber, seller, buyer, price,
        registrationType, cls, landCommission, landNumber) {
        console.info('============= START : Create BuySellRequest ===========');
        let request;
        if (registrationType === 'statutory') {
            request = {
                docType: 'buysellrequest',
                seller,
                buyer,
                price,
                registrationType,
                currentlyAwaitingResponseFrom: 'landCommission',
                landCommission,
                responseFromLandCommission: null,
                status: 'pending',
                landNumber
            };
        } else if (registrationType === 'customary') {
            request = {
                docType: 'buysellrequest',
                seller,
                buyer,
                price,
                registrationType,
                currentlyAwaitingResponseFrom: 'cls',
                cls,
                responseFromCLS: null,
                status: 'pending',
                landNumber
            };
        }

        await ctx.stub.putState(requestNumber, Buffer.from(JSON.stringify(request)));
        console.info('============= END : Create BuySellRequest ===========');
    }
    async queryAllBuySellRequests(ctx) {
        const startKey = 'BR0';
        const endKey = 'BR999';

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

    async queryRegistrationRequestsAwaiting(ctx, approver) {
        const startKey = 'RR0';
        const endKey = 'RR999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();
            console.info(res);
            if (res.value && res.value.value && JSON.parse(res.value.value.toString('utf8')).currentlyAwaitingResponseFrom == approver) {
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
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async queryAllBuySellRequestsAwaiting(ctx, approver) {
        const startKey = 'BR0';
        const endKey = 'BR999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if(res.value && res.value.value && JSON.parse(res.value.value.toString('utf8')).currentlyAwaitingResponseFrom == approver) {
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
            }

            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async approveBuySellRequest(ctx, requestNumber, approver) {
        console.info('============= START : approveBuySellRequest ===========');

        const requestAsBytes = await ctx.stub.getState(requestNumber); // get the request from chaincode state
        if (!requestAsBytes || requestAsBytes.length === 0) {
            throw new Error(`${requestNumber} does not exist`);
        }
        const request = JSON.parse(requestAsBytes.toString());

        // this means we allow somebody to approve only when the request 
        // is currently waiting his/her approval
        // ignoring this now as family head is not existing right now
        // if (request.currentlyAwaitingResponseFrom === 'FAMILY HEAD'
        // && request.familyHead === approver) {
        //     request.responseFromFamilyHead = 'approved';
        //     request.currentlyAwaitingResponseFrom = 'CLS';
        // } else 
        if (request.currentlyAwaitingResponseFrom === 'cls'
        && request.cls === approver) {
            request.responseFromCLS = 'approved';
            request.currentlyAwaitingResponseFrom = null;
            request.status = 'approved';  // approved for customary land
        } else if (request.currentlyAwaitingResponseFrom === 'landCommission'
        && request.landCommission === approver) {
            request.responseFromLandCommission = 'approved';
            request.currentlyAwaitingResponseFrom = null;
            request.status = 'approved';  // approved for statutory land
        }

        if (request.status === 'approved') {
            this.transactLand(ctx, request.landNumber, request.seller, request.buyer, request.price);
        }
        await ctx.stub.putState(requestNumber, Buffer.from(JSON.stringify(request)));
        console.info('============= END : changeBuySellRequestOwner ===========');
    }

    async rejectBuySellRequest(ctx, requestNumber, approver) {
        console.info('============= START : approveBuySellRequest ===========');

        const requestAsBytes = await ctx.stub.getState(requestNumber); // get the request from chaincode state
        if (!requestAsBytes || requestAsBytes.length === 0) {
            throw new Error(`${requestNumber} does not exist`);
        }
        const request = JSON.parse(requestAsBytes.toString());

        // this means we allow somebody to approve only when the request 
        // is currently waiting his/her approval
        // ignoring this now as family head is not existing right now
        // if (request.currentlyAwaitingResponseFrom === 'FAMILY HEAD'
        // && request.familyHead === approver) {
        //     request.responseFromFamilyHead = 'approved';
        //     request.currentlyAwaitingResponseFrom = 'CLS';
        // } else 
        if (request.currentlyAwaitingResponseFrom === 'cls'
        && request.cls === approver) {
            request.responseFromCLS = 'rejected';
            request.currentlyAwaitingResponseFrom = null;
            request.status = 'rejected';  // approved for customary land
        } else if (request.currentlyAwaitingResponseFrom === 'landCommission'
        && request.landCommission === approver) {
            request.responseFromLandCommission = 'rejected';
            request.currentlyAwaitingResponseFrom = null;
            request.status = 'rejected';  // approved for statutory land
        }

        if (request.status === 'approved') {
            this.transactLand(ctx, request.landNumber, request.seller, request.buyer, request.price);
        }
        await ctx.stub.putState(requestNumber, Buffer.from(JSON.stringify(request)));
        console.info('============= END : changeBuySellRequestOwner ===========');
    }
    
}

module.exports = Land;
