const Event = require('../models/event.model');
const Hoster = require('../models/hoster.model');
// Create and Save a new Note
exports.create = (req, res) => {
// console.log(req.file);
    //validation

    // find hoster if exist
     Hoster.findById(req.body.hoster_id)
         .then(data => {
             const event = new Event({
                 title :req.body.title,
                 description:req.body.desc,
                 avenue: req.body.avenue,
                 date:req.body.date,
                 hoster_id: req.body.hoster_id,
                 imageUrl: req.file.secure_url,
                 imagePubId:req.file.public_id

             });

             // then save the data
             event.save()
                 .then(data => {
                     res.send(data)
                 })
                 .catch(err => {
                     res.status(500).send({
                         message: err.message || "Some error occurred while creating event"
                     })
                 })
         })
         .catch(err => res.status(500).send({found:false,msg:"We don't have such hoster"}));
    // return res.send().json(req.body);




};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

        Event.find()
            .then(data => res.send(data))
            .catch(error => res.status(500).send({message:error.message || "Some error occurred while retrieving events"}));
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Event.findById(req.params.eventId)
        .then( data => res.send(data))
        .catch(err => res.status(500).send({message:err.message || "Some error occured when we were finding the event"}));
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
        // return res.send(req.body);
        //valiadation

        Event.findByIdAndUpdate(req.params.eventId ,{
            title : req.body.title,
            description: req.body.desc,
            avenue : req.body.avenue,
            date : req.body.date,
            // updatedAt:Date.now(),
        }, {new:true,runValidators:true})
            .then(event =>{
                if(!event) return res.status(404).send({message:`The event with ${req.params.eventId} was not found`});
                res.send(event)
            })
            .catch(err => {
                if(err.kind) res.status(404).send({message:err.kind});
                res.status(500).send({message:err.message || "The event was not updated"})
            })
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Event.findByIdAndRemove(req.params.eventId)
        .then( event => {
            if(!event ) return res.status(404).send({message:`No event found with ${req.params.eventId} id`})

            res.send({message:'Event deleted succesfuly'})
        })
        .catch(err=> {
            if(err.kind || err.name) return res.status(404).send({message:[err.kind,err.name]})

            return res.status(500).send({message:'Event was not deleted'})

        })
};