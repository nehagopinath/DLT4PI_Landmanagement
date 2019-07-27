
import { Injectable } from '@angular/core';
import { exampleLandCommission, exampleRegistrationRequest3, exampleBuySellRequest2 } from 'src/consts/example';
import { LandCommission } from 'src/models/landCommission';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class LandCommissionService {

    fit4ghanaEndpoint = environment.apiEndpoint + '/fit4ghana';
    queryRegistrationRequestsEndpoint = this.fit4ghanaEndpoint + '/getAllRegistrationRequestAwating';
    queryBuySellRequestsEndpoint = this.fit4ghanaEndpoint + '/getAllSellBuyRequestAwating';
    approveRegistrationRequestsEndpoint = this.fit4ghanaEndpoint + '/approveRegistrationRequests';
    rejectRegistrationRequestsEndpoint = this.fit4ghanaEndpoint + '/rejectRegistrationRequests';
    approveBuySellRequestsEndpoint = this.fit4ghanaEndpoint + '/approveBuySellRequests';
    rejectBuySellRequestsEndpoint = this.fit4ghanaEndpoint + '/rejectBuySellRequests';

    constructor(public http: HttpClient) {}

    httpHeaders = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Access-Control-Allow-Headers', '*,Content-Type, Authorization')
            .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
            .append('Access-Control-Allow-Origin', '*');

    // returns landCommission
    getLandCommission(): LandCommission {
        const landCommission = exampleLandCommission;
        landCommission.incomingRegistrationRequests = [exampleRegistrationRequest3];
        landCommission.incomingBuySellRequests = [exampleBuySellRequest2];
        return landCommission;
    }

    getAllRegistrationRequestsAwatingLC() {
        const url = `${this.queryRegistrationRequestsEndpoint}/${exampleLandCommission.id}`;
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

    getAllBuySellRequestsAwatingLC() {
        const url = `${this.queryBuySellRequestsEndpoint}/${exampleLandCommission.id}`;
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

    approveRegistrationRequest(landCommission, request) {
        const url = `${this.approveRegistrationRequestsEndpoint}/${landCommission.id}/${request.id}`;
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

    rejectRegistrationRequest(landCommission, request) {
        const url = `${this.rejectRegistrationRequestsEndpoint}/${landCommission.id}/${request.id}`;
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

    approveBuySellRequest(landCommission, request) {
        const url = `${this.approveBuySellRequestsEndpoint}/${landCommission.id}/${request.id}`;
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

    rejectBuySellRequest(landCommission, request) {
        const url = `${this.rejectBuySellRequestsEndpoint}/${landCommission.id}/${request.id}`;
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

}