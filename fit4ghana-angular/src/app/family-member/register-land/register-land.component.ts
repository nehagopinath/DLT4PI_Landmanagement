import { Component, OnInit } from '@angular/core';
import { LandService } from 'src/services/land.service';
import { Land } from 'src/models/land';

@Component({
  selector: 'app-register-land',
  templateUrl: './register-land.component.html',
  styleUrls: ['./register-land.component.scss']
})
export class RegisterLandComponent implements OnInit {

  constructor(public landService: LandService) { }

  ngOnInit() {
  }


  // request LandService to initiate land registration
  registerLand(registrationType = 'statutory', coords = '0.0.0', price = 0) {
    this.landService.requestLandRegistration(registrationType, coords, price).then(r => {
      console.log(r);
    });
  }
}
