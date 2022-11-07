const mongoose = require("mongoose")

//GearListItem
const subSchema = new mongoose.Schema(
  {
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

const schema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    comment: String,
    items: [subSchema],
    drop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drop",
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("GearList", schema)
