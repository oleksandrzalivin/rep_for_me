var db = require('../db').dbAdmin;

module.exports = {
    index: function(req, res) {
        db(function(tweets){
            console.log("in rest-controller-1");
            tweets.find().toArray(function(err, docs) {
                if(err) return res.status(500).send({status: 'Failed to find tweets'});
                res.send(docs)
            })
        }) 
    },
    show: function(req, res) {
        
    },
    create: function(req, res) {/*
        var params = req.body;
        console.log("params:", params);
        db(function(tweets){
            console.log("in rest-controller-2");
            tweets.insert(params, function(err) {
                if (err) return res.status(500).send({status: "Failed to write to the DBtweets"});
                res.send(params)
            })
        })*/
    },
    destroy: function(req, res) {
        
    },
    update: function(req, res) {
        
    }
};