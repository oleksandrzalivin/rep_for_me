module.exports = 
function(req, res){
    var title = '022';
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
  /* 02 асафетида */    
            codeRef: true,
            href: '022',
            codeID: '022',
            photo: 'images/asafet.jpg',
            name: 'Асафетида',
            harvest: '2015',
            date: '2016',
            cost: '25,80'  
            }
        ]}
                ];
    res.render('index', {
        title:title,
        bar:bar, 
        table: table
    })
};