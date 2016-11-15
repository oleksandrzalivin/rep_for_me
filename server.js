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
var db,
    url = 'mongodb://prod-user:user-prod@ds153667.mlab.com:53667/product';
MongoClient.connect(url, function(err, database){
    if (err){
        return console.log('err-1:', err)
    };
    //create cursor for access to our DB
    db = database;
    console.log('Connected to DB');
    //Локальний хост на порту
    app.listen(3000, function () {
        console.log('Example app listening on port 3000!')
    })
});

//Маршрутизація сторінок, запаковування даними із DB ======

app.get('/', function(req, res){
    var bar;
    db.collection('prod-data').find({"tag":"bar"}).toArray(function(err, baR) {
    bar = baR[0].bar
    });
    db.collection('prod-data').find({"tag":"index"}).toArray(function(err, result) {
    result[0].bar = bar;// add the data for menu by right of page with empty 'option_'
    res.render('index', result[0]);
        console.log(result[0]) // print only for this page
    })
});
app.get('/fruit', function(req, res){
    var bar;
    db.collection('prod-data').find({"tag":"bar"}).toArray(function(err, baR) {
    bar = baR[0].bar
    });
    db.collection('prod-data').find({"tag":"fruit"}).toArray(function(err, result) {
    result[0].bar = bar;
    res.render('index', result[0])
    })
});
app.get('/vegetable', function(req, res){
    var bar;
    db.collection('prod-data').find({"tag":"bar"}).toArray(function(err, baR) {
    bar = baR[0].bar
    });
    db.collection('prod-data').find({"tag":"vegetable"}).toArray(function(err, result) {
    result[0].bar = bar;
    res.render('index', result[0])
    })
});
app.get('/spice', function(req, res){
    var bar;
    db.collection('prod-data').find({"tag":"bar"}).toArray(function(err, baR) {
    bar = baR[0].bar
    });
    db.collection('prod-data').find({"tag":"spice"}).toArray(function(err, result) {
    result[0].bar = bar;
    res.render('index', result[0])
    })
});
app.get('/001', function(req, res){
    var bar;
    db.collection('prod-data').find({"tag":"bar"}).toArray(function(err, baR) {
    bar = baR[0].bar
    });
    db.collection('prod-data').find({"tag":"001"}).toArray(function(err, result) {
    result[0].bar = bar;
    res.render('index', result[0])
    })
});
app.get('/002', function(req, res){
    var bar;
    db.collection('prod-data').find({"tag":"bar"}).toArray(function(err, baR) {
    bar = baR[0].bar
    });
    db.collection('prod-data').find({"tag":"003"}).toArray(function(err, result) {
    result[0].bar = bar;
    res.render('index', result[0])
    })
});
app.get('/003', function(req, res){
    var bar;
    db.collection('prod-data').find({"tag":"bar"}).toArray(function(err, baR) {
    bar = baR[0].bar
    });
    db.collection('prod-data').find({"tag":"003"}).toArray(function(err, result) {
    result[0].bar = bar;
    res.render('index', result[0])
    })
});
app.get('/011', function(req, res){
    var bar;
    db.collection('prod-data').find({"tag":"bar"}).toArray(function(err, baR) {
    bar = baR[0].bar
    });
    db.collection('prod-data').find({"tag":"011"}).toArray(function(err, result) {
    result[0].bar = bar;
    res.render('index', result[0])
    })
});
app.get('/012', function(req, res){
    var bar;
    db.collection('prod-data').find({"tag":"bar"}).toArray(function(err, baR) {
    bar = baR[0].bar
    });
    db.collection('prod-data').find({"tag":"012"}).toArray(function(err, result) {
    result[0].bar = bar;
    res.render('index', result[0])
    })
});
app.get('/013', function(req, res){
    var bar;
    db.collection('prod-data').find({"tag":"bar"}).toArray(function(err, baR) {
    bar = baR[0].bar
    });
    db.collection('prod-data').find({"tag":"013"}).toArray(function(err, result) {
    result[0].bar = bar;
    res.render('index', result[0])
    })
});
app.get('/021', function(req, res){
    var bar;
    db.collection('prod-data').find({"tag":"bar"}).toArray(function(err, baR) {
    bar = baR[0].bar
    });
    db.collection('prod-data').find({"tag":"021"}).toArray(function(err, result) {
    result[0].bar = bar;
    res.render('index', result[0])
    })
});
app.get('/022', function(req, res){
    var bar;
    db.collection('prod-data').find({"tag":"bar"}).toArray(function(err, baR) {
    bar = baR[0].bar
    });
    db.collection('prod-data').find({"tag":"022"}).toArray(function(err, result) {
    result[0].bar = bar;
    res.render('index', result[0])
    })
});
app.get('/023', function(req, res){
    var bar;
    db.collection('prod-data').find({"tag":"bar"}).toArray(function(err, baR) {
    bar = baR[0].bar
    });
    db.collection('prod-data').find({"tag":"023"}).toArray(function(err, result) {
    result[0].bar = bar;
    res.render('index', result[0])
    })
});

//Повідомлення для неіснуючих маршрутів
app.use(function(req, res, next) {
        res.status(404).render('404', {
            title:'Not found',
            text: 'Sorry, cant find that!'
        })
})
