import { LandRequest } from './land-request';
import { RegistrationRequest } from './registration-request';
import { BuySellRequest } from './buy-sell-request';

export class LandCommission {
    id: string;
    name: string;
    incomingRegistrationRequests: RegistrationRequest[];
    incomingBuySellRequests: BuySellRequest[];

    constructor({
        id = '',
        name = '',
        incomingRegistrationRequests = [],
        incomingBuySellRequests = []
    }) {
        this.id = id;
        this.name = name;
        this.incomingRegistrationRequests = incomingRegistrationRequests;
        this.incomingBuySellRequests = incomingBuySellRequests;
    }

    getDisplayName() {
        return this.name;
    }
}
