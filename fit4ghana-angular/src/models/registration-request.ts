import { LandRequest } from './land-request';
import { Member } from './member';
import { RegistrationType } from './registration-type';
import { RequestStatus } from './request-status';
import { LandCommission } from './landCommission';

export class RegistrationRequest {
    Key: string;
    Record: {
        status: string,
        landNumber: string,
        claimer: string,
        chief: string,
        cls: string,
        landCommission: string,
        registrationType: string,
        responseFromChief: string,
        responseFromCLS: string,
        responseFromLandCommission: string
    };

    constructor({
        Key = 'request0',
        Record: {
            status = '',
            landNumber = '',
            claimer = '',
            chief = '',
            cls = '',
            registrationType = '',
            responseFromChief = '',
            responseFromCLS = '',
            responseFromLandCommission = '',
            landCommission = ''
        } = { status : '',
        landNumber : '',
        claimer : '',
        chief : '',
        cls : '',
        registrationType : '',
        responseFromChief : '',
        responseFromCLS : '',
        responseFromLandCommission : '',
        landCommission : ''}
    }) {
        this.Key = Key;
        this.Record.status = status;
        this.Record.landNumber = landNumber;
        this.Record.claimer = claimer;
        this.Record.chief = chief;
        this.Record.cls = cls;
        this.Record.registrationType = registrationType;
        this.Record.responseFromChief = responseFromChief;
        this.Record.responseFromCLS = responseFromCLS;
        this.Record.responseFromLandCommission = responseFromLandCommission;
        this.Record.landCommission = landCommission;
    }
}
