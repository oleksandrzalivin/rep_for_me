var db = require('../db');

module.exports = {
    admin: function(req, res){
        res.render('indexAdmin')
    },
    home: function(req, res){
        db.mongoDB("indexMain", "index", function(view, result) {
            res.render(view, result)
            })
    },
    fruit: function(req, res){
        db.mongoDB("index", "fruit", function(view, result) {
            res.render(view, result)
        })
    },
    vegetable: function(req, res){
        db.mongoDB("index", "vegetable", function(view, result) {
            res.render(view, result)
        })
    },
    spice: function(req, res){
        db.mongoDB("index", "spice", function(view, result) {
            res.render(view, result)
        })
    },
    _001: function(req, res){
        db.mongoDB("index", "fruit", function(view, result) {
            res.render(view, result)
        }, '001')
    },
    _002: function(req, res){
        db.mongoDB("index", "fruit", function(view, result) {
            res.render(view, result)
        }, '002')
    },
    _003: function(req, res){
        db.mongoDB("index", "fruit", function(view, result) {
            res.render(view, result)
        }, '003')
    },
    _011: function(req, res){
        db.mongoDB("index", "vegetable", function(view, result) {
            res.render(view, result)
        }, '011')
    },
    _012: function(req, res){
        db.mongoDB("index", "vegetable", function(view, result) {
            res.render(view, result)
        }, '012')
    },
    _013: function(req, res){
        db.mongoDB("index", "vegetable", function(view, result) {
            res.render(view, result)
        }, '013')
    },
    _021: function(req, res){
        db.mongoDB("index", "spice", function(view, result) {
            res.render(view, result)
        }, '021')
    },
    _022: function(req, res){
        db.mongoDB("index", "spice", function(view, result) {
            res.render(view, result)
        }, '022')
    },
    _023: function(req, res){
        db.mongoDB("index", "spice", function(view, result) {
            res.render(view, result)
        }, '023')
    }
};