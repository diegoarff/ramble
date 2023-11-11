import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-follows',
  templateUrl: './view-follows.page.html',
  styleUrls: ['./view-follows.page.scss'],
})
export class ViewFollowsPage implements OnInit {
  private userService = inject(UsersService);
  private router = inject(Router);
  constructor() { }
  filter: string = this.router.getCurrentNavigation()!.extras.state!['filter'];
  userId: string = this.router.getCurrentNavigation()!.extras.state!['userId'];
  data: any[] = [];
  ngOnInit() {
  
this.chargeData();
}
async getFollowers() {
const res = await this.userService.getFollowersFromUser(this.userId);
if (res.status === 'success') {
  return res.data;
}

return [];
};
async getFollowing() {
  const res = await this.userService.getFollowingFromUser(this.userId);
  if (res.status === 'success') {
    return res.data;
  }
  return [];
}

async chargeData() {
  if(this.filter == 'followers'){
this.data = await    this.getFollowers();
}
if(this.filter == 'following'){
   this.data = await this.getFollowing();
}
}

}