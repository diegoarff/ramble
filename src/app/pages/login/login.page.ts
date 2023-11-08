import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private router = inject(Router);
  private localstorage = inject(LocalstorageService);
  
   username: string = "";
   password: string = "";
  constructor(
    private data: FormData,
    private authService: AuthService,
  ) {}

  ngOnInit() {}
  
  login() {
    this.data.append('username', this.username);
    this.data.append('password', this.password);
    this.authService.signin(this.data).subscribe((res) => {
      console.log(res);
      if (res.status == "success") {
        if (res.message == "User logged in"){
          this.localstorage.set('token', res.data.token);
          this.router.navigate(['/tabs']);
        }
      }
    });
    
    //this.router.navigate(['/tabs']);
  }
}
