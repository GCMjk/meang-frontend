import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@core/services/auth.service'; // Service

// Interfaces
import { ILoginForm, IResultLogin } from '@core/interfaces/login.interface';

// Alerts and toast from sweetAlert
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  minCharacters = 3;
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minCharacters)
    ])
  });

  submitted = false;

  constructor(private auth: AuthService, private router: Router) { }
  
  // Abbreviation of loginForm.controls
  get controls(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  // LogIn
  onSubmit(loginForm: ILoginForm) {
    this.auth.login(loginForm.email, loginForm.password).subscribe(
      (result:IResultLogin) => {

        if(result.status) {
          // Login: Success, user exists
          if(result.token !== null) {
            this.submitted = true;
            // LocalStorage
            this.auth.setSession(result.token);
            this.auth.updateSession(result);
            basicAlert(result.message, TYPE_ALERT.SUCCESS);
            this.router.navigate(['/home']);
            return;
          }
          // Login: Warning, invalid credentials
          basicAlert(result.message, TYPE_ALERT.WARNING);
          return;

        }

        // Login: Info, user does not exist
        basicAlert(result.message, TYPE_ALERT.INFO);
      }
    );
  }

}
