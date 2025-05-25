import { AuthenticationError, UserInputError } from 'apollo-server-core'

const checkAuth = (context) => {
	const { currentUser } = context
	if (!currentUser) {
		throw new AuthenticationError('User not authenticated')
	}
}

const checkDropPermissions = (context, existingDrop) => {
	const { currentUser } = context
	if (!existingDrop) {
		throw new UserInputError('Drop does not exist')
	}
	const canAdd = existingDrop.users.includes(currentUser._id)
	if (!canAdd) {
		throw new UserInputError('User is not part of this drop')
	}
}

export { checkAuth, checkDropPermissions }
