import { Land } from 'src/models/land';
import { Injectable } from '@angular/core';
import { landsForSale } from 'src/consts/example';
import { registerLand } from '../../../fit4ghana-node-server/nodejs-server/src/routes/registerLand';
import { environment } from 'src/environments/environment';
import { FamilyMember } from 'src/models/family-member';
import { RegistrationType } from 'src/models/registration-type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExternalMember } from 'src/models/external-member';

@Injectable({
    providedIn: 'root'
})

export class LandService {

    registerLandEndpoint = environment.apiEndpoint + '/registerLand/create';
    putForSaleEndpoint = environment.apiEndpoint + '/registerLand/putForSale';
    withDrawLandFromSaleEndpoint = environment.apiEndpoint + '/registerLand/withDrawLandFromSale';
    requestLandTransactionEndpoint = environment.apiEndpoint + '/registerLand/requestLandTransaction';
    queryLandsForSaleEndpoint = environment.apiEndpoint + '/registerLand/queryLandForSale';
    queryUserLandsSaleEndpoint = environment.apiEndpoint + '/registerLand/queryLand';

    httpHeaders = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Access-Control-Allow-Headers', '*,Content-Type, Authorization')
            .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
            .append('Access-Control-Allow-Origin', '*');

    constructor(public http: HttpClient) {}

    // returns all family members from the application
    getAllLandsForSale(): Land[] {
        return landsForSale;
    }

    // returns family member by ID from the application
    requestLandRegistration(land: Land, familyMember: FamilyMember, registrationType: RegistrationType) {
        const rT = registrationType.toString().trim();
        const url = `${this.registerLandEndpoint}/${familyMember.id}/${rT}/${land.community.chief.id}/${land.community.cls.id}`;
        return this.http.post(url, '', {headers: this.httpHeaders})
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

    requestLandTransaction(land: Land, seller: FamilyMember | ExternalMember, buyer: FamilyMember | ExternalMember, price: number) {
        let url = `${this.requestLandTransactionEndpoint}/${land.id}/${seller.id}`;
        url = url + `/${buyer.id}/${price}`;
        return this.http.post(url, '', {headers: this.httpHeaders})
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

    putLandForSale(land: Land) {
        const url = `${this.putForSaleEndpoint}/${land.id}`;
        return this.http.post(url, '', {headers: this.httpHeaders})
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

    withdrawLandFromSale(land: Land) {
        const url = `${this.withDrawLandFromSaleEndpoint}/${land.id}`;
        return this.http.post(url, '', {headers: this.httpHeaders})
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

    queryAllLandsForSale(land: Land) {
        const url = `${this.queryLandsForSaleEndpoint}`;
        return this.http.post(url, '', {headers: this.httpHeaders})
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

    queryUserLands(user: FamilyMember | ExternalMember) {
        const url = `${this.queryUserLandsSaleEndpoint}/${user.id}`;
        return this.http.post(url, '', {headers: this.httpHeaders})
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
