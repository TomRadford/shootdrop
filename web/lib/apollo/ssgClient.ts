import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

// Simple client use with Static Site Generation (getStaticProps)
const httpLink = new HttpLink({ uri: 'https://api.shootdrop.com/graphql' })

const ssgClient = new ApolloClient({
	cache: new InMemoryCache(),
	link: httpLink,
	ssrMode: typeof window === 'undefined',
	connectToDevTools: process.env.NODE_ENV === 'development',
})

export default ssgClient
