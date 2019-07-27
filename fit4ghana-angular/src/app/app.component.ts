import { Component } from '@angular/core';
import { UserService } from 'src/services/user.service';

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
      id: 1,
      email: '',
      lands: []
    });
  }
}
