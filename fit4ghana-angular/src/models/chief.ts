import { LandRequest } from './land-request';

export class Chief {
    id: number;
    firstName: string;
    lastName: string;
    incomingRequests: LandRequest[];

    constructor({
        id = -1,
        firstName = '',
        lastName = '',
        incomingRequests = []
    }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.incomingRequests = incomingRequests;
    }

    getDisplayName() {
        return this.lastName + ', ' + this.firstName;
    }

}
