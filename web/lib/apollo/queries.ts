import { gql } from '@apollo/client'

export const USER_DETAILS = gql`
	fragment UserDetails on User {
		id
		username
		fullName
		profilePicture
		admin
	}
`

export const GEAR_ITEM_DETAILS = gql`
	fragment GearItemDetails on GearItem {
		id
		category
		manufacturer
		model
		description
		productURL
		images {
			id
			url
			width
			height
		}
		allPrefs {
			id
			name
			allOpts {
				id
				name
			}
		}
		tags {
			id
			name
		}
	}
`

// Only request required gear item details ??
// export const GEAR_LIST_ITEM_DETAILS = gql`
//   fragment GearListItemDetails on GearListItem {
//     id
//     gearItem {
//       ...GearItemDetails
//     }
//     quantity
//     prefs {
//       pref {
//         id
//         name
//         allOpts {
//           name
//           id
//         }
//       }
//       opts {
//         name
//         id
//       }
//     }
//     comment
//     userThatUpdated {
//       id
//       fullName
//       profilePicture
//     }
//   }
//   ${GEAR_ITEM_DETAILS}
// `

export const LIST_DETAILS = gql`
	fragment ListDetails on GearList {
		id
		category
		comment
		title
		drop {
			id
			project
			users {
				id
			}
		}
		updatedAt
	}
`

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`

export const PASSWORD_RESET = gql`
	mutation passwordReset($username: String!) {
		passwordReset(username: $username)
	}
`

export const CREATE_USER = gql`
	mutation createUser(
		$fullName: String!
		$username: String!
		$password: String!
		$captchaToken: String!
	) {
		createUser(
			fullName: $fullName
			username: $username
			password: $password
			captchaToken: $captchaToken
		) {
			...UserDetails
		}
	}
	${USER_DETAILS}
`

export const ME = gql`
	query Me {
		me {
			...UserDetails
		}
	}
	${USER_DETAILS}
`

export const ME_DROPS = gql`
	query MeDrops {
		me {
			fullName
			id
			profilePicture
			drops {
				id
				project
				client
				director
				dop
				soundie
				gearCheckDate
				startDate
				endDate
				wrapDate
				updatedAt
				users {
					id
					profilePicture
				}
			}
		}
	}
`

export const EDIT_ME = gql`
	mutation editMe(
		$username: String
		$password: String
		$profilePicture: String
		$fullName: String
	) {
		editMe(
			username: $username
			password: $password
			profilePicture: $profilePicture
			fullName: $fullName
		) {
			...UserDetails
		}
	}
	${USER_DETAILS}
`

export const DROP_DETAILS = gql`
	fragment DropDetails on Drop {
		id
		project
		client
		director
		dop
		soundie
		gearCheckDate
		startDate
		endDate
		wrapDate
		updatedAt
		users {
			...UserDetails
		}
		lists {
			...ListDetails
		}
	}
	${USER_DETAILS}
	${LIST_DETAILS}
`
export const ALL_DROPS = gql`
	query allDrops($drop: String!) {
		allDrops(drop: $drop) {
			...DropDetails
		}
	}
	${DROP_DETAILS}
`

export const ALL_USERS = gql`
	query allUsers($fullName: String) {
		allUsers(fullName: $fullName) {
			...UserDetails
		}
	}
	${USER_DETAILS}
`

export const ADD_DROP = gql`
	mutation addDrop($project: String!, $client: String) {
		addDrop(project: $project, client: $client) {
			...DropDetails
		}
	}

	${DROP_DETAILS}
`

export const REMOVE_DROP = gql`
	mutation removeDrop($drop: String!) {
		removeDrop(drop: $drop)
	}
`

export const DUPLICATE_DROP = gql`
	mutation duplicateDrop($drop: String!, $project: String!, $client: String!) {
		duplicateDrop(drop: $drop, project: $project, client: $client) {
			...DropDetails
		}
	}
	${DROP_DETAILS}
`

export const UPDATE_DROP = gql`
	mutation updateDrop(
		$id: String!
		$project: String
		$client: String
		$director: String
		$dop: String
		$soundie: String
		$gearCheckDate: Date
		$startDate: Date
		$endDate: Date
		$wrapDate: Date
		$users: [String]
	) {
		updateDrop(
			id: $id
			project: $project
			client: $client
			director: $director
			dop: $dop
			soundie: $soundie
			gearCheckDate: $gearCheckDate
			startDate: $startDate
			endDate: $endDate
			wrapDate: $wrapDate
			users: $users
		) {
			...DropDetails
		}
	}
	${DROP_DETAILS}
`

//ToDo: adding additional feilds
//along totalDocs & gearItems will
//break client cache updates, find a
//more streamlined approach
export const ALL_GEAR_ITEMS = gql`
	query allGearItems(
		$id: String
		$category: GearCategory
		$manufacturer: String
		$model: String
		$tags: [String]
		$offset: Int
		$limit: Int
		$random: Boolean
	) {
		allGearItems(
			id: $id
			category: $category
			manufacturer: $manufacturer
			model: $model
			tags: $tags
			offset: $offset
			limit: $limit
			random: $random
		) {
			totalDocs
			gearItems {
				...GearItemDetails
			}
		}
	}
	${GEAR_ITEM_DETAILS}
`

export const RANDOM_GEAR_ITEMS = gql`
	query randomGearItems(
		$id: String
		$category: GearCategory
		$manufacturer: String
		$model: String
		$tags: [String]
		$offset: Int
		$limit: Int
		$random: Boolean
	) {
		allGearItems(
			id: $id
			category: $category
			manufacturer: $manufacturer
			model: $model
			tags: $tags
			offset: $offset
			limit: $limit
			random: $random
		) {
			gearItems {
				id
				category
				manufacturer
				model
				description
				productURL
				images {
					id
					url
					width
					height
				}
			}
		}
	}
`

export const ADD_GEAR_ITEM = gql`
	mutation addGearItem(
		$category: [GearCategory!]
		$manufacturer: String!
		$model: String!
	) {
		addGearItem(
			category: $category
			manufacturer: $manufacturer
			model: $model
		) {
			...GearItemDetails
		}
	}
	${GEAR_ITEM_DETAILS}
`

export const REMOVE_GEAR_ITEM = gql`
	mutation removeGearItem($id: String!) {
		removeGearItem(id: $id)
	}
`

export const EDIT_GEAR_ITEM = gql`
	mutation editGearItem(
		$id: String!
		$category: [GearCategory]
		$manufacturer: String
		$model: String
		$description: String
		$productURL: String
		$tags: [String]
		$prefs: [GearPrefInput]
	) {
		editGearItem(
			id: $id
			category: $category
			manufacturer: $manufacturer
			model: $model
			description: $description
			productURL: $productURL
			tags: $tags
			prefs: $prefs
		) {
			...GearItemDetails
		}
	}
	${GEAR_ITEM_DETAILS}
`
export const ADD_GEAR_PREF = gql`
	mutation addGearPref($gearItem: String!) {
		addGearPref(gearItem: $gearItem) {
			id
			name
			allOpts {
				id
				name
			}
		}
	}
`

export const EDIT_GEAR_PREF = gql`
	mutation editGearPref($id: String!, $name: String!) {
		editGearPref(id: $id, name: $name) {
			id
			name
		}
	}
`

export const REMOVE_GEAR_PREF = gql`
	mutation removeGearPref($id: String!, $gearItem: String!) {
		removeGearPref(id: $id, gearItem: $gearItem)
	}
`

export const ADD_GEAR_PREF_OPT = gql`
	mutation addGearPrefOpt($gearPref: String!) {
		addGearPrefOpt(gearPref: $gearPref) {
			id
			name
			allOpts {
				id
				name
			}
		}
	}
`

export const REMOVE_GEAR_PREF_OPT = gql`
	mutation removeGearPrefOpt($gearPref: String!, $id: String!) {
		removeGearPrefOpt(gearPref: $gearPref, id: $id) {
			id
			name
			allOpts {
				id
				name
			}
		}
	}
`

export const EDIT_GEAR_PREF_OPT = gql`
	mutation editGearPrefOpt($id: String!, $name: String!) {
		editGearPrefOpt(id: $id, name: $name) {
			id
			name
		}
	}
`

export const ADD_GEAR_IMAGE = gql`
	mutation addGearImage(
		$gearItem: String!
		$url: String!
		$width: Int
		$height: Int
	) {
		addGearImage(
			gearItem: $gearItem
			url: $url
			width: $width
			height: $height
		) {
			id
			url
			width
			height
		}
	}
`

export const REMOVE_GEAR_IMAGE = gql`
	mutation removeGearImage($id: String!, $gearItem: String!) {
		removeGearImage(id: $id, gearItem: $gearItem)
	}
`

export const ALL_TAGS = gql`
	query allTags(
		$tags: [String]
		$tag: String
		$category: [GearCategory]
		$limit: Int
	) {
		allTags(tags: $tags, tag: $tag, category: $category, limit: $limit) {
			id
			name
			category
		}
	}
`

export const ADD_TAG = gql`
	mutation addTag($name: String!, $category: [GearCategory]) {
		addTag(name: $name, category: $category) {
			id
			name
			category
		}
	}
`

export const REMOVE_TAG = gql`
	mutation removeTag($id: String!) {
		removeTag(id: $id)
	}
`

export const EDIT_TAG = gql`
	mutation editTag($id: String!, $name: String, $category: [GearCategory]) {
		editTag(id: $id, name: $name, category: $category) {
			id
			name
			category
		}
	}
`

export const GET_LIST = gql`
	query getList($id: String!) {
		getList(id: $id) {
			...ListDetails
		}
	}
	${LIST_DETAILS}
`

export const EDIT_LIST = gql`
	mutation editList($id: String!, $comment: String, $title: String) {
		editList(id: $id, comment: $comment, title: $title) {
			...ListDetails
		}
	}
	${LIST_DETAILS}
`

export const ADD_LIST = gql`
	mutation addList($drop: String!, $category: GearCategory!, $comment: String) {
		addList(drop: $drop, category: $category, comment: $comment) {
			...ListDetails
		}
	}
	${LIST_DETAILS}
`

export const REMOVE_LIST = gql`
	mutation removeList($id: String!) {
		removeList(id: $id)
	}
`

const GEAR_LIST_ITEM_DETAILS = gql`
	fragment GearListItemDetails on GearListItem {
		id
		quantity
		comment
		updatedAt
		createdAt
		gearItem {
			...GearItemDetails
		}
		userThatUpdated {
			...UserDetails
		}
		prefs {
			pref {
				id
				name
			}
			opts {
				id
				name
			}
		}
	}
	${GEAR_ITEM_DETAILS}
	${USER_DETAILS}
`

export const GET_LIST_ITEMS = gql`
	query getListItems(
		$list: String!
		$limit: Int
		$offset: Int
		$tags: [String]
		$sort: SortOrder
	) {
		getListItems(
			list: $list
			limit: $limit
			offset: $offset
			tags: $tags
			sort: $sort
		) {
			totalDocs
			gearListItems {
				...GearListItemDetails
			}
		}
	}
	${GEAR_LIST_ITEM_DETAILS}
`

export const ADD_LIST_ITEM = gql`
	mutation addListItem(
		$list: String!
		$gearItem: String!
		$quantity: Int
		$prefs: [ListPrefInput]
		$comment: String
	) {
		addListItem(
			list: $list
			gearItem: $gearItem
			quantity: $quantity
			prefs: $prefs
			comment: $comment
		) {
			...GearListItemDetails
		}
	}
	${GEAR_LIST_ITEM_DETAILS}
`

export const EDIT_LIST_ITEM = gql`
	mutation editListItem(
		$list: String!
		$id: String!
		$quantity: Int
		$prefs: [ListPrefInput]
		$comment: String
	) {
		editListItem(
			list: $list
			id: $id
			quantity: $quantity
			prefs: $prefs
			comment: $comment
		) {
			...GearListItemDetails
		}
	}
	${GEAR_LIST_ITEM_DETAILS}
`

export const REMOVE_LIST_ITEM = gql`
	mutation removeListItem($list: String!, $id: String!) {
		removeListItem(list: $list, id: $id)
	}
`
