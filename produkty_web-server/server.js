var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
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
app.get('/see', function(req, res){
    var title = 'Продукти';
    var bar = {
        title:'Додаткові відомості', 
        option: [{
    opt:'option_1'},{
    opt:'option_2'},{
    opt:'option_3'},{
    opt:'option_4'}]
              };
    var table = [{
        
/* таблиця фруктів -------------------------------*/  
        tabId: 'tab_1',
        linkSelf: '/fruit',
        tabName: 'Фрукти',
        row: [{
 /*заголовки колонок gпродукту*/       
            codeID: 'Код продукту',
            photo: 'images/photo.png',
            name: 'Назва',
            sort: 'Сорт',
            harvest: 'Дата урожаю',
            date: 'Вжити до',
            cost: 'Ціна грн/кг'},{
  /* 01 яблуко */              
            codeID: '001',
            photo: 'images/aple.jpg',
            name: 'Яблука',
            sort: '"Піонер"',
            harvest: '2016',
            date: '2017',
            cost: '10'  
            },{
  /* 02 груша */              
            codeID: '002',
            photo: 'images/pear.jpg',
            name: 'Груші',
            sort: '"Бера"',
            harvest: '2015',
            date: '2016',
            cost: '15'  
            },{
  /* 03 персик */              
            codeID: '003',
            photo: 'images/pers.jpg',
            name: 'Персики',
            sort: '"Вахтанг"',
            harvest: '2016',
            date: '2017',
            cost: '20'  
            }
        ]},
         {
/* таблиця овочів --------------------------------*/ 
        tabId: 'tab_2',
        linkSelf: 'vegetable.html',
        tabName: 'Овочі',
        row: [{
 /*заголовки колонок gпродукту*/       
            codeID: 'Код продукту',
            photo: 'images/photo.png',
            name: 'Назва',
            sort: 'Сорт',
            harvest: 'Дата урожаю',
            date: 'Вжити до',
            cost: 'Ціна грн/кг'},{
  /* 01 помідори */              
            codeID: '011',
            photo: 'images/tomat.jpg',
            name: 'Помідори',
            sort: '"Богатир"',
            harvest: '2016',
            date: '2017',
            cost: '7'  
            },{
  /* 02 огірки */              
            codeID: '012',
            photo: 'images/ogir.jpg',
            name: 'Огірки',
            sort: '"Альфа"',
            harvest: '2015',
            date: '2016',
            cost: '5,70'  
            },{
  /* 03 картопля */              
            codeID: '013',
            photo: 'images/potato.jpg',
            name: 'Картопля',
            sort: '"Сова"',
            harvest: '2016',
            date: '2017',
            cost: '2,30'  
            }
        ]},
            {
/* таблиця спецій --------------------------------*/ 
        tabId: 'tab_3',
        linkSelf: 'spice.html',
        tabName: 'Спеції',
        row: [{
 /*заголовки колонок gпродукту*/       
            codeID: 'Код продукту',
            photo: 'images/photo.png',
            name: 'Назва',
            sort: 'Сорт',
            harvest: 'Дата урожаю',
            date: 'Вжити до',
            cost: 'Ціна грн/кг'},{
  /* 01 кардамон */              
            codeID: '021',
            photo: 'images/kardam.jpg',
            name: 'Кардамон',
            sort: '---',
            harvest: '2016',
            date: '2017',
            cost: '13'  
            },{
  /* 02 асафетида */              
            codeID: '022',
            photo: 'images/asafet.jpg',
            name: 'Асафетида',
            sort: '---',
            harvest: '2015',
            date: '2016',
            cost: '25,80'  
            },{
  /* 03 куркума */              
            codeID: '023',
            photo: 'images/kurkum.jpg',
            name: 'Куркума',
            sort: '---',
            harvest: '2016',
            date: '2017',
            cost: '19,50'  
            }
        ]} 
    ];
    res.render('index', {
        title:title, 
        bar:bar.title, 
        option:bar.option,
        table: table
    })
});
/*Шаблонізована сторінка "фрукти"===============*/
app.get('/fruit', function(req, res){
    var title = 'Фрукти';
    var bar = {
        title:'Додаткові відомості', 
        option: [{
    opt:'option_1'},{
    opt:'option_2'},{
    opt:'option_3'},{
    opt:'option_4'}]
              };
    res.render('fruit', {title:title, bar:bar.title, option:bar.option})
});
/*Повідомлення для неіснуючих маршрутів*/
app.use(function(req, res, next) {
        res.status(404).render('404', {title:'Not found', text: 'Sorry, cant find that!'});
});
/*Локальний хост на порту*/
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

