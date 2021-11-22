import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';

// Errors
import { onError } from '@apollo/client/link/error';

// add the URL of the GraphQL server here
const uri = 'http://localhost:3001/graphql';

export function createApollo(httpLink: HttpLink) {
  // URI Api, Catching bugs by Apollo-error, concatenation of both and response
  const http = httpLink.create({uri});
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    
    if (graphQLErrors){
      console.log('GraphQL Errors', graphQLErrors);
    }

    if (networkError){
      console.log('Network Error', networkError);
    }

  });

  const link = errorLink.concat(http);
  return link;
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {

        const link = createApollo(httpLink);

        return {
          link,
          cache: new InMemoryCache(),
        };


      },
      deps: [HttpLink],
    },
  ],
})

export class GraphQLModule {  }