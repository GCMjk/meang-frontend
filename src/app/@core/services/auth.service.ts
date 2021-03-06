import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Apollo } from 'apollo-angular';

import { ApiService } from '@graphql/services/api.service';
import { LOGIN_QUERY, ME_DATA_QUERY } from '@graphql/operations/query/user';

import { ISession } from '@core/interfaces/session.interface';
import { IMeData } from '@core/interfaces/session.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService{

  accessVar = new Subject<IMeData>();
  accessVar$ = this.accessVar.asObservable();

  constructor(apollo: Apollo) {
    super(apollo);
  }

  updateSession(newValue: IMeData) {
    this.accessVar.next(newValue);
  }

  startSession() {
    // Session Storage in LocalStorage
    if(this.getSession() !== null) {
      // If status false, logout
      this.getMe().subscribe((result:IMeData) => {
        if(!result.status) {
          this.resetSession();
          return;
        }
        this.updateSession(result);
      });
      // login
      console.log('sesion iniciada');
      return;

    }
    // session null
    this.updateSession({
      status: false
    });
    console.log('Sesion no iniciada');
  }

  login(email: string, password: string) {
    return this.get(LOGIN_QUERY, { email, password, include: false }).pipe(
      map( (result:any) => {
        return result.login;
      })
    );
  }

  getMe() {
    return this.get(ME_DATA_QUERY, 
      {
        include: false
      },
      {
        headers: new HttpHeaders({
          Authorization: (this.getSession() as ISession).token
        })
      }).pipe(map((result:any) => {
      return result.me;
    }));
  }

  setSession(token: string, expiresTimeInHours = 24) {
    const date = new Date();
    date.setHours(date.getHours() + expiresTimeInHours);
    
    const session: ISession = {
      expiresIn: new Date(date).toISOString(),
      token
    };
    localStorage.setItem('session', JSON.stringify(session));
  }

  getSession(): ISession {
    // JSON error
    return JSON.parse(localStorage.getItem('session') || '');
  }

  resetSession() {
    localStorage.removeItem('session');
    this.updateSession({status: false});
  }

}