import { Land } from 'src/models/land';
import { Community } from 'src/models/community';
import { Chief } from 'src/models/chief';
import { RegistrationRequest } from 'src/models/registration-request';
import { CLS } from 'src/models/cls';
import { LandCommission } from 'src/models/landCommission';
import { RegistrationType } from 'src/models/registration-type';
import { FamilyMember } from 'src/models/family-member';


export const exampleChief: Chief = {
    id: 1,
    firstName: 'chiefFN',
    lastName: 'chiefLN',
    incomingRequests: []
};
export const exampleCLS: CLS = {
    id: 1,
    name: 'CLS 1',
    incomingRequests: []
};
export const exampleLandCommission: LandCommission = {
    id: 1,
    name: 'Land Commission 1',
    incomingRequests: []
};

export const trede: Community = {
    id: 1,
    name: 'Trede',
    chief: exampleChief,
    cls: exampleCLS,
    landCommission: exampleLandCommission
};

export const exampleLand1: Land = {
    id: 1,
    coords: '1.2.3',
    community: trede,
    registered: false,
    registrationType: RegistrationType.UNDEFINED,
    price: 10000000,
    isForSale: false
};

export const exampleLand2: Land = {
    id: 2,
    coords: '4.5.6',
    community: trede,
    registered: true,
    registrationType: RegistrationType.CUSTOMARY,
    price: 20000000,
    isForSale: false
};

export const exampleLand3: Land = {
    id: 3,
    coords: '4.5.6',
    community: trede,
    registered: true,
    registrationType: RegistrationType.STATUTORY,
    price: 30000000,
    isForSale: false
};


export const exampleFamilyMember: FamilyMember = {
    id: 1,
    firstName: 'abc',
    lastName: 'def',
    familyName: 'ABC',
    lands: [
        exampleLand1,
        exampleLand2,
        exampleLand3
    ]
};
