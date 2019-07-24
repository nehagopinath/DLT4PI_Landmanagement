import { Component, OnInit, Input } from '@angular/core';
import { LandService } from 'src/services/land.service';
import { Member } from 'src/models/member';
import { Land } from 'src/models/land';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {

  @Input() currentMember: Member;

  landsForSale = [];
  marketplaceColumns: string[] = ['id', 'coords', 'ownerName', 'registrationType', 'price', 'actions'];

  constructor(public landService: LandService) {
    this.landsForSale = this.landService.getAllLandsForSale();
  }

  isLandOwnedByCurrentMember(land: Land) {
    return (this.currentMember.lands.map(l => l.id)
    .includes(land.id));
  }

  ngOnInit() {
  }

}
