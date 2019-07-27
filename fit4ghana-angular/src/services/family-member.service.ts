import { FamilyMember } from 'src/models/family-member';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Indentity } from 'src/models/identity';
import { Land } from 'src/models/land';

@Injectable({
    providedIn: 'root'
})


export class FamilyMemberService {

    constructor(public http: HttpClient) {}

    queryUserEndpoint = environment.apiEndpoint + '/getUser';
    queryUserLandsEndpoint = environment.apiEndpoint + '/queryLand';
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
        console.log('getting family member...');
        const url = `${this.queryUserEndpoint}/familyMember`;
        console.log(url);
        return this.http.get(url, {headers: this.httpHeaders})
        .toPromise()
        .then(response => {
            console.log('response: ');
            console.log(response);
            const familyMember = new FamilyMember({
                id: response['user'],
                firstName: 'familyMember'
            });
            return this.queryUserLands(familyMember.id).then(lands => {
                console.log(lands);
                familyMember.lands = lands;
                return familyMember;
            }).catch(error => {
                console.log(error);
                return null;
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
