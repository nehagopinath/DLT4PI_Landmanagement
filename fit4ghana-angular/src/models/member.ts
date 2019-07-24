import { Land } from './land';

export class Member {
    id: number;
    firstName: string;
    lastName: string;
    lands: Land[];

    constructor({
        id = -1,
        firstName = '',
        lastName = '',
        lands = []
    }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.lands = lands;
    }

    getDisplayName() {
        return this.lastName + ', ' + this.firstName;
    }
}
