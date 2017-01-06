var db = require('../db').dbTree;

module.exports = {
    index: function(req, res) {
        db(function(collection){
            collection.find().toArray(function(err, docs) {
                if(err) return res.status(500).send({status: 'Failed to find tweets'});
                res.send(docs);
            })
        }) 
    },
    show: function(req, res) {
        
    },
    create: function(req, res) {console.log("req:",req)/*
        var params = req.body;
        console.log("params:", params);
        db(function(collection){
            collection.insert(params, function(err) {
                if (err) return res.status(500).send({status: "Failed to write to the DBtweets"});
                res.send(params);
            })
        })*/
    },
    destroy: function(req, res) {
        
    },
    update: function(req, res) {
        var id = req.body["_id"],
            doc = req.body;
        delete doc._id;
        db(function(collection) {
            collection.update({_id: id}, doc, { upsert: true }, function(err, numUpdated) {
                console.log(id, doc,"err",err,"num",numUpdated);
                if(err || numUpdated !==1) return res.send({err: err, num: numUpdated});
                res.send(doc);
            });
        });
    }
};