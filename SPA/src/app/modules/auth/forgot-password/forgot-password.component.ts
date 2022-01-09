import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../resources/auth.service';
import { ProgressbarService } from 'src/app/shared/services/progressbar.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  userEmail: string;
  constructor(
    private authService: AuthService,
    private progressService: ProgressbarService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.alertService.info('Validating email');
    this.progressService.startLoading();

    const loginObserver = {
      next: (x) => {
        this.progressService.setSuccess();
        this.alertService.success('Check your email for reset link');
        this.progressService.completeLoading();
      },
      error: (err) => {
        this.progressService.setFailure();
        console.log(err);
        this.alertService.danger('Invalid email');
        this.progressService.completeLoading();
      }
    }

    // call service
    //this.authService.forgotPassword(this.userEmail).subscribe(loginObserver);
  }

}
