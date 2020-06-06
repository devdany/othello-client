import { ApolloProvider } from '@apollo/react-hooks'
import React from 'react'
import Routes from './Route'
import client from './apollo/client'
function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
      
    </div>
  )
}

export default App

