import { gql } from "@apollo/client"

export const USER_DETAILS = gql`
  fragment UserDetails on User {
    id
    username
    fullName
    profilePicture
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username:$username, password: $password) {
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
  mutation editMe($username:String, $password: String, $profilePicture: String, $fullName: String){
    editMe(username:$username, password: $password, profilePicture: $profilePicture, fullName: $fullName) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`