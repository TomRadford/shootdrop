import { ApolloProvider } from "@apollo/client"
import client from "../lib/apollo/client"
import "../styles/globals.css"
import { NextAdapter } from "next-query-params"
import { QueryParamProvider } from "use-query-params"
import NextProgress from "next-progress"

const App = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <QueryParamProvider adapter={NextAdapter}>
        <NextProgress
          // delay={0} setting higher than 0 triggers endless loader indication on Router.push
          color="#364667"
          customGlobalCss={`
				#nprogress {
					pointer-events: none;
				}
				#nprogress .bar {
					background: #364667;
					position: fixed;
					z-index: 0;
					top: 48px;
					left: 0;
					width: 100%;
					height: 2px;
				}
				@media (min-width: 768px) {
					#nprogress .bar {
						top: 0;
					}
				}
				/* Fancy blur effect */
				#nprogress .peg {
					display: block;
					position: absolute;
					right: 0px;
					width: 100px;
					height: 100%;
					box-shadow: 0 0 10px #364667, 0 0 5px #364667;
					opacity: 1.0;
					-webkit-transform: rotate(3deg) translate(0px, -4px);
							-ms-transform: rotate(3deg) translate(0px, -4px);
									transform: rotate(3deg) translate(0px, -4px);
				}
		
				`}
          options={{
            minimum: 0.3,
          }}
        />
        <Component {...pageProps} />
      </QueryParamProvider>
    </ApolloProvider>
  )
}

export default App
