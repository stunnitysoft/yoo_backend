module.exports  = (app)=>{
  const hosters = require('../controllers/hoster.controller');
    app.post('/hosters',hosters.create);
    app.get('/hosters',hosters.findAll);
    app.get('/hosters/:hosterId',hosters.findOne);
    app.put('/hosters/:hosterId',hosters.update);
    app.delete('/hosters/:hosterId',hosters.delete);

};