import { Land } from 'src/models/land';
import { Injectable } from '@angular/core';
import { landsForSale, exampleChief, exampleRegistrationRequest1 } from 'src/consts/example';
import { Chief } from 'src/models/chief';

@Injectable({
    providedIn: 'root'
})

export class ChiefService {

    // returns chief
    getChief(): Chief {
        const chief = exampleChief;
        chief.incomingRegistrationRequests = [exampleRegistrationRequest1];
        return chief;
    }

}
