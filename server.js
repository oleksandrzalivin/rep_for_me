var express = require('express'),
    exphbs  = require('express-handlebars'),
    bodyParser = require('body-parser');

var app = express();

app.use( bodyParser.json() );       // для поддержки JSON
app.use(bodyParser.urlencoded({     // для поддержки URL кодировки
  extended: true
}));

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
