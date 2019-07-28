import { Component, OnInit } from '@angular/core';
import { ExternalMember } from 'src/models/external-member';
import { LandService } from 'src/services/land.service';
import { Land } from 'src/models/land';
import { ExternalMemberService } from 'src/services/external-member.service';

@Component({
  selector: 'app-external-member',
  templateUrl: './external-member.component.html',
  styleUrls: ['./external-member.component.scss']
})
export class ExternalMemberComponent implements OnInit {

  externalMember: ExternalMember;
  displayedColumns: string[] = ['id', 'coords', 'registrationType', 'actions'];

  constructor(public landService: LandService, public externalMemberService: ExternalMemberService) { }

  ngOnInit() {
    this.getExternalMember();
  }

  // get external member
  getExternalMember() {
    this.externalMemberService.getExternalMember().then(m => {
      this.externalMember = m;
    });
  }

  // request LandService to put this land for sale
  putLandForSale(land: Land) {
    this.landService.putLandForSale(land, this.externalMember).then(r => {
      console.log(r);
    });
  }

  // request LandService to withdraw this land from sale
  withdrawLandFromSale(land: Land) {
    this.landService.withdrawLandFromSale(land, this.externalMember).then(r => {
      console.log(r);
    });
  }
}
