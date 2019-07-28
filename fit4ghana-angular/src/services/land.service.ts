import { Land } from 'src/models/land';
import { Injectable } from '@angular/core';
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
    buysellLandEndpoint = environment.apiEndpoint + '/createBuySell';
    queryLandsForSaleEndpoint = environment.apiEndpoint + '/queryLandForSale';
    queryUserLandsEndpoint = environment.apiEndpoint + '/queryLand';

    httpHeaders = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Access-Control-Allow-Headers', '*,Content-Type, Authorization')
            .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
            .append('Access-Control-Allow-Origin', '*');

    constructor(public http: HttpClient) {}

    // returns all family members from the application

    // returns api to initiate a registration request
    requestLandRegistration(registrationType, coords, price) {
        let approver;
        if (registrationType === 'statutory') {
            approver = 'landCommission';
        } else {
            approver = 'cls';
        }
        const url = `${this.registerLandEndpoint}/familyMember/${registrationType}/chief/${approver}/${coords}/${price}`;
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
    // createBuySell/:seller/:buyer/:price/:registrationType/:approver/:landNumber
    requestLandTransaction(land: Land, seller, buyer, price: number) {
        let approver;
        if (land.Record.registrationType === 'statutory') {
            approver = 'landCommission';
        } else {
            approver = 'cls';
        }
        let url = `${this.buysellLandEndpoint}/${seller}/${buyer}/${price}/${land.Record.registrationType}/${approver}/${land.Key}`;
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
    putLandForSale(land: Land, user) {
        const url = `${this.putForSaleEndpoint}/${land.Key}/${user.id}`;
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
    withdrawLandFromSale(land: Land, user) {
        const url = `${this.withDrawLandFromSaleEndpoint}/${land.Key}/${user.id}`;
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
        return this.http.get<Land[]>(url, {headers: this.httpHeaders})
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
