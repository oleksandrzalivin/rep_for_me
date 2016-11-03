module.exports = 
function(req, res){
    var title = '023';
    var bar = require('./bar.js'); 
   var table = [{
        
/* таблиця фруктів -------------------------------*/  
        tabId: 'tab_3',
        linkSelf: '/spice',
        tabName: 'Спеції',
        row: [{
 /*заголовки колонок gпродукту*/   
            codeRef: false,
            href: '',
            codeID: 'Код продукту',
            photo: 'images/photo.png',
            name: 'Назва',
            harvest: 'Дата урожаю',
            date: 'Вжити до',
            cost: 'Ціна грн/100гр'},{
  /* 03 куркума */  
            codeRef: true,
            href: '023',
            codeID: '023',
            photo: 'images/kurkum.jpg',
            name: 'Куркума',
            harvest: '2016',
            date: '2017',
            cost: '9,50'  
            }
        ]}
                ];
    res.render('index', {
        title:title,
        bar:bar, 
        table: table
    })
};