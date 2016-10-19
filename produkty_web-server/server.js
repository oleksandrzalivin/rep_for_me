var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
/* Імпорт значень для шаблонізованих сторінок */
var pageIndex = require('./views/index');
var pageFruit = require('./views/fruit');
var pageVegetable = require('./views/vegetable');
var pageSpice = require('./views/spice');
var page001 = require('./views/001');
var page002 = require('./views/002');
var page003 = require('./views/003');
/*
app.get('/', function (req, res) {
  res.send('Hello World!');
});
*/
/*Встановлення маршруту до шаблонів*/
app.set('views', './views');
/*Встановлення корневого шаблону і обробщика шаблонів*/
app.engine('handlebars', exphbs({defaultLayout: false}));
app.set('view engine', 'handlebars');
/*Вказано шлях до статичних файлів*/
app.use(express.static('./public'));
/*Шаблонізована сторінка "індекс"=================*/
app.get('/see', pageIndex.content);
/*Шаблонізована сторінка "фрукти"===============*/
app.get('/fruit', pageFruit.content);
/*Шаблонізована сторінка "овочі"===============*/
app.get('/vegetable', pageVegetable.content);
/*Шаблонізована сторінка "спеції"===============*/
app.get('/spice', pageSpice.content);
/*Шаблонізована сторінка "товару"===============*/
app.get('/001', page001.content);
app.get('/002', page002.content);
app.get('/003', page003.content);
/*Повідомлення для неіснуючих маршрутів*/
app.use(function(req, res, next) {
        res.status(404).render('404', {title:'Not found', text: 'Sorry, cant find that!'});
});
/*Локальний хост на порту*/
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});