module.exports  = (app)=>{
    const events = require('../controllers/events.controller');
    const {upload} = require('../middleware/fileUpoad');



    app.post('/events',upload.single('image'),events.create);
    app.get('/events',events.findAll);
    app.get('/events/:eventId',events.findOne);
    app.put('/events/:eventId',upload.single('image'),events.update);
    app.delete('/events/:eventId',events.delete);

};