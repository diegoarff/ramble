import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private router = inject(Router);

  constructor() {}

  ngOnInit() {}

  login() {
    this.router.navigate(['/tabs']);
  }
}
