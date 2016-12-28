var home = require('./controllers/home_controller'),
    rest = require('./controllers/rest_controller');

module.exports = function(app) {
    app.get('/admin', home.admin);
    
    app.get('/tweeter', home.tweeter);
    app.get('/tweets', tweets.index);
    
    app.get('/', home.home);
    app.get('/fruit', home.fruit);
    app.get('/vegetable', home.vegetable);
    app.get('/spice', home.spice);
    app.get('/001', home._001);
    app.get('/002', home._002);
    app.get('/003', home._003);
    app.get('/011', home._011);
    app.get('/012', home._012);
    app.get('/013', home._013);
    app.get('/021', home._021);
    app.get('/022', home._022);
    app.get('/023', home._023);
    //CRUD admin
    app.get('/REST', rest.index);
    app.post('/REST', rest.create);
    app.get('/REST/:id', rest.show);
    app.put('/REST/:id', rest.update);
    app.delete('/REST/:id', rest.destroy)
};