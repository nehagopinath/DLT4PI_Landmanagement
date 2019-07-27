import { Land } from 'src/models/land';
import { Injectable } from '@angular/core';
import { landsForSale } from 'src/consts/example';
import { environment } from 'src/environments/environment';
import { FamilyMember } from 'src/models/family-member';
import { RegistrationType } from 'src/models/registration-type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExternalMember } from 'src/models/external-member';

@Injectable({
    providedIn: 'root'
})

export class LandService {


    registerLandEndpoint = environment.apiEndpoint + '/create';
    putForSaleEndpoint = environment.apiEndpoint + '/putForSale';
    withDrawLandFromSaleEndpoint = environment.apiEndpoint + '/withDrawLandFromSale';
    requestLandTransactionEndpoint = environment.apiEndpoint + '/requestLandTransaction';
    queryLandsForSaleEndpoint = environment.apiEndpoint + '/queryLandForSale';
    queryUserLandsEndpoint = environment.apiEndpoint + '/queryLand';

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

    // returns api to initiate a registration request
    requestLandRegistration(land: Land, familyMember: FamilyMember, registrationType: RegistrationType) {
        const rT = registrationType.toString().trim();
        const url = `${this.registerLandEndpoint}/${familyMember.id}/${rT}/chief/cls`;
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

    // returns api to initiate a transaction request
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
            return null;
        });

    }

    // returns api to put land for sale
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

    // returns api to withdraw land from sale
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

    // returns api to query all lands for sale
    queryAllLandsForSale(user) {
        const url = `${this.queryLandsForSaleEndpoint}/${user.id}`;
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

    // returns api to query user lands
    queryUserLands(user: FamilyMember | ExternalMember) {
        const url = `${this.queryUserLandsEndpoint}/${user.id}`;
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
