import { Chief } from './chief';
import { CLS } from './cls';
import { LandCommission } from './landCommission';

export class Community {
    id: string;
    name: string;
    chief: Chief;
    cls: CLS;
    landCommission: LandCommission;

    constructor({
        id = '',
        name = '',
        chief = null,
        cls = null,
        landCommission = null
    }) {
        this.id = id;
        this.name = name;
        this.chief = chief;
        this.cls = cls;
        this.landCommission = landCommission;
    }
}
