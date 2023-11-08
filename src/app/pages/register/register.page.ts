import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  data = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    biography: '',
  };
  constructor(
    private user: FormData,
    private authService: AuthService,
  ) {}

  ngOnInit() {}

  passwordMatch() { 
    return this.data.password === this.data.confirm_password;
  }
  register() {
    this.user.append('name', this.data.name); 
    this.user.append('username', this.data.username); 
    this.user.append('email', this.data.email);
    this.user.append('password', this.data.password);
    this.user.append('confirm_password', this.data.confirm_password);
    this.user.append('biography', this.data.biography);

    this.authService.signup(this.user).subscribe((res) => {
    console.log(res);
  })
  }

}
