var express = require('express'),
	app = express(),
	fs = require('fs'),
	exphbs  = require('express-handlebars');

app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/apples',function (req,res) {
	var apples = {
		antonovka:'the best'
	};
	res.json(apples);
});

app.get('/categories', function(req, res) {
	var suffix = 'my custom sting for demo';
	var table = [{
		column: 'code1',
		value: '004',
		photo: '../link/to/file1.jpg',
		name: 'Nazva1'
	}, {
		column: 'code2',
		value: '005',
		photo: '../link/to/file2.jpg',
		name: 'Nazva2'
	},{
		column: 'code3',
		value: '006',
		photo: '../link/to/file3.jpg',
		name: 'Nazva3'
	}];
	res.render('vegetable', { suffix: suffix, table: table });
	/*var fileContent = fs.readFile('./public/vegetable.html', 'utf-8' ,function(err, data) {
		console.log(err, data);
	});
	res.send('OK');*/
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});