import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client"

import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"
import { getMainDefinition } from "@apollo/client/utilities"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { createClient } from "graphql-ws"

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("shootdrop-user-token")
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  }
})

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" })

const handleError = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message ${message}, Location: ${locations}, Path: ${path}`
      )
      if (message === "Context creation failed: jwt expired") {
        localStorage.clear()
        window.location.reload()
      }
    })
})

// Prevent Subscriptions/AuthLink on NextJS server with typeof check
const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: "ws://localhost:4000/subscriptions",
        })
      )
    : null

const splitLink =
  typeof window !== "undefined" && wsLink !== null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query)
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          )
        },
        wsLink,
        ApolloLink.from([handleError, authLink, httpLink])
      )
    : httpLink

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
  connectToDevTools: process.env.NODE_ENV === "development",
  ssrMode: typeof window === "undefined",
})

export default client
