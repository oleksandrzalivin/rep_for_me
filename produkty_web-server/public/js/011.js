module.exports = 
function(req, res){
    var title = '011';
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
  /* 01 помідори */   
            codeRef: true,
            href: '011',
            codeID: '011',
            photo: 'images/tomat.jpg',
            name: 'Помідори',
            sort: '"Богатир"',
            harvest: '2016',
            date: '2017',
            cost: '7'  
            }
        ]}
                ];
    res.render('index', {
        title:title,
        bar:bar, 
        table: table
    })
};