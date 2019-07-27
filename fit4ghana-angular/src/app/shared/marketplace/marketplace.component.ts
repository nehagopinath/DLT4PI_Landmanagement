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

  @Input() currentMember: FamilyMember | ExternalMember = null;
  @Input() userType: 'member' | 'chief' | 'cls' | 'lc';

  landsForSale = [];
  marketplaceColumns: string[] = [];

  constructor(public landService: LandService) {
    this.landsForSale = this.landService.getAllLandsForSale();
  }

  isLandOwnedByCurrentMember(land: Land) {
    if (!this.currentMember) {
      return false;
    }
    return (this.currentMember.lands.map(l => l.id)
    .includes(land.id));
  }

  buyLand(land: Land) {
    this.landService.requestLandTransaction(land, land.owner, this.currentMember, land.price)
    .then(request => {
      console.log(request);
    });
  }

  withdrawLandFromSale(land: Land) {
    this.landService.withdrawLandFromSale(land).then(r => {
      console.log(r);
    });
  }

  ngOnInit() {
    if (this.userType === 'member') {
      this.marketplaceColumns = ['id', 'coords', 'ownerName', 'registrationType', 'price', 'actions'];
    } else {
      this.marketplaceColumns = ['id', 'coords', 'ownerName', 'registrationType', 'price'];
    }
  }

}
