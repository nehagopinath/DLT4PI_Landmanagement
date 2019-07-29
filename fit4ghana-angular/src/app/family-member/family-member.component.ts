import { Component, OnInit } from '@angular/core';
import { FamilyMember } from 'src/models/family-member';
import { FamilyMemberService } from 'src/services/family-member.service';
import { LandService } from 'src/services/land.service';
import { RegistrationType } from 'src/models/registration-type';
import { Land } from 'src/models/land';

@Component({
  selector: 'app-family-member',
  templateUrl: './family-member.component.html',
  styleUrls: ['./family-member.component.scss']
})
export class FamilyMemberComponent implements OnInit {

  familyMember: FamilyMember;
  displayedColumns: string[] = ['id', 'coords', 'registrationType', 'actions'];

  // id: 1,
  // coords: '1.2.3',
  // community: trede,
  // registered: false,
  // registrationType: RegistrationType.UNDEFINED,
  // price: 10000000,
  // isForSale: false

  constructor(public familyMemberService: FamilyMemberService, public landService: LandService) { }

  ngOnInit() {
    this.getFamilyMember();
  }

  // get family member
  getFamilyMember() {
    this.familyMemberService.getFamilyMember().then(m => {
      console.log('done!');
      console.log(m);
      this.familyMember = m;
      console.log(this.familyMember);
    });
  }

  // request LandService to put this land for sale
  putLandForSale(land: Land) {
    this.landService.putLandForSale(land, this.familyMember).then(r => {
      console.log(r);
    });
  }

  // request LandService to withdraw this land from sale
  withdrawLandFromSale(land: Land) {
    this.landService.withdrawLandFromSale(land, this.familyMember).then(r => {
      console.log(r);
    });
  }
}
