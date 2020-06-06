import { ApolloClient, HttpLink, InMemoryCache, split } from 'apollo-boost'

import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000'
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
)

const cache = new InMemoryCache()
const client = new ApolloClient({
  cache: cache,
  resolvers: {
    Query: {
      getUserName() {
        return localStorage.getItem('userName')
      },
    },
    Mutation: {
      setUserName(_, { userName }, { cache }) {
        localStorage.setItem('userName', userName)
        cache.writeData({
          data: {
            userName: userName,
          }
        }) 
        return null
      }
    }
  },
  link: link,
})

cache.writeData({
  data: {
    userName: localStorage.getItem('userName'),
  },
})

export default client