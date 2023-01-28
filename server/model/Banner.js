const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const data = new Schema({
    filename:String,
    navbarBanner: {
        type: Schema.Types.ObjectId,
        ref: 'documents.files'
    }

})

module.exports = mongoose.model('Banner', data)