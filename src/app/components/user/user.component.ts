import { Component, Input, OnInit } from '@angular/core';
import { IUserBasic } from 'src/app/interfaces/Users';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent  implements OnInit {

  @Input() user: IUserBasic = {} as IUserBasic;

  ngOnInit() {}

}
