import { gql } from '@apollo/client'
import client from '../apollo/client'

const GET_PROFILE_IMAGE_UPLOAD = gql`
	query {
		getProfileImageUpload
	}
`

const getProfileImageUpload = async () => {
	const { data } = await client.query({
		query: GET_PROFILE_IMAGE_UPLOAD,
		fetchPolicy: 'no-cache',
	})
	return data.getProfileImageUpload
}

const GET_GEAR_IMAGE_UPLOAD = gql`
	query getGearImageUpload($gearItem: String!) {
		getGearImageUpload(gearItem: $gearItem)
	}
`

const getGearImageUpload = async (gearItemId) => {
	const { data } = await client.query({
		query: GET_GEAR_IMAGE_UPLOAD,
		fetchPolicy: 'no-cache',
		variables: {
			gearItem: gearItemId,
		},
	})
	return data.getGearImageUpload
}

export { getProfileImageUpload, getGearImageUpload }
