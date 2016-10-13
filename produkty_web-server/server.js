var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');



app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.set('views', './views');
app.engine('handlebars', exphbs({defaultLayout: false}));
app.set('view engine', 'handlebars');


app.use('/home', express.static('./public'));
app.get('/see', function(req, res){
    var title = 'Продукти';
    var bar = {
        title:'Додаткові відомості', 
        option: [{
    opt:'option_1'},{
    opt:'option_2'},{
    opt:'option_3'},{
    opt:'option_4'}]
              };
    res.render('index', {title:title, bar:bar.title, option:bar.option})
});

app.use(function(req, res, next) {
        res.status(404).render('404', {title:'Not found', text: 'Sorry, cant find that!'});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

