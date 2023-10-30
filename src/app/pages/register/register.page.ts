import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  biography: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private router = inject(Router);
  data: RegisterData = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    biography: '',
  };
  constructor() {}

  ngOnInit() {}

  passwordMatch() { 
    return this.data.password === this.data.confirm_password;
  }
  register() {
    console.log(this.data);
  }
}
