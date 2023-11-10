import { Component, OnInit, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.page.html',
  styleUrls: ['./view-user.page.scss'],
})
export class ViewUserPage implements OnInit {
private activedRoute = inject(ActivatedRoute)
private userService = inject(UsersService)
  constructor() { }
  user_id = this.activedRoute.snapshot.paramMap.get('id');
  user: any;
  ngOnInit() {
  console.log(this.user_id)
  this.loadUser()
}

async loadUser() {
  const res = await this.userService.getUser(this.user_id!);
  this.user = res.data;
  console.log(this.user);
}

async followUser() {
  const res = await this.userService.followUser(this.user_id!);
  console.log(res);
  if(res.status === 'success'){
    if (res.message == 'User followed') {
      this.user.following = true;
      this.user.followersCount ++; 
    } else if (res.message == 'User unfollowed') {
      this.user.following = false;
      this.user.followersCount --;
  }
 
}

}
}