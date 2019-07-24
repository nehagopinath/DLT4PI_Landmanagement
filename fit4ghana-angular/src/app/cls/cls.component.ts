import { Component, OnInit } from '@angular/core';
import { CLS } from 'src/models/cls';
import { CLSService } from 'src/services/cls.service';

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
  }

  ngOnInit() {
  }

}
