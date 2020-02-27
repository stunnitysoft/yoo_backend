const multer = require('multer');
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

// const storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'./uploads/assets/eventImages')
//     },
//     filename:function (req,file,cb) {
//         let date = new Date();
//         let now =""+ date.getFullYear().toString()+date.getMonth().toString() + date.getDate().toString() + date.getTime().toString();
//         cb(null, now + file.originalname)
//     }
// });


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "yoo/event_images/",
    allowedFormats: ["jpg", "png"],
    // transformation: [{ width: 500, height: 500, crop: "limit" }]
});
// const parser = multer({ storage: storage });


const fileFilter = (req,file,cb) => {
    if(file.mimetype ==='image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null,true);

    } else {
        cb(null,false)
    }
};

module.exports.upload = multer({
    storage:storage,
    limits:{
        fileSize:1024 * 1024*10
    },
    fileFilter
});