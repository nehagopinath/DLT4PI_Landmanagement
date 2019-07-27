
import { Injectable } from '@angular/core';
import { exampleCLS, exampleRegistrationRequest2, exampleBuySellRequest1 } from 'src/consts/example';
import { CLS } from 'src/models/cls';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CLSService {


    constructor(public http: HttpClient) {}

    fit4ghanaEndpoint = environment.apiEndpoint + '/fit4ghana';
    queryRegistrationRequestsEndpoint = this.fit4ghanaEndpoint + '/getAllRegistrationRequestAwating';
    queryBuySellRequestsEndpoint = this.fit4ghanaEndpoint + '/getAllSellBuyRequestAwating';
    approveRegistrationRequestsEndpoint = this.fit4ghanaEndpoint + '/approveRegistrationRequests';
    rejectRegistrationRequestsEndpoint = this.fit4ghanaEndpoint + '/rejectRegistrationRequests';
    approveBuySellRequestsEndpoint = this.fit4ghanaEndpoint + '/approveBuySellRequests';
    rejectBuySellRequestsEndpoint = this.fit4ghanaEndpoint + '/rejectBuySellRequests';


    httpHeaders = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Access-Control-Allow-Headers', '*,Content-Type, Authorization')
            .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
            .append('Access-Control-Allow-Origin', '*');


    // returns cls
    getCLS(): CLS {
        const cls = exampleCLS;
        cls.incomingRegistrationRequests = [exampleRegistrationRequest2];
        cls.incomingBuySellRequests = [exampleBuySellRequest1];
        return cls;
    }

    getAllRegistrationRequestsAwatingCLS() {
        const url = `${this.queryRegistrationRequestsEndpoint}/${exampleCLS.id}`;
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

    getAllBuySellRequestsAwatingCLS() {
        const url = `${this.queryBuySellRequestsEndpoint}/${exampleCLS.id}`;
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

    approveRegistrationRequest(cls, request) {
        const url = `${this.approveRegistrationRequestsEndpoint}/${cls.id}/${request.id}`;
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

    rejectRegistrationRequest(cls, request) {
        const url = `${this.rejectRegistrationRequestsEndpoint}/${cls.id}/${request.id}`;
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

    approveBuySellRequest(cls, request) {
        const url = `${this.approveBuySellRequestsEndpoint}/${cls.id}/${request.id}`;
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

    rejectBuySellRequest(cls, request) {
        const url = `${this.rejectBuySellRequestsEndpoint}/${cls.id}/${request.id}`;
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