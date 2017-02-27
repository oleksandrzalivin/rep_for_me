define(['jquery', 'underscore', 'backbone', './categCollect'], function ($, _, Backbone) {
    var categories = App.Collections.collection;
    // Педставлення категорій
    var CategoriesView = Backbone.View.extend({
        collection: categories,
        tagName: 'div',
        initialize: function() {
            this.render();
            this.collection.on("update", this.render, this);
        },
        events: {
            "click table a": "onHrefClick"
        },
        template: _.template(App.Templates.categs),
        onHrefClick: function(ev) {
            // delete this model
            this.remove();
        },
        _getData: function() {
            var data = this.collection.toJSON();
            var categories = [],
                newCategId = "586e6219f36d282f8ecbb80a";
            _.each(data, function(value, key, list) {
                if (!(value.parent) && value._id !== newCategId) {
                    categories.push(value);
                }
            });
            return categories
        },
        render: function() {
            var self = this,
                data = this._getData();
            _.each(data, function(element, index, data) {
                self.$el.append(self.template(element) );
            });
            $('#tableDiv').html(this.el);
        }

    });
    return CategoriesView;
});
