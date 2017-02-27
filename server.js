var express = require('express'),
    exphbs  = require('express-handlebars'),
    bodyParser = require('body-parser');

var app = express();

<<<<<<< HEAD
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
    data003 = require('./public/data_json/003.json'),
    data011 = require('./public/data_json/011.json'),
    data012 = require('./public/data_json/012.json'),
    data013 = require('./public/data_json/013.json'),
    data021 = require('./public/data_json/021.json'),
    data022 = require('./public/data_json/022.json'),
    data023 = require('./public/data_json/023.json');
=======
app.use( bodyParser.json() );       // для поддержки JSON
app.use(bodyParser.urlencoded({     // для поддержки URL кодировки
  extended: true
}));
>>>>>>> backbone

// create instance of hbs-expr with specify propertys
var hbs = exphbs.create({
    handlebars: require('handlebars'),
    extname: '.hbs',
    defaultLayout: false
});

// маршрут до шаблонів
app.set('views', './views');
// шаблонізатор
// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// шлях до статичних файлів
app.use(express.static('./public'));

// Маршрутизація сторінок, запаковування даними із DB
require('./routes')(app);

// Локальний хост на порту
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
