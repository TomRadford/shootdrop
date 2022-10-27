const { gql } = require("apollo-server-core")

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
    drop: String!
    items: [GearListItem]
  }

  type GearListItem {
    id: ID!
    gearItem: GearItem!
    quantity: Int
    prefs: [GearListGearPref]
    comment: String
    userThatUpdated: User
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
    category: [String!]
    manufacturer: String!
    model: String!
    description: String
    images: [Image]
    productURL: String
    allPrefs: [GearPref]
    tags: [Tag]
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

  type Image {
    url: String
    width: Int
    height: Int
  }

  type Query {
    me: User
    allDrops(drop: String): [Drop!]
    allTags(tag: String): [Tag!]
    allGearItems(
      id: String
      category: GearCategory
      manufacturer: String
      model: String
      tags: [String]
    ): [GearItem]
    getProfileImageUpload: String!
    allUsers(fullName: String): [User]
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
    createUser(
      username: String!
      password: String!
      fullName: String
      profilePicture: String
    ): User!
    editMe(
      username: String
      password: String
      profilePicture: String
      fullName: String
    ): User!
    addGearItem(
      category: [GearCategory!]
      manufacturer: String!
      model: String!
      description: String
      images: [String]
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
      images: [String]
      productURL: String
      tags: [String]
      prefs: [GearPrefInput]
    ): GearItem!
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
    ): GearList!
    editListItem(
      list: String!
      id: String!
      quantity: Int
      prefs: [ListPrefInput]
      comment: String
    ): GearList!
    removeListItem(list: String!, id: String!): GearList!
  }
`

module.exports = typeDefs
