import { Component, OnInit, inject } from '@angular/core';
import { IUserWithCounts } from 'src/app/interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  private usersService = inject(UsersService);
  user: IUserWithCounts | null = null;


  constructor() {}

  ngOnInit() {
    this.getProfile();
  }

  async getProfile() {
    const res = await this.usersService.getMe();
    if (res.status === 'success') {
      this.user = res.data;
    } else {
      // show alert
    }
  }
}
