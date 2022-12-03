const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    fullname: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    pass:{
        required:true,
        type:String
    },

})

module.exports = mongoose.model('Data', userschema)