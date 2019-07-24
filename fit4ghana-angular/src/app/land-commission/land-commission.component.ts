import { Component, OnInit } from '@angular/core';
import { LandCommissionService } from 'src/services/land-commission.service';
import { LandCommission } from 'src/models/landCommission';

@Component({
  selector: 'app-land-commission',
  templateUrl: './land-commission.component.html',
  styleUrls: ['./land-commission.component.scss']
})
export class LandCommissionComponent implements OnInit {

  landCommission: LandCommission;
  registrationRequestColumns: string[] = ['id', 'claimer', 'registrationType', 'actions'];
  buysellRequestColumns: string[] = ['id', 'buyer', 'seller', 'price', 'actions'];

  constructor(public landCommissionService: LandCommissionService) {
    this.landCommission = this.landCommissionService.getLandCommission();
  }

  ngOnInit() {
  }

}
