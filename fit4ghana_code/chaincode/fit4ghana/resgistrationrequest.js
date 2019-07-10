/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class RegistrationRequest extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const requests = [
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

        for (let i = 0; i < requests.length; i++) {
            requests[i].docType = 'request';
            await ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(requests[i])));
            console.info('Added <--> ', requests[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
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
        registrationType, cls, landCommission, land) {
        console.info('============= START : Create RegistrationRequest ===========');
        let request;
        if (registrationType === 'statutory') {
            request = {
                docType: 'registrationrequest',
                claimer,
                registrationType,
                currentlyAwaitingResponseFrom: 'LAND COMMISSION',
                landCommission,
                responseFromLandCommission: null,
                status: 'pending',
                land
            };
        } else if (registrationType === 'customary') {
            request = {
                docType: 'registrationrequest',
                claimer,
                registrationType,
                currentlyAwaitingResponseFrom: 'CHIEF',
                chief,
                responseFromChief: null,
                cls,
                responseFromCLS: null,
                status: 'pending',
                land
            };
        }

        await ctx.stub.putState(requestNumber, Buffer.from(JSON.stringify(request)));
        console.info('============= END : Create RegistrationRequest ===========');
    }

    async queryAllRegistrationRequests(ctx) {
        const startKey = 'REQUEST0';
        const endKey = 'REQUEST999';

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

    async approveRegistrationRequest(ctx, approver) {
        console.info('============= START : approveRegistrationRequest ===========');

        const requestAsBytes = await ctx.stub.getState(requestNumber); // get the request from chaincode state
        if (!requestAsBytes || requestAsBytes.length === 0) {
            throw new Error(`${requestNumber} does not exist`);
        }
        const request = JSON.parse(requestAsBytes.toString());

        // this means we allow somebody to approve only when the request 
        // is currently waiting his/her approval
        if (request.currentlyAwaitingResponseFrom === 'CHIEF'
        && request.cls === approver) {
           request.responseFromChief = 'approved';
           request.currentlyAwaitingResponseFrom = 'CLS';
        } else if (request.currentlyAwaitingResponseFrom === 'CLS'
        && request.cls === approver) {
            request.responseFromCLS = 'approved';
            request.currentlyAwaitingResponseFrom = null;
            request.status = approved;  // approved for customary land
        } else if (request.currentlyAwaitingResponseFrom === 'LAND COMMISSION'
         && request.landCommission === approver) {
            request.responseFromLandCommission = 'approved';
            request.currentlyAwaitingResponseFrom = null;
            request.status = approved;
        }

        if (request.status === 'approved') {
            land.registerLand(request.claimer, request.registrationType);
        }
        await ctx.stub.putState(requestNumber, Buffer.from(JSON.stringify(request)));
        console.info('============= END : changeRegistrationRequestOwner ===========');
    }
    

}

module.exports = RegistrationRequest;