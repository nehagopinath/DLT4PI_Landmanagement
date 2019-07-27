import { Land } from 'src/models/land';
import { Injectable } from '@angular/core';
import { landsForSale, exampleChief, exampleRegistrationRequest1 } from 'src/consts/example';
import { Chief } from 'src/models/chief';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ChiefService {

    queryRegistrationRequestsEndpoint = environment.apiEndpoint + '/getAllRegistrationRequestAwating';
    approveRegistrationRequestsEndpoint = environment.apiEndpoint + '/approveRegistrationRequests';
    rejectRegistrationRequestsEndpoint = environment.apiEndpoint + '/rejectRegistrationRequests';
    queryUserEndpoint = environment.apiEndpoint + '/getUser';

    httpHeaders = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Access-Control-Allow-Headers', '*,Content-Type, Authorization')
            .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
            .append('Access-Control-Allow-Origin', '*');


    constructor(public http: HttpClient) {}

    // returns chief
    // getChief(): Chief {
    //     const chief = exampleChief;
    //     chief.incomingRegistrationRequests = [exampleRegistrationRequest1];
    //     return chief;
    // }

    // returns chief user
    getChief() {
        const url = `${this.queryUserEndpoint}/chief`;
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

    getAllRegistrationRequestsAwatingChief(chief) {
        const url = `${this.queryRegistrationRequestsEndpoint}/${chief.id}`;
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

    approveRegistrationRequest(chief, request) {
        const url = `${this.approveRegistrationRequestsEndpoint}/${chief.id}/${request.id}`;
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

    rejectRegistrationRequest(chief, request) {
        const url = `${this.rejectRegistrationRequestsEndpoint}/${chief.id}/${request.id}`;
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
