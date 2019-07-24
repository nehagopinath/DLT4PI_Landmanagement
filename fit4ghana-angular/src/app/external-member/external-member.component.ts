import { Component, OnInit } from '@angular/core';
import { ExternalMember } from 'src/models/external-member';
import { exampleExternalMember1 } from 'src/consts/example';

@Component({
  selector: 'app-external-member',
  templateUrl: './external-member.component.html',
  styleUrls: ['./external-member.component.scss']
})
export class ExternalMemberComponent implements OnInit {

  externalMember: ExternalMember = exampleExternalMember1;
  displayedColumns: string[] = ['id', 'coords', 'registrationType', 'actions'];

  constructor() { }

  ngOnInit() {
  }

}
