
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
    approveRegistrationRequestsEndpoint = environment.apiEndpoint + '/approveregistrationrequest';
    rejectRegistrationRequestsEndpoint = environment.apiEndpoint + '/rejectregistrationrequest';
    approveBuySellRequestsEndpoint = environment.apiEndpoint + '/approveBuySellRequest';
    rejectBuySellRequestsEndpoint = environment.apiEndpoint + '/rejectBuySellRequest';
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
        return this.http.get(url, {headers: this.httpHeaders})
        .toPromise()
        .then(response => {
            console.log('response: ');
            console.log(response);
            const cls = new CLS({
                id: response['user'],
                name: 'cls'
            });
            return this.getAllRegistrationRequestsAwatingCLS(response['user'])
            .then(requests => {
                cls.incomingRegistrationRequests = requests;
                return this.getAllBuySellRequestsAwatingCLS(response['user'])
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
        const url = `${this.approveRegistrationRequestsEndpoint}/${request.Key}/${cls.id}`;
        return this.http.post(url, '', {headers: this.httpHeaders})
        .toPromise()
        .then(response => {
            alert('You have approved request number ' + request.Key);
            console.log('response: ');
            console.log(response);
            return response;
        }).catch(error => {
            console.log(error);
            return null;
        });
    }

    rejectRegistrationRequest(cls, request) {
        const url = `${this.rejectRegistrationRequestsEndpoint}/${request.Key}/${cls.id}`;
        return this.http.post(url, '', {headers: this.httpHeaders})
        .toPromise()
        .then(response => {
            alert('You have rejected request number ' + request.Key);
            console.log('response: ');
            console.log(response);
            return response;
        }).catch(error => {
            console.log(error);
            return null;
        });
    }

    approveBuySellRequest(cls, request) {
        const url = `${this.approveBuySellRequestsEndpoint}/${request.Key}/${cls.id}`;
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
        const url = `${this.rejectBuySellRequestsEndpoint}/${request.Key}/${cls.id}`;
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
