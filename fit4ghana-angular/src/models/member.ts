import { Land } from './land';

export class Member {
    Key: number;
    id: string;
    firstName: string;
    lastName: string;
    lands: Land[];

    constructor({
        id = '',
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
