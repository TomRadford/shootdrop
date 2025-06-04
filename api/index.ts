import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express5'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

import { makeExecutableSchema } from '@graphql-tools/schema'

import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'

import express from 'express'
import http from 'http'
import cors from 'cors'

import jwt from 'jsonwebtoken'

import mongoose from 'mongoose'
import User from './models/user'

import typeDefs from './schema'
import resolvers from './resolvers/resolvers'

import logger from './utils/logger'
import config from './utils/config'

logger.info('Connecting to mongoDB')
mongoose
	.connect(config.MONGODB_URI as string)
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
	app.use(
		'/graphql',
		express.json(),
		expressMiddleware(server, {
			context: async ({ req }) => {
				const auth = req ? req.headers.authorization : null
				if (auth && auth.toLowerCase().startsWith('bearer ')) {
					const decodedToken = jwt.verify(
						auth.substring(7),
						config.SECRET as any
					) as any
					const currentUser = await User.findById(decodedToken.id)
					return { currentUser }
				}
				return {}
			},
		})
	)
	httpServer.listen(config.PORT, () => {
		logger.info(`Server now listening on ${config.PORT}`)
	})
}
start()
