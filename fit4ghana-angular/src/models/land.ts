import { Community } from './community';
import { RegistrationType } from './registration-type';

export class Land {
    id: number;
    coords: string;
    community: Community;
    registered: boolean;
    registrationType: RegistrationType;
    price: number;
    isForSale: boolean;

    constructor({
        id,
        coords,
        community,
        registered,
        registrationType,
        price,
        isForSale
    }) {
        this.id = id;
        this.coords = coords;
        this.community = community;
        this.registered = registered;
        this.registrationType = registrationType;
        this.price = price;
        this.isForSale = isForSale;
    }
}
