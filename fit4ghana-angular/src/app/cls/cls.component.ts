import { Component, OnInit } from '@angular/core';
import { CLS } from 'src/models/cls';
import { CLSService } from 'src/services/cls.service';
import { RegistrationRequest } from 'src/models/registration-request';
import { BuySellRequest } from 'src/models/buy-sell-request';

@Component({
  selector: 'app-cls',
  templateUrl: './cls.component.html',
  styleUrls: ['./cls.component.scss']
})
export class ClsComponent implements OnInit {

  cls: CLS;
  registrationRequestColumns: string[] = ['id', 'claimer', 'registrationType', 'actions'];
  buysellRequestColumns: string[] = ['id', 'buyer', 'seller', 'price', 'actions'];

  constructor(public clsService: CLSService) {
    this.cls = this.clsService.getCLS();

    // this.clsService.getAllRegistrationRequestsAwatingCLS().then(requests => {
    //   this.cls.incomingRegistrationRequests = requests;
    // });
  }

  approveRegistrationRequest(request: RegistrationRequest) {
    this.clsService.approveRegistrationRequest(this.cls, request);
  }

  rejectRegistrationRequest(request: RegistrationRequest) {
    this.clsService.rejectRegistrationRequest(this.cls, request);
  }

  approveBuySellRequest(request: BuySellRequest) {
    this.clsService.approveBuySellRequest(this.cls, request);
  }

  rejectBuySellRequest(request: BuySellRequest) {
    this.clsService.rejectBuySellRequest(this.cls, request);
  }



  ngOnInit() {
  }

}
