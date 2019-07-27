import { Component, OnInit } from '@angular/core';
import { LandCommissionService } from 'src/services/land-commission.service';
import { LandCommission } from 'src/models/landCommission';
import { RegistrationRequest } from 'src/models/registration-request';
import { BuySellRequest } from 'src/models/buy-sell-request';
import { exampleLandCommission } from 'src/consts/example';

@Component({
  selector: 'app-land-commission',
  templateUrl: './land-commission.component.html',
  styleUrls: ['./land-commission.component.scss']
})
export class LandCommissionComponent implements OnInit {

  landCommission: LandCommission = exampleLandCommission;
  registrationRequestColumns: string[] = ['id', 'claimer', 'registrationType', 'actions'];
  buysellRequestColumns: string[] = ['id', 'buyer', 'seller', 'price', 'actions'];

  constructor(public landCommissionService: LandCommissionService) {
    // this.landCommission = this.landCommissionService.getLandCommission();

    // this.landCommissionService.getAllRegistrationRequestsAwatingLC().then(requests => {
    //   this.landCommission.incomingRegistrationRequests = requests;
    // });
  }

  // get land commission
  getLandCommission() {
    this.landCommissionService.getLandCommission().then(m => {
      this.landCommission = m;
    });
  }

  // request LandCommissionService to approve this registration request
  approveRegistrationRequest(request: RegistrationRequest) {
    this.landCommissionService.approveRegistrationRequest(this.landCommission, request);
  }

  // request LandCommissionService to reject this registration request
  rejectRegistrationRequest(request: RegistrationRequest) {
    this.landCommissionService.rejectRegistrationRequest(this.landCommission, request);
  }

  // request LandCommissionService to approve this buysell request
  approveBuySellRequest(request: BuySellRequest) {
    this.landCommissionService.approveBuySellRequest(this.landCommission, request);
  }

  // request LandCommissionService to reject this buysell request
  rejectBuySellRequest(request: BuySellRequest) {
    this.landCommissionService.rejectBuySellRequest(this.landCommission, request);
  }


  ngOnInit() {
  }

}
