const Hoster = require('../models/hoster.model');


exports.create = (req,res) => {

    const hoster = new Hoster({
        name:req.body.name,
        address: req.body.adr,
        email:req.body.email
    });

    hoster.save()
        .then( data => res.send(data))
        .catch(err => res.status(500).send({message:err.message}))
};

exports.findAll = (req,res)=> {
    Hoster.find()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({message:err.message}))
};


exports.findOne = (req,res)=>{
    Hoster.findById(req.params.hosterId)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({message:err.message}))
}

exports.update = (req,res) => {

    const hoster = {
        name:req.body.name,
        address:req.body.adr,
        email:req.body.email
    };

    Hoster.findByIdAndUpdate(req.params.hosterId,hoster,{new:true,runValidators:true})
        .then( data => res.send(data))
        .catch( err => res.status(500).send(err.message))
};

exports.delete = (req,res)=> {
    Hoster.findByIdAndDelete(req.params.hosterId)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({message:err.message}))
};