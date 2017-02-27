define(['jquery', 
        'underscore', 
        'backbone', 
        './src/ItemView', 
        './src/CategView', 
        './src/CategsView'], 
       function ($, _, Backbone, ItemView, CategoryView, CategoriesView) {
    // екземпляр Колекція всіх документів сайту
    var categories = window.App.Collections.collection;
    
    var AppRouter = Backbone.Router.extend({
        routes: {
            '*query': 'mainRoute'
        },
        mainRoute: function(query) {
            var self = this;
            if (!query) {
                if (!categories.toJSON().length) {
                    categories.fetch({
                        success: function() { console.log('retrive data for categories from server'); new CategoriesView(); },
                        error: function() {console.log('cannot retrive data for categories from server')}
                    });
                } else {
                    new CategoriesView();
                }
            } else {
                if (!categories.toJSON().length) {
                    categories.fetch({
                        success: function() {console.log('retrive data for categories from server'); self.getPageByRoute(query); },
                        error: function() {console.log('cannot retrive data for categories from server')}
                    });
                } else {
                    self.getPageByRoute(query);
                }
            }
        },
        getPageByRoute: function(query) {
            var splitStr = query.split('/'),
                self = this;
            var data = categories.toJSON();
            var find = _.find(data, function(value) {
                var id = value._id;
                // якщо категорія
                if (splitStr.length == 1) {
                    if (value.href == '#'+query) {
                        var model = categories.get(id).clone();
                        new CategoryView({"model": model}).render();
                        return true;
                    }
                }
                // якщо підкатегорія(після слеша)
                else if (splitStr.length == 2) {
                    if (value.href == '#'+query) {
                        var model = categories.get(id).clone();
                        new ItemView({model: model}).render();
                        return true;
                    }
                }
            });
            if (!find) console.log(query, ': such page not found');
        }
    });
    var appRouter = new AppRouter();
    Backbone.history.start();
});
