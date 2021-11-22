import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import jwtDecode from 'jwt-decode';

import { AuthService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {

  constructor(private auth: AuthService, private router: Router) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    // Checking existing session
    if(this.auth.getSession() !== null) {
      console.log('Sesión existente');
      
      const dataDecode: any = this.decodeToken();
      console.log(dataDecode);
      // Token check
      if(dataDecode.exp < new Date().getTime() / 1000) {
        console.log('Sesion caducada');
        return this.redirect();
      }

      // ADMIN
      if(dataDecode.user.role === 'ADMIN') {
        console.log('Somos ADMIN');
        return true;
      }
      console.log('No ADMIN');
    }
    console.log('Sesion no valida o iniciada');
    return this.redirect();
  }

  redirect() {
    this.router.navigate(['/login']);
    return false;
  }

  decodeToken() {
    return jwtDecode(this.auth.getSession().token);
  }
  
}
