import { Component, OnInit } from '@angular/core';
import { LandService } from 'src/services/land.service';
import { Land } from 'src/models/land';

@Component({
  selector: 'app-register-land',
  templateUrl: './register-land.component.html',
  styleUrls: ['./register-land.component.scss']
})
export class RegisterLandComponent implements OnInit {

  registrationType;
  coords;
  price;

  constructor(public landService: LandService) { }

  ngOnInit() {
  }


  // request LandService to initiate land registration
  registerLand() {
    this.landService.requestLandRegistration(this.registrationType, this.coords, this.price).then(r => {
      console.log(r);
      alert(r);
    });
  }
}
