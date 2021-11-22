import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Apollo } from 'apollo-angular';

import { ApiService } from '@graphql/services/api.service';
import { USER_LIST_QUERY } from '@graphql/operations/query/user';
import { IRegisterForm } from '@core/interfaces/register.interface';
import { REGISTER_USER } from '@graphql/operations/mutation/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService {

  constructor(apollo: Apollo) { 
    super(apollo);
   }

  // Get a list of registered users
  getUsers() {
    return this.get(USER_LIST_QUERY,
      {
        include: true
      }
    ).pipe(map((result: any) => {
      return result.users;
    }));
  }

  // Add API consumption methods
  register(user: IRegisterForm) {
    return this.set(REGISTER_USER,
      {
        user,
        include: false
      }).pipe(
      map((result: any) => {
        return result.register;
      })
    );
  }

}
