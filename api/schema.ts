import gql from 'graphql-tag'

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
		fullName: String
		username: String!
		gearhouse: Boolean!
		drops: [Drop]
		profilePicture: String
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
		drop: Drop
		updatedAt: Date
	}

	type GearListItem {
		id: ID!
		gearList: GearList!
		gearItem: GearItem!
		quantity: Int
		prefs: [GearListGearPref]
		comment: String
		userThatUpdated: User
		updatedAt: Date
	}

	type GearListGearPref {
		pref: GearPref
		opts: [GearPrefOpt]
	}

	type Tag {
		name: String!
		category: [String]
		id: ID!
	}

	type GearItem {
		id: ID!
		category: [GearCategory]
		manufacturer: String!
		model: String!
		description: String
		images: [GearImage]
		productURL: String
		allPrefs: [GearPref]
		tags: [Tag]
	}

	type GearImage {
		id: ID
		url: String
		width: Int
		height: Int
	}

	type GearPref {
		id: ID
		gearItem: GearItem!
		name: String!
		allOpts: [GearPrefOpt]
	}

	type GearPrefOpt {
		id: ID!
		name: String!
	}

	type GearItemResults {
		gearItems: [GearItem]
		totalDocs: Int
		totalPages: Int
		page: Int
		prevPage: Int
		nextPage: Int
	}

	type ListItemResults {
		gearListItems: [GearListItem]
		totalDocs: Int
		totalPages: Int
		page: Int
		prevPage: Int
		nextPage: Int
	}

	type NewGearResult {
		sku: String!
		manufacturer: String!
		model: String!
		description: String
		imageUrls: [String]
		productURL: String
	}

	type Query {
		me: User
		allDrops(drop: String): [Drop!]
		allTags(tags: [String], tag: String, category: [GearCategory]): [Tag!]
		allGearItems(
			id: String
			category: GearCategory
			manufacturer: String
			model: String
			tags: [String]
			limit: Int
			offset: Int
			random: Boolean
		): GearItemResults
		getList(id: String!): GearList!
		getListItems(
			list: String!
			tags: [String]
			limit: Int
			offset: Int
		): ListItemResults!
		getProfileImageUpload: String!
		getGearImageUpload(gearItem: String!): String!
		allUsers(fullName: String): [User]
		findNewGear(searchTerm: String!): [NewGearResult]
	}

	input GearPrefInput {
		id: String
		name: String
		allOpts: [String!]
	}

	input ListPrefInput {
		id: String
		opts: [String!]
	}

	type Mutation {
		login(username: String!, password: String!): Token!
		passwordReset(username: String!): Boolean!
		createUser(
			username: String!
			password: String!
			fullName: String
			profilePicture: String
			captchaToken: String!
		): User!
		editMe(
			username: String
			password: String
			profilePicture: String
			fullName: String
		): User!
		addTag(name: String, category: [GearCategory]): Tag!
		addGearItem(
			category: [GearCategory]
			manufacturer: String!
			model: String!
			description: String
			productURL: String
			tags: [String]
			prefs: [GearPrefInput]
		): GearItem!
		editGearItem(
			id: String!
			category: [GearCategory]
			manufacturer: String
			model: String
			description: String
			productURL: String
			tags: [String]
			prefs: [GearPrefInput]
		): GearItem!
		addGearPref(gearItem: String!): GearPref!
		editGearPref(id: String, name: String): GearPref!
		removeGearPref(id: String!, gearItem: String!): String!
		addGearPrefOpt(gearPref: String): GearPref!
		editGearPrefOpt(id: String!, name: String): GearPrefOpt!
		removeGearPrefOpt(id: String!, gearPref: String!): GearPref!
		addGearImage(
			gearItem: String!
			width: Int
			height: Int
			url: String!
		): GearImage!
		removeGearImage(gearItem: String!, id: String): String!
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
		): Drop!
		updateDrop(
			id: String!
			users: [String]
			project: String
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
		addList(drop: String!, category: GearCategory!, comment: String): GearList!
		editList(id: String!, comment: String!): GearList!
		removeList(id: String!): Boolean!
		addListItem(
			list: String!
			gearItem: String!
			quantity: Int
			prefs: [ListPrefInput]
			comment: String
		): GearListItem!
		editListItem(
			list: String!
			id: String!
			quantity: Int
			prefs: [ListPrefInput]
			comment: String
		): GearListItem!
		removeListItem(list: String!, id: String!): String!
	}
`

export default typeDefs
