import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.page.html',
  styleUrls: ['./view-user.page.scss'],
})
export class ViewUserPage implements OnInit {
  private activedRoute = inject(ActivatedRoute);
  private userService = inject(UsersService);
  private router = inject(Router);
  constructor() {}
  userId = this.activedRoute.snapshot.paramMap.get('id');
  user: any;
  ngOnInit() {
    console.log(this.userId);
    this.loadUser();
  }

  async loadUser() {
    const res = await this.userService.getUser(this.userId!);
    this.user = res.data;
    console.log(this.user);
  }

  async blockUser() {
    const res = await this.userService.blockUser(this.userId!);
    console.log(res);
    if (res.status === 'success') {
      if (res.message == 'User blocked') {
        this.user.blocked = true;
      } else if (res.message == 'User unblocked') {
        this.user.blocked = false;
      }
    }
  }

  async followUser() {
    const res = await this.userService.followUser(this.userId!);
    console.log(res);
    if (res.status === 'success') {
      if (res.message == 'User followed') {
        this.user.following = true;
        this.user.followersCount++;
      } else if (res.message == 'User unfollowed') {
        this.user.following = false;
        this.user.followersCount--;
      }
    }
  }

  gotoFollows(filter: string) {
    this.router.navigate(['/view-follows', this.userId], {
      state: { filter, userId: this.userId },
    });
  }
}
