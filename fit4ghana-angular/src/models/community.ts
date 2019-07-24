import { Chief } from './chief';
import { CLS } from './cls';
import { LandCommission } from './landCommission';

export class Community {
    id: number;
    name: string;
    chief: Chief;
    cls: CLS;
    landCommission: LandCommission;

    constructor({
        id = -1,
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
