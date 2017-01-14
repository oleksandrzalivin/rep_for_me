// MongoDB
var MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID;

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
            db.collection('prodData').find({"tag": tagDB}).toArray(function(err, result) {
                function find(array, item) {
                  for (var i = 0; i < array.length; i++) {
                    if (array[i].codeID == item) return i;
                  }
                  console.log('The data for the','"', item, '"', 'not found');
                }; 
                var index = find(result[0].table[0].row, item);
                result[0].table[0].row = [result[0].table[0].row[0], result[0].table[0].row[index] ];
                callback(view, result[0]);
        //        console.log(result[0])
                })
        } else {
            db.collection('prodData').find({"tag": tagDB}).toArray(function(err, result) {
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
        console.log('Connected to DB for admin');   
        callback(db.collection('prodData') )
    })
};
tree = function(callback) {
    MongoClient.connect(url, function(err, db){
        if (err){
            return console.log('err-1:', err)
        };
        console.log('Connected to DB for tree');   
        callback(db.collection('siteTree') )
    })
};
                        

module.exports = {
    mongoDB: mongoDB,
    dbAdmin: admin,
    dbTree: tree,
    ObjectID: ObjectID
};