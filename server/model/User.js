const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const data = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    eventId: [
      {
        type: Schema.Types.ObjectId,
        ref: "event",
      },
    ],
    bookingHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "bookedtickets",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', data)