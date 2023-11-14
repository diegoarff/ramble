import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  profileForm: FormGroup = new FormGroup({});
  passwordForm: FormGroup = new FormGroup({});

  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private usersService = inject(UsersService);

  user: any = this.router.getCurrentNavigation()!.extras.state!['user'];

  errorMessages: { [key: string]: { [key: string]: string } } = {
    name: {
      required: 'Name is required',
      minlength: 'Name must be at least 2 characters',
      maxlength: 'Name cannot be more than 30 characters',
    },
    username: {
      required: 'identifier is required',
      minlength: 'identifier must be at least 2 characters',
      maxlength: 'identifier cannot be more than 25 characters',
    },
    bio: {
      maxlength: 'Bio cannot be more than 160 characters',
    },
    oldPassword: {
      required: 'Password is required',
      minlength: 'Password must be at least 8 characters',
      maxlength: 'Password cannot be more than 50 characters',
      pattern: 'Password must contain at least one uppercase and one number',
    },
    newPassword: {
      required: 'Password is required',
      minlength: 'Password must be at least 8 characters',
      maxlength: 'Password cannot be more than 50 characters',
      pattern: 'Password must contain at least one uppercase and one number',
    },
    confirmNewPassword: {
      required: 'Confirm password is required',
      minlength: 'Confirm password must be at least 8 characters',
      maxlength: 'Confirm password cannot be more than 50 characters',
      pattern:
        'Confirm password must contain at least one uppercase and one number',
    },
  };

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      name: [
        this.user.name,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      username: [
        this.user.username,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      bio: [this.user.bio, [Validators.maxLength(160)]],
    });

    this.passwordForm = this.formBuilder.group({
      oldPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
        ],
      ],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
        ],
      ],
      confirmNewPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
        ],
      ],
    });
  }

  async updateProfile() {
    if (this.profileForm.invalid) {
      return;
    }
    const res = await this.usersService.updateProfile(this.profileForm.value);
    if (res.status == 'success') {
      await this.usersService.logout();
      this.router.navigate(['/login']);
    }
  }

  async changePassword() {
    if (this.passwordForm.invalid) {
      return;
    }
    const res = await this.usersService.updatePassword(this.passwordForm.value);
    if (res.status == 'success') {
      await this.usersService.logout();
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.usersService.logout();
    this.router.navigate(['/login']);
  }

  async deleteAccount() {
    const res = await this.usersService.deleteAccount();
    if (res.status == 'success') {
      await this.usersService.logout();
      this.router.navigate(['/login']);
    }
  }

  getErrorMessage(controlName: string) {
    let control = this.profileForm.get(controlName);
    if (!control) control = this.passwordForm.get(controlName);

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
