const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const express = require('express')
const http = require('http')
const cors = require('cors')

const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const User = require('./models/user')

const typeDefs = require('./schema')
const resolvers = require('./resolvers/resolvers')

const logger = require('./utils/logger')
const config = require('./utils/config')

logger.info('Connecting to mongoDB')
mongoose
	.connect(config.MONGODB_URI)
	.then(() => logger.info('Connected to MongoDB'))
	.catch((e) => logger.error('Error connecting to MongoDB: ', e.message))

const start = async () => {
	const app = express()
	const httpServer = http.createServer(app)
	const schema = makeExecutableSchema({ typeDefs, resolvers })
	const wsServer = new WebSocketServer({
		server: httpServer,
		path: '',
	})
	const serverCleanup = useServer({ schema }, wsServer)
	const server = new ApolloServer({
		schema,
		cache: 'bounded',
		context: async ({ req }) => {
			const auth = req ? req.headers.authorization : null
			if (auth && auth.toLowerCase().startsWith('bearer ')) {
				const decodedToken = jwt.verify(auth.substring(7), config.SECRET)
				const currentUser = await User.findById(decodedToken.id)
				return { currentUser }
			}
		},
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose()
						},
					}
				},
			},
		],
	})
	await server.start()
	app.use(cors())
	app.get('/', (req, res) => {
		res.json({
			message: 'ShootDrop API',
		})
	})
	server.applyMiddleware({
		app,
		path: '/graphql',
	})
	httpServer.listen(config.PORT, () => {
		logger.info(`Server now listening on ${config.PORT}`)
	})
}
start()
