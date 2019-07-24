import { Land } from 'src/models/land';
import { Injectable } from '@angular/core';
import { landsForSale } from 'src/consts/example';

@Injectable({
    providedIn: 'root'
})

export class LandService {

    // returns all family members from the application
    getAllLandsForSale(): Land[] {
        return landsForSale;
    }

    // returns family member by ID from the application
    registerLand(land: Land): number {
        return 1;
    }
}
