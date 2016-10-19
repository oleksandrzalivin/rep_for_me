module.exports = {content:
function(req, res){
    var title = 'Фрукти';
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
            },{
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
            },{
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
    var par = [{
        p: 'З самого дитинства ми тільки й чуємо — потрібно їсти свіжі фрукти й овочі, у них багато вітамінів, вони дуже корисні. А чому? Цього ніхто не пояснює. Давайте розберемося, що нам це дає, і в чому полягає користь овочів і фруктів.'},{
        p: '1 . Піднімають настій'},{
        p: 'Фрукти та овочі так само що шоколад — містять речовини (селен і фолієву кислоту), які сприяють виробленню ендорфінів. Якщо що-небудь не склалося — з’їжте яблуко або банан, і настрій покращиться.'},{
        p: '2 . Дарують бадьорість'},{
        p: 'Фрукти і овочі містять багато води — одночасно рятують і від голоду, і від спраги, швидко засвоюються. Якщо потрібен заряд бадьорості — кращого рішення не знайти. Тому ранковий сніданок так корисно починати з фруктів — і настрій піднімуть, і енергією зарядят.'},{
        p: '3 . Додають вітамінів'},{
        p: 'Скільки фармацевти не б’ються над створенням супервітамінок, а ідеального балансу знайти не можуть. Неможливо в одній таблетці умістити вітаміни так, щоб всі вони повністю засвоювалися! З овочами та фруктами такої проблеми не виникає — все гармонійно, все засвоюється.'},{
        p: '4 . Допомагають схуднути'},{
        p: 'Овочі та фрукти містять море клітковини, яка майже не містить калорій, але дає відчуття ситості. Тому їх можна їсти в будь-якій кількості і не боятися зайвої ваги — їй при такому раціоні нізвідки буде взятися. Вдобавок клітковина, немов липка стрічка, збирає шкідливі хімічні речовини і канцерогени і виводить їх з організма.'},{
        p: 'Ніщо так не страшне для серцево — судинної системи, як надлишок холестерину. Знизити його рівень в крові теж допоможуть фрукти і овочі. Холестерин потрапляє в організм з тваринною їжею і виробляється печінкою. У рослинній їжі холестерину немає, зате в ній є пектин, який допомагає виводити шкідливий холестерин з організма.'},{
        p: '6. Подовжують молодість'},{
        p: 'Пам’ятаете молодильні яблучка з казок? Так от — вони існують. Фрукти і овочі містять антиоксиданти, які допомагають оновлюватися клітинам організму і запобігають окисленню органічних сполук — просто кажучи, дозволяють вам бути молодшими.'}
    ];
    res.render('index', {
        title:title,
        bar:bar, 
        table: table,
        par:par
    })
}
                 };