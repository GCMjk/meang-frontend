import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';

import { IRegisterForm } from '@core/interfaces/register.interface';

import { LOGIN_QUERY, USER_LIST_QUERY, ME_DATA_QUERY } from '@graphql/operations/query/user';
import { REGISTER_USER } from '@graphql/operations/mutation/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) { }

  /**
   * General function for query services to GraphQL
   * @param query Query GraphQL
   * @param variables Variables
   * @param context Headers
   * @returns Mapping the variables
   */
  protected get(query: DocumentNode, variables: object = {}, context: object = {}){
    return this.apollo.watchQuery({
      query,
      variables,
      context,
      fetchPolicy: 'network-only'
    }).valueChanges.pipe(map((result) => {
      return result.data;
    }));
  }

  protected set(mutation: DocumentNode, variables: object = {}, context: object = {}) {
    return this.apollo.mutate({
      mutation,
      variables,
      context
    }).pipe(
      map((result) => {
        return result.data;
      })
    );
  }

}
