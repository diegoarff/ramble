import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private router = inject(Router);

  constructor() {}

  ngOnInit() {}

  register() {
    this.router.navigate(['/login']);
  }
}
