var express = require('express'),
    handlebars = require('handlebars'),
    layouts = require('handlebars-layouts'),
    fs = require('fs');

// Register layouts` helpers 
handlebars.registerHelper(layouts(handlebars));

var app = express(),
    exphbs  = require('express-handlebars');

// Register partials via Handlebars
handlebars.registerPartial('layout', fs.readFileSync('./views/layouts/layout.hbs', 'utf8'));
handlebars.registerPartial('top', fs.readFileSync('./views/layouts/top.hbs', 'utf8'));
handlebars.registerPartial('bar', fs.readFileSync('./views/layouts/bar.hbs', 'utf8'));
handlebars.registerPartial('head', fs.readFileSync('./views/layouts/head.hbs', 'utf8'));
handlebars.registerPartial('table', fs.readFileSync('./views/layouts/table.hbs', 'utf8'));

// Імпорт даних, локально з папки 'public' для шаблонізованих сторінок 
var dataIndex = require('./public/data_json/index.json'),
    dataFruit = require('./public/data_json/fruit.json'),
    dataVegetable = require('./public/data_json/vegetable.json'),
    dataSpice = require('./public/data_json/spice.json'),
    dataBar = require('./public/data_json/bar.json'),
    data001 = require('./public/data_json/001.json'),
    data002 = require('./public/data_json/002.json'),
    data003 = require('./public/data_json/003.json');
    data011 = require('./public/data_json/011.json'),
    data012 = require('./public/data_json/012.json'),
    data013 = require('./public/data_json/013.json');
    data021 = require('./public/data_json/021.json'),
    data022 = require('./public/data_json/022.json'),
    data023 = require('./public/data_json/023.json');

// create instance of hbs-expr with specify propertys
var hbs = exphbs.create({
    handlebars: require('handlebars'),
    extname: '.hbs',
    defaultLayout: false
});

// Встановлення маршруту до шаблонів
app.set('views', './views');
//Встановлення корневого шаблону і обробщика шаблонів
// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

/*Вказано шлях до статичних файлів*/
app.use(express.static('./public'));

//Маршрутизація сторінок, запаковування даними із джейсонів ======
var renDer = function(template, data){
    return function(req, res){
        //додаємо дані для БАРУ(меню з права з пустими опціями)
        data.bar = dataBar.bar;
        res.render(template, data)
    }
};
app.get('/', renDer('index', dataIndex));
app.get('/fruit', renDer('index', dataFruit));
app.get('/vegetable', renDer('index', dataVegetable));
app.get('/spice', renDer('index', dataSpice));
app.get('/001', renDer('index', data001));
app.get('/002', renDer('index', data002));
app.get('/003', renDer('index', data003));
app.get('/011', renDer('index', data011));
app.get('/012', renDer('index', data012));
app.get('/013', renDer('index', data013));
app.get('/021', renDer('index', data021));
app.get('/022', renDer('index', data022));
app.get('/023', renDer('index', data023));

//Повідомлення для неіснуючих маршрутів
app.use(function(req, res, next) {
        res.status(404).render('404', {
            title:'Not found',
            text: 'Sorry, cant find that!'
        })
});

//Локальний хост на порту
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
