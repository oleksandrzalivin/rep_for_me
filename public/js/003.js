module.exports = 
function(req, res){
    var title = '003';
    var bar = require('./bar.js'); 
   var table = [{
        
/* таблиця фруктів -------------------------------*/  
        tabId: 'tab_1',
        linkSelf: '/fruit',
        tabName: 'Фрукти',
        row: [{
 /*заголовки колонок gпродукту*/   
            codeRef: false,
            href: '',
            codeID: 'Код продукту',
            photo: 'images/photo.png',
            name: 'Назва',
            sort: 'Сорт',
            harvest: 'Дата урожаю',
            date: 'Вжити до',
            cost: 'Ціна грн/кг'},{
  /* 03 персик */  
            codeRef: true,
            href: '003',
            codeID: '003',
            photo: 'images/pers.jpg',
            name: 'Персики',
            sort: '"Вахтанг"',
            harvest: '2016',
            date: '2017',
            cost: '20'  
            }
        ]}
                ];
    res.render('index', {
        title:title,
        bar:bar, 
        table: table
    })
};