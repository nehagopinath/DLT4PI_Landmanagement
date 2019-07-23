import { Component, OnInit, Input } from '@angular/core';
import { Land } from 'src/models/land';

@Component({
  selector: 'app-land',
  templateUrl: './land.component.html',
  styleUrls: ['./land.component.scss']
})
export class LandComponent implements OnInit {

  @Input() land: Land = null;
  @Input() landViewType: 'self' | 'market' | 'other';

  constructor() { }

  ngOnInit() {
  }

}
