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

	type Token {
		value: String!
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
		lists: [GearList]
	}

	type GearList {
		id: ID!
		category: String
		comment: String
		items: [GearListItem]
	}

	type GearListItem {
		gearItem: GearItem!
		quantity: Int
		prefs: [GearListGearPref]
	}

	type GearListGearPref {
		pref: GearPref
		opts: [GearPrefOpt]
	}

	type GearItem {
		id: ID!
		category: String!
		manufacturer: String!
		model: String!
		description: String
		images: [Image]
		productURL: String
		allPrefs: [GearPref]
	}

	type GearPref {
		gearItem: GearItem!
		name: String!
		allOpts: [GearPrefOpt]
	}

	type GearPrefOpt {
		name: String!
	}

	type Image {
		url: String
		width: Int
		height: Int
	}

	type Query {
		me: User!
		allDrops(drop: String): [Drop!]
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
      //add list here or new mutator?
		): Drop!
		updateDrop(
			id: String!
			project: String!
			client: String
			director: String
			dop: String
			soundie: String
			gearCheckDate: Date
			startDate: Date
			endDate: Date
			wrapDate: Date
		): Drop!
		removeDrop(drop: String!): Boolean!
	}
`

module.exports = typeDefs
