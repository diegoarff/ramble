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
  user = new FormData();
  constructor(
   
    private authService: AuthService,
  ) {}

  ngOnInit() {}

  passwordMatch() { 
    return this.data.password === this.data.confirm_password;
  }
  register() {
    this.user.delete('name')
    this.user.delete('username')
    this.user.delete('email')
    this.user.delete('password')
    this.user.delete('bio')
    this.user.append('name', this.data.name); 
    this.user.append('username', this.data.username); 
    this.user.append('email', this.data.email);
    this.user.append('password', this.data.password);
    this.user.append('bio', this.data.biography);
console.log(this.user.getAll('name'));
    this.authService.signup(this.user).subscribe((res) => {
    console.log(res);
  })
  }

}
