
import { Injectable } from '@angular/core';
import { exampleCLS, exampleRegistrationRequest2, exampleBuySellRequest1 } from 'src/consts/example';
import { CLS } from 'src/models/cls';

@Injectable({
    providedIn: 'root'
})

export class CLSService {

    // returns cls
    getCLS(): CLS {
        const cls = exampleCLS;
        cls.incomingRegistrationRequests = [exampleRegistrationRequest2];
        cls.incomingBuySellRequests = [exampleBuySellRequest1];
        return cls;
    }

}
