module.exports = {
    admin: function(req, res){
        res.render('admin');
    },
    home: function(req, res){
        res.render("index");
    },
    _404: function(req, res){
        res.render("404");
    }
}