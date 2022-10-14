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
    ) {
      ...DropDetails
    }
  }
  ${DROP_DETAILS}
`

export const GET_PROFILE_IMAGE_UPLOAD = gql`
  query {
    getProfileImageUpload
  }
`
