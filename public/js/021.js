module.exports = 
function(req, res){
    var title = '021';
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
  /* 01  кардамон */   
            codeRef: true,
            href: '021',
            codeID: '021',
            photo: 'images/kardam.jpg',
            name: 'Кардамон',
            harvest: '2016',
            date: '2017',
            cost: '13'  
            }
        ]}
                ];
    res.render('index', {
        title:title,
        bar:bar, 
        table: table
    })
};