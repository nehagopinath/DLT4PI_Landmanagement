import { Component, OnInit, Input } from '@angular/core';
import { LandService } from 'src/services/land.service';
import { Member } from 'src/models/member';
import { Land } from 'src/models/land';
import { FamilyMember } from 'src/models/family-member';
import { ExternalMember } from 'src/models/external-member';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {

  @Input() currentMember = null;
  @Input() userType: 'member' | 'chief' | 'cls' | 'lc';

  landsForSale = [];
  marketplaceColumns: string[] = [];

  constructor(public landService: LandService) {
    // this.landsForSale = this.landService.getAllLandsForSale();
  }

  // returns if Land is owned by current member
  // this can be used to check if current member can/can't buy this land
  // also to check if land can be withdrawn from sale by current member
  isLandOwnedByCurrentMember(land: Land) {
    if (!this.currentMember) {
      return false;
    }
    if (this.userType != 'member') {
      return false;
    }
    return (this.currentMember.lands.map(l => l.Key)
    .includes(land.Key));
  }

  // request land service to initiate buy land
  buyLand(land: Land) {
    this.landService.requestLandTransaction(land, land.Record.owner, this.currentMember.firstName, land.Record.price)
    .then(request => {
      console.log(request);
    });
  }

  // request land service to withdraw land from sale
  withdrawLandFromSale(land: Land) {
    this.landService.withdrawLandFromSale(land, this.currentMember).then(r => {
      console.log(r);
    });
  }

  ngOnInit() {
    if (this.userType === 'member') {
      this.marketplaceColumns = ['id', 'coords', 'ownerName', 'registrationType', 'price', 'actions'];
    } else {
      this.marketplaceColumns = ['id', 'coords', 'ownerName', 'registrationType', 'price'];
    }

    this.landService.queryAllLandsForSale(this.currentMember).then(landsForSale => {
      this.landsForSale = landsForSale;
    });
  }

}
