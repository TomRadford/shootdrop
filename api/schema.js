const { gql } = require('apollo-server-core')

const typeDefs = gql`
	scalar Date

	enum GearCategory {
		CAMERA
		GRIPS
		LIGHTING
		SOUND
	}

	type User {
		id: ID!
		fullname: String
		username: String!
		gearhouse: Boolean!
		drops: [Drop]
	}

	type Drop {
		id: ID!
		project: String!
		client: String
		director: String
		dop: String
		soundie: String
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
			director: String
			dop: String
			soundie: String
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
