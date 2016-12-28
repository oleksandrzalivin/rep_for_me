// MongoDB
var MongoClient = require('mongodb').MongoClient;

var mongoDB,
    admin,
    url = 'mongodb://prod-user:user-prod@ds153667.mlab.com:53667/product';
mongoDB = function(view, tagDB, callback, item) {
    MongoClient.connect(url, function(err, db){
        if (err){
            return console.log('err-1:', err)
        };
        console.log('Connected to DB. Tag:', tagDB);
        // якщо це один елемент таблиці
        if (item) {
            var bar;
            db.collection('prodData').find({"tag":"bar"}).toArray(function(err, baR) {
            bar = baR[0].bar
            });
            db.collection('prodData').find({"tag": tagDB}).toArray(function(err, result) {
                function find(array, item) {
                  for (var i = 0; i < array.length; i++) {
                    if (array[i].codeID == item) return i;
                  }
                  console.log('The data for the','"', item, '"', 'not found');
                }; 
                var index = find(result[0].table[0].row, item);
                result[0].table[0].row = [result[0].table[0].row[0], result[0].table[0].row[index] ];
                result[0].bar = bar;// add the data for menu by right of page with empty 'option_'
                callback(view, result[0]);
        //        console.log(result[0])
                })
        } else {        
            var bar;
            db.collection('prodData').find({"tag":"bar"}).toArray(function(err, baR) {
            bar = baR[0].bar
            });
            db.collection('prodData').find({"tag": tagDB}).toArray(function(err, result) {
            result[0].bar = bar;// add the data for menu by right of page with empty 'option_'
            callback(view, result[0]);
    //        console.log(result[0])
            })
        }
    })
};
admin = function(callback) {
    MongoClient.connect(url, function(err, db){
        if (err){
            return console.log('err-1:', err)
        };
        console.log('Connected to DB for tweet');   
        callback(db.collection('prodData') )
    })
};
                        

module.exports = {
    mongoDB: mongoDB,
    dbAdmin: admin
};