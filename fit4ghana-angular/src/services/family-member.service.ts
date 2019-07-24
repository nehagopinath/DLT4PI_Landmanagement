import { FamilyMember } from 'src/models/family-member';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})


export class FamilyMemberService {
    familyMember: FamilyMember;

    // returns family member by ID from the application
    getFamilyMemberByID(id: number): FamilyMember {
        return null;
    }
}
