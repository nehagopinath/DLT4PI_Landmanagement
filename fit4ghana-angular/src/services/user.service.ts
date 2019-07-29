import { FamilyMember } from 'src/models/family-member';
import { Chief } from 'src/models/chief';
import { CLS } from 'src/models/cls';
import { LandCommission } from 'src/models/landCommission';
import { ExternalMember } from 'src/models/external-member';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {
    currentUser: {
        id: number,
        email: string,
        person: FamilyMember | Chief | CLS | LandCommission | ExternalMember;
    } = null;

    setUser(user) {
        this.currentUser = user;
        return this.currentUser;
    }

    getUser() {
        return this.currentUser;
    }

    getUserEmail() {
        return this.currentUser.email;
    }

    getUserDisplayName(): string {
        return this.currentUser.person.getDisplayName();
    }

}
