const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbconfig = require('./config/database.config');
const mongoose = require('mongoose');
require('dotenv').config();
require('./app/middleware/fileUpoad');


mongoose.Promise = global.Promise;




// make app accep url encoded and json data
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(morgan('dev'));

//serve images in public folder
app.use(express.static(__dirname + '/public'));





//configuration of database
mongoose.connect(dbconfig.url,{
    useNewUrlParser:true
})
    .then(()=>{
        console.log(`connected to ${dbconfig.url} succesfully`)
    })
    .catch((err)=>{
        console.log(`Refused to connect to ${dbconfig.url}`,err)
    });


//require event routes
require('./app/routes/event.route')(app);
require('./app/routes/hoster.route')(app);


app.get('/',(req,res) => {
   res.json({"message":"Hello you are there"})
});

app.listen(3000, ()=>{
    console.log('\tApp is now served at http://localhost:3000')
});