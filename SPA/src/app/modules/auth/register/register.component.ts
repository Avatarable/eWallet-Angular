import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProgressbarService } from 'src/app/shared/services/progressbar.service';
import { AlertService } from 'ngx-alerts';
import { AuthService } from '../resources/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  roleOptions: string[] = ['Admin', 'Regular'];
  accountTypes: string[] = ['Noob', 'Elite'];

  model: any = {
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    confirmPassword: null,
    role: 'Regular',
    accountType: 'Noob',
  };
  constructor(
    private progressService: ProgressbarService,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.alertService.info('Creating new user');
    this.progressService.startLoading();

    const registerObserver = {
      next: (x) => {
        this.progressService.setSuccess();
        this.alertService.success('Account Created');
        this.progressService.completeLoading();
      },
      error: (err) => {
        this.progressService.setFailure();
        this.alertService.danger(err.error.errors[0].description);
        this.progressService.completeLoading();
      }
    }

    // call service
    this.authService.register(this.model).subscribe(registerObserver);
  }

  roleChange(value) {
    this.model.role = value;
  }

  claimChange(value) {
    this.model.accountType = value;
  }

  isAdmin(): boolean {
    return this.authService.currentUser.role == 'Admin' ? true : false;
  }

  isRegular(): boolean {
    return this.authService.currentUser.accountType == 'Regular' ? true : false;
  }
}
