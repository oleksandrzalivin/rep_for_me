var home = require('./controllers/home'),
    rest = require('./controllers/rest');

module.exports = function(app) {
    app.get('/admin', home.admin);
    app.get('/', home.home);
    app.get('/404', home._404);
    
    // CRUD admin
    app.get('/REST', rest.index);
    app.post('/REST', rest.create);
    app.put('/REST/:id', rest.update);
    app.delete('/REST/:id', rest.destroy); 
    // здесь происходит загрузка картинки
    app.post('/file', rest.file);
    
    // Повідомлення для неіснуючих маршрутів
    /*
    app.use(function(req, res, next) {
            res.status(404).render('404', {
                title:'Not found',
                text: 'Sorry, cant find that!'
            })
    });
    */
};