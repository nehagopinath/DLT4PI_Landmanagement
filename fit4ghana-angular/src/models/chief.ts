import { LandRequest } from './land-request';
import { RegistrationRequest } from './registration-request';
import { BuySellRequest } from './buy-sell-request';

export class Chief {
    id: number;
    firstName: string;
    lastName: string;
    incomingRegistrationRequests: RegistrationRequest[];

    constructor({
        id = -1,
        firstName = '',
        lastName = '',
        incomingRegistrationRequests = []
    }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.incomingRegistrationRequests = incomingRegistrationRequests;
    }

    getDisplayName() {
        return this.lastName + ', ' + this.firstName;
    }

}
