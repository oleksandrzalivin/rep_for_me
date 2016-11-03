module.exports = 
function(req, res){
    var title = '001';
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
  /* 01 яблуко */   
            codeRef: true,
            href: '001',
            codeID: '001',
            photo: 'images/aple.jpg',
            name: 'Яблука',
            sort: '"Піонер"',
            harvest: '2016',
            date: '2017',
            cost: '10'  
            }
        ]}
                ];
    res.render('index', {
        title:title,
        bar:bar, 
        table: table
    })
};