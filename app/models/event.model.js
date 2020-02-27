const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
   title:{
       type:String,
       required:true
   },
   description:{
       type:String,
       minLength:50,
       required:true
   },
    avenue:{
       type:String,
       required:true
   },
   date:{
       type:Date,
       min:Date.now(),
       required:true
   },
    hoster_id:{
       type:Object,
        required:true
    },
    imageUrl:{
       type:String,
        required:true
    },
    imagePubId:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Event',eventSchema);