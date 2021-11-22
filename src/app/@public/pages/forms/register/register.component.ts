import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '@core/services/users.service'; // Service

// Interfaces
import { IRegisterForm, IResultRegister } from '@core/interfaces/register.interface';

// Alerts and toast from sweetAlert
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
// DatePicker
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  minCharacters = 3;
  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    lastname: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minCharacters)
    ]),
    birthday: new FormControl('', [
      Validators.required
    ])
  });

  submitted = false;

  constructor(private api: UsersService, private router: Router) { }

  ngOnInit(): void {
    const data = new Date();
    data.setFullYear(data.getFullYear() - 18);
    this.registerForm.value.birthday = (data.toISOString()).substring(0,10);
    console.log(this.registerForm.value);
  }

  // Abbreviation of loginForm.controls
  get controls(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  private formatNumbers(num: number | string) {
    return (+num < 10) ? `0${num}` : num;
  }

  // $event insert a JSON in case the birthday is not changed, Convert a string
  selectDate($event: NgbDateStruct) {
    const selectDate = `${$event.year}-${this.formatNumbers($event.month)}-${this.formatNumbers($event.day)}`;
    this.registerForm.value.birthday = selectDate;
    console.log('value', this.registerForm.value.birthday);
    return this.registerForm.value.birthday;
  }

  onSubmit(registerForm: IRegisterForm) {
    console.log(registerForm)
    this.api.register(registerForm).subscribe((result: IResultRegister) => {
      if(!result.status) {
        basicAlert(result.message, TYPE_ALERT.WARNING);
        return;
      }
      basicAlert(result.message, TYPE_ALERT.SUCCESS);
      this.router.navigate(['/login']);
    });
  }

}