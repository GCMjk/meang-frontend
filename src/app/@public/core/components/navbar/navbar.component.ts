import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';

import { IMeData } from '@core/interfaces/session.interface';

import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  session: IMeData = {
    status: false
  };
  access = false;
  role: string | undefined;
  userLabel = '';

  constructor(private authService: AuthService, private router: Router) {

    this.authService.accessVar$.subscribe((result) => {
      this.session = result;
      this.access = this.session.status;
      this.role = this.session.user?.role;
      this.userLabel = `${ this.session.user?.name } ${ this.session.user?.lastname }`;
    });

  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.resetSession();
    this.router.navigate(['/']);
    basicAlert('Session closed successfully', TYPE_ALERT.INFO);
  }

}
