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
        landNumber = -1,
        seller = null,
        buyer = null,
        price = 0,
        responseFromCLS = RequestStatus.PENDING,
        responseFromLandCommission = RequestStatus.PENDING
    }) {
        super({id, status, landNumber});
        this.seller = seller;
        this.buyer = buyer;
        this.responseFromCLS = responseFromCLS;
        this.responseFromLandCommission = responseFromLandCommission;
        this.price = price;
    }
}
