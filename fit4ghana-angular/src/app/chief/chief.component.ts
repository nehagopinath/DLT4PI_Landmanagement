import { Component, OnInit } from '@angular/core';
import { Chief } from 'src/models/chief';
import { ChiefService } from 'src/services/chief.service';
import { RegistrationRequest } from 'src/models/registration-request';

@Component({
  selector: 'app-chief',
  templateUrl: './chief.component.html',
  styleUrls: ['./chief.component.scss']
})
export class ChiefComponent implements OnInit {

  // chief: Chief = exampleChief;
  chief;
  registrationRequestColumns: string[] = ['id', 'claimer', 'registrationType', 'actions'];

  constructor(public chiefService: ChiefService) {
    // this.chief = this.chiefService.getChief();

    // this.chiefService.getAllRegistrationRequestsAwatingChief(this.chief).then(requests => {
    //   this.chief.incomingRegistrationRequests = requests;
    // });
  }

  // get chief
  getChief() {
    this.chiefService.getChief().then(m => {
      console.log(m);
      this.chief = m;
    });
  }

  // request ChiefService to approve this registration request
  approveRegistrationRequest(request: RegistrationRequest) {
    this.chiefService.approveRegistrationRequest(this.chief, request);
  }

  // request ChiefService to reject this registration request
  rejectRegistrationRequest(request: RegistrationRequest) {
    this.chiefService.rejectRegistrationRequest(this.chief, request);
  }

  ngOnInit() {
    this.getChief();
  }

}
