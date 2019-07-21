/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class BuySellRequest extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const requests = [
            {
                seller: 'person3',
                buyer: 'person4',
                price: 40000,
                registrationType: 'statutory',
                currentlyAwaitingResponseFrom: 'CLS',
                landCommission: lc,
                responseFromLandCommission: null,
                status: 'pending',
                familyHead: fh,
                responseFromFamilyHead: 'approved',
                cls: cls,
                responseFromCLS: null,
                landNumber: 456
            }
        ];

        for (let i = 0; i < requests.length; i++) {
            requests[i].docType = 'request';
            await ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(requests[i])));
            console.info('Added <--> ', requests[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
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
        registrationType, familyHead, cls, landCommission, landNumber) {
        console.info('============= START : Create BuySellRequest ===========');
        let request;
        if (registrationType === 'statutory') {
            request = {
                docType: 'buysellrequest',
                seller,
                buyer,
                price,
                registrationType,
                currentlyAwaitingResponseFrom: 'LAND COMMISSION',
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
                currentlyAwaitingResponseFrom: 'FAMILY HEAD',
                familyHead,
                responseFromFamilyHead: null,
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

    async approveBuySellRequest(ctx, requestNumber, approver) {
        console.info('============= START : approveBuySellRequest ===========');

        const requestAsBytes = await ctx.stub.getState(requestNumber); // get the request from chaincode state
        if (!requestAsBytes || requestAsBytes.length === 0) {
            throw new Error(`${requestNumber} does not exist`);
        }
        const request = JSON.parse(requestAsBytes.toString());

        // this means we allow somebody to approve only when the request 
        // is currently waiting his/her approval
        if (request.currentlyAwaitingResponseFrom === 'FAMILY HEAD'
        && request.familyHead === approver) {
            request.responseFromFamilyHead = 'approved';
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
            request.status = approved;  // approved for statutory land
        }

        if (request.status === 'approved') {
            land.submitTransaction('transactLand', landNumber, request.seller, request.buyer, request.price);
        }
        await ctx.stub.putState(requestNumber, Buffer.from(JSON.stringify(request)));
        console.info('============= END : changeBuySellRequestOwner ===========');
    }

}

module.exports = BuySellRequest;
