import { Community } from './community';
import { RegistrationType } from './registration-type';
import { FamilyMember } from './family-member';
import { ExternalMember } from './external-member';

export class Land {
    id: number;
    coords: string;
    community: Community;
    registered: boolean;
    registrationType: RegistrationType;
    price: number;
    isForSale: boolean;
    ownerName: string;
    owner: FamilyMember | ExternalMember;

    constructor({
        id = -1,
        coords = '0.0.0',
        community = null,
        registered = false,
        registrationType = RegistrationType.UNDEFINED,
        price = 0,
        isForSale = false,
        ownerName = '',
        owner = null
    }) {
        this.id = id;
        this.coords = coords;
        this.community = community;
        this.registered = registered;
        this.registrationType = registrationType;
        this.price = price;
        this.isForSale = isForSale;
        this.ownerName = ownerName;
        this.owner = owner;
    }
}
