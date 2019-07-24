import { LandRequest } from './land-request';
import { Member } from './member';
import { RegistrationType } from './registration-type';
import { RequestStatus } from './request-status';

export class RegistrationRequest extends LandRequest {
    claimer: Member;
    registrationType: RegistrationType;
    responseFromChief: RequestStatus;
    responseFromCLS: RequestStatus;
    responseFromLandCommission: RequestStatus;

    constructor({
        id = -1,
        status = null,
        landNumber = -1,
        claimer = null,
        registrationType = RegistrationType.STATUTORY,
        responseFromChief = RequestStatus.PENDING,
        responseFromCLS = RequestStatus.PENDING,
        responseFromLandCommission = RequestStatus.PENDING
    }) {
        super({id, status, landNumber});
        this.claimer = claimer;
        this.registrationType = registrationType;
        this.responseFromChief = responseFromChief;
        this.responseFromCLS = responseFromCLS;
        this.responseFromLandCommission = responseFromLandCommission;
    }
}
