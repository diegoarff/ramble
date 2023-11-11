import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  errorMessages: { [key: string]: { [key: string]: string } } = {
    identifier: {
      required: 'identifier is required',
      minlength: 'identifier must be at least 2 characters',
      maxlength: 'identifier cannot be more than 25 characters',
    },
    password: {
      required: 'Password is required',
      minlength: 'Password must be at least 8 characters',
      maxlength: 'Password cannot be more than 50 characters',
      pattern: 'Password must contain at least one uppercase and one number',
    },
    bio: {
      maxlength: 'Bio cannot be more than 160 characters',
    },
  };

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      identifier: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
        ],
      ],
      bio: ['', [Validators.maxLength(160)]],
    });
  }

  async updateProfile() {
    //   if (this.loginForm.invalid) {
    //     return;
    //   }
    //   console.log(this.loginForm.value);
    // const res = await  this.authService.signin(this.loginForm.value)
    // if (res.status == 'success') {
    //   await Preferences.set({ key: 'token', value: res.data.token });
    //   await Preferences.set({key:"userId", value: res.data.userId})
    //   this.router.navigate(['/tabs']);
    // }
  }

  getErrorMessage(controlName: string) {
    let control = this.loginForm.get(controlName);
    if (control) {
      for (let errorName in control.errors) {
        if (this.errorMessages[controlName][errorName]) {
          return this.errorMessages[controlName][errorName];
        }
      }
    }
    return '';
  }
}
