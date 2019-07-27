import { Component, OnInit } from '@angular/core';
import { ExternalMember } from 'src/models/external-member';
import { exampleExternalMember1 } from 'src/consts/example';
import { LandService } from 'src/services/land.service';
import { Land } from 'src/models/land';
import { ExternalMemberService } from 'src/services/external-member.service';

@Component({
  selector: 'app-external-member',
  templateUrl: './external-member.component.html',
  styleUrls: ['./external-member.component.scss']
})
export class ExternalMemberComponent implements OnInit {

  externalMember: ExternalMember = exampleExternalMember1;
  displayedColumns: string[] = ['id', 'coords', 'registrationType', 'actions'];

  constructor(public landService: LandService, public externalMemberService: ExternalMemberService) { }

  ngOnInit() {
  }

  // get external member
  getExternalMember() {
    this.externalMemberService.getExternalMember().then(m => {
      this.externalMember = m;
    });
  }

  // request LandService to put this land for sale
  putLandForSale(land: Land) {
    this.landService.putLandForSale(land).then(r => {
      console.log(r);
    });
  }

  // request LandService to withdraw this land from sale
  withdrawLandFromSale(land: Land) {
    this.landService.withdrawLandFromSale(land).then(r => {
      console.log(r);
    });
  }
}
