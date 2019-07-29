import { LandRequest } from './land-request';
import { Member } from './member';
import { RequestStatus } from './request-status';

export class BuySellRequest {
    Key: string;
    Record: {
        status: string,
        landNumber: string,
        seller: string,
        buyer: string,
        price: number,
        responseFromCLS: string,
        responseFromLandCommission: string,
        landCommission: string,
        chief: string,
        cls: string,
        registrationType: string
    };


    constructor({
        Key = 'request0',
        Record: {
            status = '',
            landNumber = '',
            seller = '',
            buyer = '',
            price = 0,
            responseFromCLS = '',
            responseFromLandCommission = '',
            landCommission = '',
            chief = '',
            cls = '',
            registrationType = ''
        } = { status : '',
        landNumber : '',
        seller : '',
        buyer : '',
        price: 0,
        responseFromCLS : '',
        responseFromLandCommission : '',
        landCommission : '',
        chief : '',
        cls : '',
        registrationType : ''}
    }) {
        this.Key = Key;
        this.Record.status = status;
        this.Record.landNumber = landNumber;
        this.Record.buyer = buyer;
        this.Record.seller = seller;
        this.Record.chief = chief;
        this.Record.cls = cls;
        this.Record.registrationType = registrationType;
        this.Record.responseFromCLS = responseFromCLS;
        this.Record.responseFromLandCommission = responseFromLandCommission;
        this.Record.landCommission = landCommission;
    }
}
