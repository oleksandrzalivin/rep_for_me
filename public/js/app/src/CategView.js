define(['jquery', 'underscore', 'backbone', './categCollect'], function ($, _, Backbone) {
    var categories = App.Collections.collection;
    // представлення категорії
    var CategoryView = Backbone.View.extend({
        tagName: "div",
        template: _.template(App.Templates.categ),
        itemTemplate: _.template(App.Templates.item),
        events: {
            "click table a": "onHrefClick"
        },
        onHrefClick: function(ev) {
            var target = ev.target;
            if ($(target).data('id') == this.model.get("_id") ) {
                return false;
            } else {
                // remove this view instance
                this.remove();
            }
            // remove this view instance
            this.remove();
        },
        _getData: function() {
            var data = categories.toJSON(),
                id = this.model.get("_id");
            var items = [];
            _.each(data, function(value, key, list) {
                if (value.parent == id) {
                    items.push(value);
                }
            });
            return items;
        },
        render: function() {
            var items = this._getData(),
                self = this;
            $("#tableDiv").html(this.$el.html(this.template(this.model.toJSON() ) ) );
            _.each(items, function(value, key, list) {
                $("tbody").append(self.itemTemplate(value) );
            });
        }
    });
    return CategoryView;
});
