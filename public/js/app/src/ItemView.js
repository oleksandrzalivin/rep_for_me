define(['jquery', 'underscore', 'backbone', './categCollect'], function ($, _, Backbone) {
    var categories = App.Collections.collection;
    // представлення елемента
    var ItemView = Backbone.View.extend({
        tagName: 'div',
        parentTemplate: _.template(App.Templates.categ),
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
        },
        render: function() {
            var parent = categories.get(this.model.get("parent") );
            $("#tableDiv").html(this.$el.html(this.parentTemplate(parent.toJSON() ) ) );
            $("tbody").append(this.itemTemplate(this.model.toJSON() ) );
        }
    });
    return ItemView;
});