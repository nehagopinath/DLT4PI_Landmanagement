import { Land } from './land';
import { RequestStatus } from './request-status';

export class LandRequest {
    id: number;
    status: RequestStatus;
    land: Land;

    constructor({
        id = -1,
        status = RequestStatus.PENDING,
        land = null
    }) {
        this.id = id;
        this.status = status;
        this.land = land;
    }
}
