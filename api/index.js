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

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
