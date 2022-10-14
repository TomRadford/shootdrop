import { gql } from "@apollo/client"
import client from "../apollo/client"


const GET_PROFILE_IMAGE_UPLOAD = gql`
  query {
    getProfileImageUpload
  }
`

const getProfileImageUpload = async () => {
  const { data } = await client.query({
    query: GET_PROFILE_IMAGE_UPLOAD,
    fetchPolicy: 'no-cache'
  })
  return data.getProfileImageUpload
}

export { getProfileImageUpload }


