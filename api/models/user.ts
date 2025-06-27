import mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema(
	{
		//NB: doubles as email address
		username: {
			type: String,
			required: true,
			minLength: 3,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		/**
		 * ToDo: decide if we still want to keep this?
		 */
		gearhouse: {
			type: Boolean,
			default: false,
		},
		/**
		 * Used for admins to be able to delete gear items, users, etc.
		 */
		admin: {
			type: Boolean,
			default: false,
		},
		fullName: String,
		profilePicture: String,
		//For early access control, manually set in db
		enabled: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
)

UserSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject.passwordHash
	},
})

const User = mongoose.model<typeof UserSchema>('User', UserSchema)

export default User
