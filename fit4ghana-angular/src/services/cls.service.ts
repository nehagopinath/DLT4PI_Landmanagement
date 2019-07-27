
import { Injectable } from '@angular/core';
import { CLS } from 'src/models/cls';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Indentity } from 'src/models/identity';
import { RegistrationRequest } from 'src/models/registration-request';
import { BuySellRequest } from 'src/models/buy-sell-request';

@Injectable({
    providedIn: 'root'
})

export class CLSService {


    constructor(public http: HttpClient) {}

    queryRegistrationRequestsEndpoint = environment.apiEndpoint + '/getAllRegistrationRequestAwating';
    queryBuySellRequestsEndpoint = environment.apiEndpoint + '/getAllSellBuyRequestAwating';
    approveRegistrationRequestsEndpoint = environment.apiEndpoint + '/approveRegistrationRequests';
    rejectRegistrationRequestsEndpoint = environment.apiEndpoint + '/rejectRegistrationRequests';
    approveBuySellRequestsEndpoint = environment.apiEndpoint + '/approveBuySellRequests';
    rejectBuySellRequestsEndpoint = environment.apiEndpoint + '/rejectBuySellRequests';
    queryUserEndpoint = environment.apiEndpoint + '/getUser';

    httpHeaders = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Access-Control-Allow-Headers', '*,Content-Type, Authorization')
            .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
            .append('Access-Control-Allow-Origin', '*');

    // const cls = exampleCLS;
    // cls.incomingRegistrationRequests = [exampleRegistrationRequest2];
    // cls.incomingBuySellRequests = [exampleBuySellRequest1];
    // return cls;


    // returns cls user
    getCLS() {
        const url = `${this.queryUserEndpoint}/cls`;
        return this.http.get<Indentity>(url, {headers: this.httpHeaders})
        .toPromise()
        .then(response => {
            console.log('response: ');
            console.log(response);
            const cls = new CLS({
                id: response.Identity,
                name: 'cls'
            });
            return this.getAllRegistrationRequestsAwatingCLS(response.Identity)
            .then(requests => {
                cls.incomingRegistrationRequests = requests;
                return this.getAllBuySellRequestsAwatingCLS(response.Identity)
                .then(bsrequests => {
                    cls.incomingBuySellRequests = bsrequests;
                    return cls;
                });
            });
        }).catch(error => {
            console.log(error);
            return null;
        });
    }


    getAllRegistrationRequestsAwatingCLS(identity) {
        const url = `${this.queryRegistrationRequestsEndpoint}/cls`;
        return this.http.get<RegistrationRequest[]>(url, {headers: this.httpHeaders})
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

    getAllBuySellRequestsAwatingCLS(identity) {
        const url = `${this.queryBuySellRequestsEndpoint}/cls`;
        return this.http.get<BuySellRequest[]>(url, {headers: this.httpHeaders})
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
