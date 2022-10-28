import { gql } from "@apollo/client"

const USER_DETAILS = gql`
  fragment UserDetails on User {
    id
    username
    fullName
    profilePicture
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`

export const ME_DROPS = gql`
  query {
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

const DROP_DETAILS = gql`
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
      id
    }
  }
  ${USER_DETAILS}
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
const GEAR_ITEM_DETAILS = gql`
  fragment GearItemDetails on GearItem {
    id
    category
    manufacturer
    model
    description
    productURL
    allPrefs {
      name
      allOpts {
        name
      }
    }
    tags {
      id
      name
    }
  }
`

export const ALL_GEAR_ITEMS = gql`
  query allGearItems(
    $id: String
    $category: GearCategory
    $manufacturer: String
    $model: String
    $tags: [String]
  ) {
    allGearItems(
      id: $id
      category: $category
      manufacturer: $manufacturer
      model: $model
      tags: $tags
    ) {
      ...GearItemDetails
    }
  }
  ${GEAR_ITEM_DETAILS}
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

export const EDIT_GEAR_ITEM = gql`
  mutation editGearItem(
    $id: String!
    $category: [GearCategory]
    $manufacturer: String
    $model: String
    $description: String
    $images: [String]
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
      images: $images
      productURL: $productURL
      tags: $tags
      prefs: $prefs
    ) {
      ...GearItemDetails
    }
  }
  ${GEAR_ITEM_DETAILS}
`

export const ALL_TAGS = gql`
  query allTags($tag: String, $category: GearCategory) {
    allTags(tag: $tag, category: $category) {
      id
      name
      category
    }
  }
`
