import { Member } from './member';

export class ExternalMember extends Member {
    originCountry: string;

    constructor({
        id = '',
        firstName = '',
        lastName = '',
        lands = [],
        originCountry = ''
    }) {
        super({id, firstName, lastName, lands});
        this.originCountry = originCountry;
    }
}
