import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

interface LoginData {
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private router = inject(Router);
  data: LoginData = {
    username: "",
    password: "",
  }
  
  constructor() {}

  ngOnInit() {}

  login() {
    console.log(this.data)
    //this.router.navigate(['/tabs']);
  }
}
