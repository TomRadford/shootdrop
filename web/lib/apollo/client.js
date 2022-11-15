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

//__typename cleanup middleware to prevent failed mutations
// https://stackoverflow.com/questions/47211778/cleaning-unwanted-fields-from-graphql-responses/51380645#51380645
const cleanupTypeName = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key, value) =>
      key === "__typename" ? undefined : value
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    )
  }
  return forward(operation).map((data) => {
    return data
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
        ApolloLink.from([cleanupTypeName, handleError, authLink, httpLink])
      )
    : httpLink

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // To merge fetchMore queries in cache:
        allGearItems: {
          keyArgs: ["id"], //ToDo: add keys based on filters
          // Prevents concatenation of existing entries in gearItems
          // and rather concats new values to existing while returning
          // the new total docs for incoming
          merge(
            existing = { gearItems: [], totalDocs: null },
            incoming,
            { args: { offset = 0 } }
          ) {
            const mergedGearItems = existing.gearItems
              ? existing.gearItems.slice(0) //slice used to immutable existing
              : []
            for (let i = 0; i < incoming.gearItems.length; ++i) {
              mergedGearItems[offset + i] = incoming.gearItems[i]
            }
            return { totalDocs: incoming.totalDocs, gearItems: mergedGearItems }
          },
        },
        getListItems: {
          keyArgs: ["list"], //ToDo: add keys based on filters
          // Prevents concatenation of existing entries in gearItems
          // and rather concats new values to existing while returning
          // the new total docs for incoming
          merge(
            existing = { gearListItems: [], totalDocs: null },
            incoming,
            { args: { offset = 0 } }
          ) {
            const mergedGearItems = existing.gearListItems
              ? existing.gearListItems.slice(0) //slice used to immutable existing
              : []
            for (let i = 0; i < incoming.gearListItems.length; ++i) {
              mergedGearItems[offset + i] = incoming.gearListItems[i]
            }
            return {
              totalDocs: incoming.totalDocs,
              gearListItems: mergedGearItems,
            }
          },
        },
      },
    },
    Drop: {
      fields: {
        users: {
          // To solve 'Cannot automatically merge arrays' error
          // https://github.com/apollographql/apollo-client/issues/6868
          merge(existing, incoming) {
            return incoming
          },
        },
      },
    },
    GearItem: {
      fields: {
        tags: {
          merge(existing, incoming) {
            return incoming
          },
        },
        allPrefs: {
          merge(existing, incoming) {
            return incoming
          },
        },
        images: {
          merge(existing, incoming) {
            return incoming
          },
        },
      },
    },
    GearPref: {
      fields: {
        allOpts: {
          merge(existing, incoming) {
            return incoming
          },
        },
      },
    },
  },
})

const client = new ApolloClient({
  cache,
  link: splitLink,
  connectToDevTools: process.env.NODE_ENV === "development",
  ssrMode: typeof window === "undefined",
})

export default client
