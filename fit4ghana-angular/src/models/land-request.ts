import { Land } from './land';
import { RequestStatus } from './request-status';

export class LandRequest {
    id: number;
    status: RequestStatus;
    land: Land;
}
