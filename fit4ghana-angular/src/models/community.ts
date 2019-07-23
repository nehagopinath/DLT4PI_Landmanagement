import { Chief } from './chief';
import { CLS } from './cls';
import { LandCommission } from './landCommission';

export class Community {
    id: number;
    name: string;
    chief: Chief;
    cls: CLS;
    landCommission: LandCommission;
}
