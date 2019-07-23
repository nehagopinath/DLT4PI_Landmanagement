import { LandRequest } from './land-request';
import { Member } from './member';
import { RequestStatus } from './request-status';

export class BuySellRequest extends LandRequest {
    seller: Member;
    buyer: Member;
    price: number;
    responseFromCLS: RequestStatus;
    responseFromLandCommission: RequestStatus;
}
