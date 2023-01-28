const Users = require('../model/User');
const Razorpay = require("razorpay");
const BookedTickets = require('../model/bookedTickets');
var QRCode = require("qrcode");
const Events = require('../model/Event');
const fetch = require('node-fetch');
require('dotenv').config();
const crypto = require("crypto");
const otpGenerator = require("otp-generator");



exports.checkout = async (req, res, next) => {
    try {
    const { userId, totalPrice, eventData, attendeesDetails } = req.body;
      let finalArr = [];
      var instance = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_SECRET_KEY,
      });

      const order= await instance.orders.create({
        amount: Number(totalPrice)*100,
        currency: "INR",
        notes: {
          key1: "value3",
          key2: "value2",
        },
      });
     
      console.log(order);

    for (let i = 0; i < attendeesDetails.length; i++) {
      const element = attendeesDetails[i];

      // let ticketId = Math.floor(Math.random() * 1000 + 1);
      let ticketId = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
      const dataOfAttendee = {
        "Customer Name": element.name,
        "Email": element.email,
        "Mobile no.": element.mobileNum,
        "Ticket type": element.ticketType,
        "Event name": eventData.eventName,
        "Ticket id": ticketId,
      };

      let url = await QRCode.toDataURL(JSON.stringify(dataOfAttendee));
      if (!url) {
        throw new Error("QR code generation error");
      }
      const post = new BookedTickets({
        customerName: element.name,
        email: element.email,
        mobileNumber: element.mobileNum,
        ticketType: element.ticketType,
        ticketPrice: element.ticketPrice,
        totalPrice:order.amount,
        eventId: eventData._id,
        order_id: order.id,
        order_status:order.status,
        ticketId,
        qrCode: url,
        userID: userId
      });

      const result = await post.save();
      // console.log(result);
      const result_2 = await Events.findById(eventData._id);
      updateObjectWithId(result_2.ticket, element.ticketId, result._id);

      function updateObjectWithId(arr, id, id2) {
        const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
        // console.log(arr, id);
        if (objWithIdIndex > -1) {

          (arr[objWithIdIndex].customersId).push(id2);

        }
        return arr;
      }

      await result_2.save();
      if (userId) {
        await Users.findByIdAndUpdate(userId, {
          $push: { bookingHistory: result._id },
        });
      }
      finalArr.push(result);

    }

    



    res.status(200).json({ message: true, order:order });

  } catch (error) {
    next(error);
  }
};

exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id,razorpay_payment_id,razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
       const result = await BookedTickets.updateMany(
         { order_id:razorpay_order_id },
         { order_status: "captured",razorpay_payment_id:razorpay_payment_id,razorpay_signature:razorpay_signature }
      );
     res.redirect(`https://lucknowjunction.com/success?reference=${razorpay_payment_id}`);
      // res.redirect(
      //   `http://localhost/success?reference=${razorpay_payment_id}`
      // );
    } else {
      res.status(400).json({ success: false });
    }
   
  } catch (error) {
    next(error);
  }
};

exports.getTickets = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const result = await BookedTickets.find({ razorpay_payment_id: order_id }).populate('eventId').exec();
    console.log("result",result);
    res.status(200).json({ message: "Successfully fetched", data: result });
  } catch (error) {
    next(error);
  }
}
