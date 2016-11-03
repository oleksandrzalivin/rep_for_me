module.exports = 
function(req, res){
    var title = '012';
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
  /* 02 огірки */    
            codeRef: true,
            href: '012',
            codeID: '012',
            photo: 'images/ogir.jpg',
            name: 'Огірки',
            sort: '"Альфа"',
            harvest: '2015',
            date: '2016',
            cost: '5,70'  
            }
               ]}
                ];
    res.render('index', {
        title:title,
        bar:bar, 
        table: table
    })
};