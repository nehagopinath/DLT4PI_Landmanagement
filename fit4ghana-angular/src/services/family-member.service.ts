import { FamilyMember } from 'src/models/family-member';

export class FamilyMemberService {
    familyMembers: FamilyMember;

    // returns all family members from the application
    getAllFamilyMembers(): FamilyMember[] {
        return [];
    }

    // returns family member by ID from the application
    getFamilyMemberByID(id: number): FamilyMember {
        return null;
    }
}
