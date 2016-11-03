module.exports = 
function(req, res){
    var title = '013';
    var bar = require('./bar.js'); 
   var table = [{
        
/* таблиця овочів -------------------------------*/  
        tabId: 'tab_2',
        linkSelf: '/vegetable',
        tabName: 'Овочі',
        row: [{
 /*заголовки колонок gпродукту*/   
            codeRef: false,
            href: '#',
            codeID: 'Код продукту',
            photo: 'images/photo.png',
            name: 'Назва',
            sort: 'Сорт',
            harvest: 'Дата урожаю',
            date: 'Вжити до',
            cost: 'Ціна грн/кг'},{
  /* 03 картопля */  
            codeRef: true,
            href: '013',
            codeID: '013',
            photo: 'images/potato.jpg',
            name: 'Картопля',
            sort: '"Сова"',
            harvest: '2016',
            date: '2017',
            cost: '2,30'  
            }
               ]}
                ];
    res.render('index', {
        title:title,
        bar:bar, 
        table: table
    })
};