import { Member } from './member';

export class FamilyMember extends Member {
    familyName: string;

    constructor({
        id = '',
        firstName = '',
        lastName = '',
        lands = [],
        familyName = ''
    }) {
        super({id, firstName, lastName, lands});
        this.familyName = familyName;
    }
}
