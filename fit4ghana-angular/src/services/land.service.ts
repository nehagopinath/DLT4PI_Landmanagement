import { Land } from 'src/models/land';
import { Injectable } from '@angular/core';
import { landsForSale } from 'src/consts/example';
import { registerLand } from '../../../fit4ghana-node-server/nodejs-server/src/routes/registerLand';
import { environment } from 'src/environments/environment';
import { FamilyMember } from 'src/models/family-member';
import { RegistrationType } from 'src/models/registration-type';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class LandService {

    registerLandEndpoint = environment.apiEndpoint + '/registerLand/create';
    httpOptions: any = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Origin': '*'
        })
    };

    constructor(public http: HttpClient) {}

    // returns all family members from the application
    getAllLandsForSale(): Land[] {
        return landsForSale;
    }

    // returns family member by ID from the application
    requestLandRegistration(land: Land, familyMember: FamilyMember, registrationType: RegistrationType) {
        const rT = registrationType.toString().trim();
        const url = `${this.registerLandEndpoint}/${familyMember.id}/${rT}/${land.community.chief.id}/${land.community.cls.id}`;
        const httpHeaders = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Access-Control-Allow-Headers', '*,Content-Type, Authorization')
            .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
            .append('Access-Control-Allow-Origin', '*');
        return this.http.post(url, '', {headers: httpHeaders})
        .toPromise()
        .then(response => {
            console.log('response: ');
            console.log(response);
            return response;
        }).catch(error => {
            console.log(error);
            return error;
        });

    }
}
