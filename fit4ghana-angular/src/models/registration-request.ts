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
}
