var db = require('../db').dbTree,
    ObjectID = require('../db').ObjectID;

module.exports = {
    index: function(req, res) {
        db(function(collection){
            collection.find().toArray(function(err, docs) {
                if(err) return res.status(500).send({status: 'Failed to find docs'});
                res.send(docs);
            })
        }) 
    },
    show: function(req, res) {
        
    },
    create: function(req, res) {console.log("req:",req)
        var params = req.body;
        db(function(collection){
            collection.insert(params, function(err) {
                if (err) return res.status(500).send({status: "Failed to create doc"});
                res.send(params);
            })
        })
    },
    destroy: function(req, res) {
        var id = req.params.id;
        doc = req.body;
        db(function(collection) {
            collection.remove({_id: new ObjectID(id)}, function(err) {
                if(err) return res.status(500).send({err: err});
                res.send(doc);
            });
        });
    },
    update: function(req, res) {
        var id = req.params.id,
            doc = req.body;
        delete doc._id;
        db(function(collection) {
            collection.update({_id: new ObjectID(id)}, doc, function(err) {
                if(err) return res.status(500).send({err: err});
                res.send(doc);
            });
        });
    }
};