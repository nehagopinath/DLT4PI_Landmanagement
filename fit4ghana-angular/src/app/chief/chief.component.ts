import { Component, OnInit } from '@angular/core';
import { exampleChief } from 'src/consts/example';
import { Chief } from 'src/models/chief';
import { ChiefService } from 'src/services/chief.service';

@Component({
  selector: 'app-chief',
  templateUrl: './chief.component.html',
  styleUrls: ['./chief.component.scss']
})
export class ChiefComponent implements OnInit {

  chief: Chief;
  registrationRequestColumns: string[] = ['id', 'claimer', 'registrationType', 'actions'];

  constructor(public chiefService: ChiefService) {
    this.chief = this.chiefService.getChief();
  }

  ngOnInit() {
  }

}
