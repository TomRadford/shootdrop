const { gql } = require('apollo-server-core')

const typeDefs = gql`
	scalar Date

	type User {
		id: ID!
		username: String!
		gearhouse: Boolean!
		drops: [Drop]
	}

	type Drop {
		id: ID!
		project: String!
		client: String
		dop: User
		director: User
		gearCheckDate: Date
		startDate: Date
		endDate: Date
		wrapDate: Date
		updatedAt: Date
		users: [User!]
	}

	type Token {
		value: String!
	}

	type Query {
		me: User!
		allDrops: [Drop!]
	}

	type Mutation {
		login(username: String!, password: String!): Token!
		createUser(username: String!, password: String!): User!
		editMe(password: String!): Boolean!
		addDrop(
			project: String!
			client: String
			dop: String
			director: String
			gearCheckDate: Date
			startDate: Date
			endDate: Date
			wrapDate: Date
			updatedAt: Date
			createdAt: Date
		): Drop!
		removeDrop(drop: String!): Boolean!
	}
`

module.exports = typeDefs
