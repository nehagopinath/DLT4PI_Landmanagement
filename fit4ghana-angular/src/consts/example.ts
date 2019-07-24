import { Land } from 'src/models/land';
import { Community } from 'src/models/community';
import { Chief } from 'src/models/chief';
import { RegistrationRequest } from 'src/models/registration-request';
import { CLS } from 'src/models/cls';
import { LandCommission } from 'src/models/landCommission';
import { RegistrationType } from 'src/models/registration-type';
import { FamilyMember } from 'src/models/family-member';
import { ExternalMember } from 'src/models/external-member';


export const exampleChief: Chief = new Chief({
    id: 1,
    firstName: 'chiefFN',
    lastName: 'chiefLN',
    incomingRequests: []
});
export const exampleCLS: CLS = new CLS({
    id: 1,
    name: 'CLS 1',
    incomingRequests: []
});
export const exampleLandCommission: LandCommission = new LandCommission({
    id: 1,
    name: 'Land Commission 1',
    incomingRequests: []
});

export const trede: Community = new Community({
    id: 1,
    name: 'Trede',
    chief: exampleChief,
    cls: exampleCLS,
    landCommission: exampleLandCommission
});

export const exampleLand1: Land = new Land({
    id: 1,
    coords: '1.2.3',
    community: trede,
    registered: false,
    registrationType: RegistrationType.UNDEFINED,
    price: 10000000,
    isForSale: false
});

export const exampleLand2: Land = new Land({
    id: 2,
    coords: '4.5.6',
    community: trede,
    registered: true,
    registrationType: RegistrationType.CUSTOMARY,
    price: 20000000,
    isForSale: false
});

export const exampleLand3: Land = new Land({
    id: 3,
    coords: '7.8.9',
    community: trede,
    registered: true,
    registrationType: RegistrationType.STATUTORY,
    price: 30000000,
    isForSale: true,
    ownerName: 'Akwasi'
});

export const exampleLand4: Land = new Land({
    id: 4,
    coords: '1.1.1',
    community: trede,
    registered: true,
    registrationType: RegistrationType.CUSTOMARY,
    price: 10000000,
    isForSale: true,
    ownerName: 'Kamusi'
});

export const exampleLand5: Land = new Land({
    id: 5,
    coords: '3.3.3',
    community: trede,
    registered: true,
    registrationType: RegistrationType.STATUTORY,
    price: 30000000,
    isForSale: true,
    ownerName: 'Uchendu'
});

export const exampleLand6: Land = new Land({
    id: 6,
    coords: '2.2.2',
    community: trede,
    registered: true,
    registrationType: RegistrationType.STATUTORY,
    price: 50000000,
    isForSale: false
});


export const exampleFamilyMember: FamilyMember = new FamilyMember({
    id: 1,
    firstName: 'Akwasi',
    lastName: 'Mawasi',
    familyName: 'Mawasi',
    lands: [
        exampleLand1,
        exampleLand2,
        exampleLand3
    ]
});


export const exampleFamilyMember2: FamilyMember = new FamilyMember({
    id: 1,
    firstName: 'Akwasi',
    lastName: 'Mawasi',
    familyName: 'Mawasi',
    lands: [
        exampleLand4
    ]
});


export const exampleFamilyMember3: FamilyMember = new FamilyMember({
    id: 1,
    firstName: 'Akwasi',
    lastName: 'Mawasi',
    familyName: 'Mawasi',
    lands: [
        exampleLand5
    ]
});


export const exampleExternalMember1: ExternalMember = new ExternalMember({
    id: 1,
    firstName: 'Peter',
    lastName: 'Keating',
    originCountry: 'United States',
    lands: [
        exampleLand6
    ]
});

export const landsForSale = [
    exampleLand3,
    exampleLand4,
    exampleLand5
];

