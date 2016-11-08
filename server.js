var express = require('express'),
    handlebars = require('handlebars'),
    layouts = require('handlebars-layouts'),
    fs = require('fs');

// Register layouts` helpers 
handlebars.registerHelper(layouts(handlebars));

var app = express(),
    exphbs  = require('express-handlebars');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
 
// Register partials via Handlebars
handlebars.registerPartial('layout', fs.readFileSync('./views/layouts/layout.hbs', 'utf8'));
handlebars.registerPartial('top', fs.readFileSync('./views/layouts/top.hbs', 'utf8'));
handlebars.registerPartial('bar', fs.readFileSync('./views/layouts/bar.hbs', 'utf8'));
handlebars.registerPartial('head', fs.readFileSync('./views/layouts/head.hbs', 'utf8'));
handlebars.registerPartial('table', fs.readFileSync('./views/layouts/table.hbs', 'utf8'));



/* Імпорт даних для шаблонізованих сторінок */
var dataIndex = require('./public/js/index'),
    dataFruit = require('./public/js/fruit'),
    dataVegetable = require('./public/js/vegetable'),
    dataSpice = require('./public/js/spice'),
    data001 = require('./public/js/001'),
    data002 = require('./public/js/002'),
    data003 = require('./public/js/003');
    data011 = require('./public/js/011'),
    data012 = require('./public/js/012'),
    data013 = require('./public/js/013');
    data021 = require('./public/js/021'),
    data022 = require('./public/js/022'),
    data023 = require('./public/js/023');

var hbs = exphbs.create({
    handlebars: require('handlebars'),
    extname: '.hbs',
    defaultLayout: false
});

/*Встановлення маршруту до шаблонів*/
app.set('views', './views');
/*Встановлення корневого шаблону і обробщика шаблонів*/
// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

/*Вказано шлях до статичних файлів*/
app.use(express.static('./public'));

/*Шаблонізована сторінка "індекс"=================*/
app.get('/see', dataIndex);
/*Шаблонізована сторінка "фрукти"===============*/
app.get('/fruit', dataFruit);
/*Шаблонізована сторінка "овочі"===============*/
app.get('/vegetable', dataVegetable);
/*Шаблонізована сторінка "спеції"===============*/
app.get('/spice', dataSpice);
/*Шаблонізована сторінка "товару"===============*/
app.get('/001', data001);
app.get('/002', data002);
app.get('/003', data003);
app.get('/011', data011);
app.get('/012', data012);
app.get('/013', data013);
app.get('/021', data021);
app.get('/022', data022);
app.get('/023', data023);
/*Повідомлення для неіснуючих маршрутів*/
app.use(function(req, res, next) {
        res.status(404).render('404', {title:'Not found', text: 'Sorry, cant find that!'});
});
/*Локальний хост на порту*/
app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);
