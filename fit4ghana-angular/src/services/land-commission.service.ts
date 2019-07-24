
import { Injectable } from '@angular/core';
import { exampleLandCommission, exampleRegistrationRequest3, exampleBuySellRequest2 } from 'src/consts/example';
import { LandCommission } from 'src/models/landCommission';

@Injectable({
    providedIn: 'root'
})

export class LandCommissionService {

    // returns landCommission
    getLandCommission(): LandCommission {
        const landCommission = exampleLandCommission;
        landCommission.incomingRegistrationRequests = [exampleRegistrationRequest3];
        landCommission.incomingBuySellRequests = [exampleBuySellRequest2];
        return landCommission;
    }

}
