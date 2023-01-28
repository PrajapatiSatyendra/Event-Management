const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('tokens', postSchema);