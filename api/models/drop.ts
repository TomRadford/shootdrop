import { Schema, model } from 'mongoose'

const schema = new Schema(
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

const Drop = model<typeof schema>('Drop', schema)

export default Drop
