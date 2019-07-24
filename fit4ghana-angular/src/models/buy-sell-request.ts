import { LandRequest } from './land-request';
import { Member } from './member';
import { RequestStatus } from './request-status';

export class BuySellRequest extends LandRequest {
    seller: Member;
    buyer: Member;
    price: number;
    responseFromCLS: RequestStatus;
    responseFromLandCommission: RequestStatus;

    constructor({
        id = -1,
        status = null,
        land = null,
        seller = null,
        buyer = null,
        responseFromCLS = RequestStatus.PENDING,
        responseFromLandCommission = RequestStatus.PENDING
    }) {
        super({id, status, land});
        this.seller = seller;
        this.buyer = buyer;
        this.responseFromCLS = responseFromCLS;
        this.responseFromLandCommission = responseFromLandCommission;
    }
}
