const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userid: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    rating: String,
    msg: String,
    status: Boolean
}, { timestamps: true });

module.exports = mongoose.model("Feedback", postSchema);