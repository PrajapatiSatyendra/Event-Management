const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const data = new Schema({
    filename:String,
    footerBanner1: {
        type: Schema.Types.ObjectId,
        ref: 'documents.files'
    }

})

module.exports = mongoose.model('FooterBanner', data)