define(['jquery', 'underscore', 'backbone', './src/admin/drawTree', './src/admin/CategView'], 
       function ($, _, Backbone, fu_tree, CategView) {
    // екземпляр Колекція всіх документів сайту
    var categories = window.App.Collections.collection;

    // Педставлення колекції 'categories'(всього дерева)
    var TreeView = Backbone.View.extend({
        collection: categories,
        el: $('#siteTree'),
        initialize: function() {
            this.collection.on("update", this.render, this),
            this.newFetch()
        },
        newFetch: function() {
            this.collection.fetch({
                success: function() {console.log('retrive data for categories from server')},
                error: function() {console.log('cannot retrive data for categories from server')}
                });
            },
        events: {
            "click .treeHref": "onNodeClick"
        },
        render: function() {
            var categories = this._buildTreeFromData();
            this.$el.html("<div onclick='tree_toggle(arguments[0])'>" + fu_tree(categories) + "</div>");
        },
        deleteCategView: function() {
            this.categView.remove();
        },
        onNodeClick: function(ev) {
            var target = ev.target,
                id = $(target).data("id"),
                parentId = $(target).data("parent");
            ev.preventDefault();
            var model = this.collection.get(id).clone();
            new CategView({"model": model.set({parent: parentId})}).render();

        },
        _buildTreeFromData: function() {
            var data = this.collection.toJSON();
            var categories = [];
            _.each(data, function(value, key, list) {
                if (!(value.parent)) {
                    var parent = value;
                    var id = parent._id;
                    parent.childrens = [];
                    _.each(data, function(value, key, list) {
                        if (value.parent == id ) {
                            parent.childrens.push(value);
                        };
                        // якщо перший елемент - новий бланк чи нова категорія
                        if (value._id == "5873b8ebf36d2872530dfeac" && id !== "586e6219f36d282f8ecbb80a") {
                            var val = _.clone(value);
                            val.parent = id;
                            parent.childrens.splice(0, 0, val);
                        };
                    });
                    // якщо new category
                    if (id == "586e6219f36d282f8ecbb80a") {
                        categories.splice(0, 0, parent);
                    } else {
                        categories.push(parent);
                    }
                }
            });
            return categories;
        }
    });

    $(document).ready(function() {
        new TreeView();
        new AppRouter();
    });
});
