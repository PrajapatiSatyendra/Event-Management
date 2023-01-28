const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    customerName: String,
    email: String,
    mobileNumber: Number,
    ticketType: String,
    ticketPrice: Number,
    totalPrice: Number,
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    order_id: String,
        order_status: String,
    ticketId: Number,
    userID: String,
        qrCode: String,
    razorpay_payment_id: String,
    razorpay_signature:String
  },
  { timestamps: true }
);

module.exports = mongoose.model("bookedtickets", postSchema);