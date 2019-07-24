import { Component } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { exampleFamilyMember } from 'src/consts/example';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fit4ghana-angular';

  user;

  constructor(public userService: UserService) {
    this.user = this.userService.setUser({
      id: exampleFamilyMember.id,
      email: '',
      lands: exampleFamilyMember.lands
    });
  }
}
