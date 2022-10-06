import { ApolloProvider } from "@apollo/client"
import client from "../lib/apollo/client"
import "../styles/globals.css"

const App = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
