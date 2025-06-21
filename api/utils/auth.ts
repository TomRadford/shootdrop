import { GraphQLError } from 'graphql'

export const checkAuth = (context) => {
	const { currentUser } = context
	if (!currentUser) {
		throw new GraphQLError('User not authenticated', {
			extensions: {
				code: 'UNAUTHENTICATED',
			},
		})
	}
	if (!currentUser.enabled) {
		throw new GraphQLError('User is not enabled', {
			extensions: {
				code: 'BAD_USER_INPUT',
			},
		})
	}
}

export const checkAdmin = (context) => {
	const { currentUser } = context
	if (!currentUser.admin) {
		throw new GraphQLError('User is not an admin', {
			extensions: {
				code: 'BAD_USER_INPUT',
			},
		})
	}
}

export const checkDropPermissions = (context, existingDrop) => {
	const { currentUser } = context
	if (!existingDrop) {
		throw new GraphQLError('Drop does not exist', {
			extensions: {
				code: 'BAD_USER_INPUT',
			},
		})
	}
	const canAdd = existingDrop.users.includes(currentUser._id)
	if (!canAdd) {
		throw new GraphQLError('User is not part of this drop', {
			extensions: {
				code: 'BAD_USER_INPUT',
			},
		})
	}
}
