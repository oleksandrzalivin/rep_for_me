var MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID;

// url with user`s name and password
var url = 'mongodb://prod-user:user-prod@ds153667.mlab.com:53667/product';

function getDataForTree (callback) {
    MongoClient.connect(url, function(err, db){
        if (err){
            console.log('err:', err);
        }
        console.log('Connected to DB');
        callback(db.collection('siteTree'));
    });
}                       

module.exports = {
    dbTree: getDataForTree,
    ObjectID: ObjectID
}