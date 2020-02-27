const mongoose = require('mongoose');


const hosterSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
}, {
    timestamps:true
});

module.exports = mongoose.model('Hoster',hosterSchema);