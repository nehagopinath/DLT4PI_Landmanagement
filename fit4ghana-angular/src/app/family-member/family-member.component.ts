import { Component, OnInit } from '@angular/core';
import { FamilyMember } from 'src/models/family-member';
import { exampleFamilyMember } from 'src/consts/example';

@Component({
  selector: 'app-family-member',
  templateUrl: './family-member.component.html',
  styleUrls: ['./family-member.component.scss']
})
export class FamilyMemberComponent implements OnInit {

  familyMember: FamilyMember = exampleFamilyMember;
  displayedColumns: string[] = ['id', 'coords', 'registrationType', 'actions'];

  // id: 1,
  // coords: '1.2.3',
  // community: trede,
  // registered: false,
  // registrationType: RegistrationType.UNDEFINED,
  // price: 10000000,
  // isForSale: false

  constructor() { }

  ngOnInit() {
  }

}
