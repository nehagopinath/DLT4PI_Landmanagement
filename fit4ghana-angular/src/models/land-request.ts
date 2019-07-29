import { Land } from './land';
import { RequestStatus } from './request-status';

export class LandRequest {
    id: number;
    status: RequestStatus;
    landNumber: number;

    constructor({
        id = -1,
        status = RequestStatus.PENDING,
        landNumber = -1
    }) {
        this.id = id;
        this.status = status;
        this.landNumber = landNumber;
    }
}
