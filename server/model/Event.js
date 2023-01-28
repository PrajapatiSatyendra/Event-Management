const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const data = new Schema({

    eventName: String,
    categary: String,
    eventDate: Date,
    startTime: String,
    endTime: String,
    location: String,
    desc: String,
    banner: {
        type: Schema.Types.ObjectId,
        ref: 'documents.files'
    },
    imageFilename:String,
    status: String,
    customId: String,
    trending: Boolean,
    ticket: [

        {
            ticketName: String,
            numberOfTickets: Number,
            ticketPrice: String,
            paymentCurrency: String,
            ticketInfo: String,
            customersId: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "bookedtickets",
                },
            ],
        }]
})

module.exports = mongoose.model('Event', data)