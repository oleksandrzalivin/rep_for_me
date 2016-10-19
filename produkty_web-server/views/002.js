module.exports = {content:
function(req, res){
    var title = '001';
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
            codeRef: false,
            href: '',
            codeID: 'Код продукту',
            photo: 'images/photo.png',
            name: 'Назва',
            sort: 'Сорт',
            harvest: 'Дата урожаю',
            date: 'Вжити до',
            cost: 'Ціна грн/кг'},{
  /* 02 груша */    
            codeRef: true,
            href: '002',
            codeID: '002',
            photo: 'images/pear.jpg',
            name: 'Груші',
            sort: '"Бера"',
            harvest: '2015',
            date: '2016',
            cost: '15'  
            }
        ]}
                ];
    res.render('index', {
        title:title,
        bar:bar, 
        table: table
    })
}
                 };