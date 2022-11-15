const mongoose = require("mongoose")
const aggregatePaginate = require("mongoose-aggregate-paginate-v2")
//GearListItem
const GearListItemSchema = new mongoose.Schema(
  {
    gearList: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GearList",
    },
    gearItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GearItem",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    userThatUpdated: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    prefs: [
      {
        pref: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "GearPref",
        },
        opts: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GearPrefOpts",
          },
        ],
      },
    ],
    comment: String,
  },
  { timestamps: true }
)
GearListItemSchema.plugin(aggregatePaginate)

const GearListSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    comment: String,
    drop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drop",
    },
  },
  {
    timestamps: true,
  }
)

module.exports = {
  GearList: mongoose.model("GearList", GearListSchema),
  GearListItem: mongoose.model("GearListItem", GearListItemSchema),
}
