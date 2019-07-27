import { FamilyMember } from 'src/models/family-member';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})


export class FamilyMemberService {

    constructor(public http: HttpClient) {}

    queryUserEndpoint = environment.apiEndpoint + '/getUser';
    familyMember: FamilyMember;

    httpHeaders = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Access-Control-Allow-Headers', '*,Content-Type, Authorization')
            .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
            .append('Access-Control-Allow-Origin', '*');

    // returns family member by ID from the application
    // getFamilyMemberByID(id: number): FamilyMember {
    //     return null;
    // }

    // returns family Member user
    getFamilyMember() {
        const url = `${this.queryUserEndpoint}/familyMember`;
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
