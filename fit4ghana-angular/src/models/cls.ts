import { LandRequest } from './land-request';

export class CLS {
    id: number;
    name: string;
    incomingRequests: LandRequest[];

    constructor({
        id = -1,
        name = '',
        incomingRequests = []
    }) {
        this.id = id;
        this.name = name;
        this.incomingRequests = incomingRequests;
    }
    getDisplayName() {
        return this.name;
    }

}
