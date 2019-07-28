import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExternalMember } from 'src/models/external-member';
import { Indentity } from 'src/models/identity';
import { Land } from 'src/models/land';

@Injectable({
    providedIn: 'root'
})


export class ExternalMemberService {

    constructor(public http: HttpClient) {}

    queryUserEndpoint = environment.apiEndpoint + '/getUser';
    queryUserLandsEndpoint = environment.apiEndpoint + '/queryLand';
    externalMember: ExternalMember;

    httpHeaders = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Access-Control-Allow-Headers', '*,Content-Type, Authorization')
            .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
            .append('Access-Control-Allow-Origin', '*');

    // returns family member by ID from the application
    // getFamilyMemberByID(id: number): FamilyMember {
    //     return null;
    // }

    // returns external Member user
    getExternalMember() {
        const url = `${this.queryUserEndpoint}/externalMember`;
        return this.http.get(url, {headers: this.httpHeaders})
        .toPromise()
        .then(response => {
            console.log('response: ');
            console.log(response);
            const externalMember = new ExternalMember({
                id: response['user'],
                firstName: 'externalMember'
            });
            return this.queryUserLands(externalMember.id).then(lands => {
                externalMember.lands = lands;
                return externalMember;
            });
        }).catch(error => {
            console.log(error);
            return null;
        });
    }

    // returns api to query user lands
    queryUserLands(identity) {
        const url = `${this.queryUserLandsEndpoint}/${identity}`;
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
