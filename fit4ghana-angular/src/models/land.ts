import { Community } from './community';
import { RegistrationType } from './registration-type';
import { FamilyMember } from './family-member';
import { ExternalMember } from './external-member';

export class Land {
    Key: string;
    Record: {
        coords: string;
        community: Community;
        registered: boolean;
        registrationType: string;
        price: number;
        isForSale: string;
        owner: string;
    };

    constructor({
        Key = 'land0',
        Record: {
            coords = '0.0.0', registered = false,
            registrationType = 'customary', price = 0,
            isForSale = 'false', owner = ''
        } = { coords: '0.0.0',
        registered: false,
        registrationType: '',
        price: 0,
        isForSale: 'false',
        owner: ''}
    }) {
        this.Key = Key;
        this.Record.coords = coords;
        this.Record.registered = registered;
        this.Record.registrationType = registrationType;
        this.Record.price = price;
        this.Record.isForSale = isForSale;
        this.Record.owner = owner;
    }
}
