var express = require('express'),
    handlebars = require('handlebars'),
    layouts = require('handlebars-layouts'),
    MongoClient = require('mongodb').MongoClient,
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
handlebars.registerPartial('categTable', fs.readFileSync('./views/layouts/categTable.hbs', 'utf8'));

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

// MongoDB
var mongoDB,
    url = 'mongodb://prod-user:user-prod@ds153667.mlab.com:53667/product';
mongoDB = function(view, tagDB, callback) {
    MongoClient.connect(url, function(err, db){
        if (err){
            return console.log('err-1:', err)
        };
        console.log('Connected to DB');
        var bar;
        db.collection('prod-data').find({"tag":"bar"}).toArray(function(err, baR) {
        bar = baR[0].bar
        });
        db.collection('prod-data').find({"tag": tagDB}).toArray(function(err, result) {
        result[0].bar = bar;// add the data for menu by right of page with empty 'option_'
        callback(view, result[0]);
//        console.log(result[0])
        })
        
    })
};

//Маршрутизація сторінок, запаковування даними із DB ======

app.get('/', function(req, res){
    mongoDB("indexMain", "index", function(view, result) {
        res.render(view, result)
    })
});
app.get('/fruit', function(req, res){
    mongoDB("index", "fruit", function(view, result) {
        res.render(view, result)
    })
});
app.get('/vegetable', function(req, res){
    mongoDB("index", "vegetable", function(view, result) {
        res.render(view, result)
    })
});
app.get('/spice', function(req, res){
    mongoDB("index", "spice", function(view, result) {
        res.render(view, result)
    })
});
app.get('/001', function(req, res){
    mongoDB("index", "001", function(view, result) {
        res.render(view, result)
    })
});
app.get('/002', function(req, res){
    mongoDB("index", "002", function(view, result) {
        res.render(view, result)
    })
});
app.get('/003', function(req, res){
    mongoDB("index", "003", function(view, result) {
        res.render(view, result)
    })
});
app.get('/011', function(req, res){
    mongoDB("index", "011", function(view, result) {
        res.render(view, result)
    })
});
app.get('/012', function(req, res){
    mongoDB("index", "012", function(view, result) {
        res.render(view, result)
    })
});
app.get('/013', function(req, res){
    mongoDB("index", "013", function(view, result) {
        res.render(view, result)
    })
});
app.get('/021', function(req, res){
    mongoDB("index", "021", function(view, result) {
        res.render(view, result)
    })
});
app.get('/022', function(req, res){
    mongoDB("index", "022", function(view, result) {
        res.render(view, result)
    })
});
app.get('/023', function(req, res){
    mongoDB("index", "023", function(view, result) {
        res.render(view, result)
    })
});

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
})