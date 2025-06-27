import { Schema, model } from 'mongoose'

export const DropSchema = new Schema(
	{
		project: String,
		client: String,
		director: String,
		dop: String,
		soundie: String,
		gearCheckDate: Date,
		startDate: Date,
		endDate: Date,
		wrapDate: Date,
		users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		lists: [
			{
				type: Schema.Types.ObjectId,
				ref: 'GearList',
			},
		],
	},
	{ timestamps: true }
)

const Drop = model<typeof DropSchema>('Drop', DropSchema)

export default Drop
