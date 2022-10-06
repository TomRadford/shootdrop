import { gql } from "@apollo/client"

export const USER_DETAILS = gql`
  fragment UserDetails on User {
    id
    username
    fullName
    profilePicture
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
