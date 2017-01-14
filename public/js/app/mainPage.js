define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');
    
    
    // Модель дерева структури сайту
    var Categories = Backbone.Collection.extend({
        model: Backbone.Model.extend({
            idAttribute: "_id"
        }),
        url: "/REST"
    }),
        categories = new Categories();
    
// представлення елемента
    var ItemView = Backbone.View.extend({
//        collection: categories,
        tagName: "div",
        initialize: function(options) {
            this.template = _.template($("#tableTemplateCategory").html() );
        },
        events: {
            "click table a": "onHrefClick"
        },
        onHrefClick: function(ev) {
            var target = ev.target;
            if (!$(target).data('id') ) {
                var parent = categories.get(this.model.get("parent") );
                var model = parent.clone();
                new CategoryView({model: model}).render();
                this.remove();// remove this view instance
            }; 
            ev.preventDefault();
//            this.remove();// remove this view instance
        },
        render: function() {
            var parent = categories.get(this.model.get("parent") ),
                itemTemplate = _.template($('#itemTr').html() );
            $("#tableDiv").html(this.$el.html(this.template(parent.toJSON() ) ) );
            $("tbody").append(itemTemplate(this.model.toJSON() ) );
        }
    });


    // представлення категорії
    var CategoryView = Backbone.View.extend({
//        collection: categories,
        tagName: "div",
        initialize: function(options) {
            this.template = _.template($("#tableTemplateCategory").html() );
        },
        events: {
            "click table a": "onHrefClick"
        },
        onHrefClick: function(ev) {
            var target = ev.target;
            if ($(target).data('id') ) {
                id = $(target).data('id');
                var model = categories.get(id).clone();
                new ItemView({model: model}).render();
                this.remove();// remove this view instance
            }; 
            ev.preventDefault();
        },
        _getData: function() {
            var data = categories.toJSON(),
                id = this.model.get("_id");
            var items = [];
            _.each(data, function(value, key, list) {
                if (value.parent == id) {
                    items.push(value);
                };
            });
            return items;
        },
        render: function() {
            var items = this._getData(),
                itemTemplate = _.template($('#itemTr').html() );
            $("#tableDiv").html(this.$el.html(this.template(this.model.toJSON() ) ) );
            _.each(items, function(value, key, list) {
                $("tbody").append(itemTemplate(value) );
            })
        }
    });


    // Педставлення категорій
    var CategoriesView = Backbone.View.extend({
        collection: categories,
        tagName: 'div',
        initialize: function() {
            this.collection.on("update", this.render, this);
            this.newFetch();
        },
        events: {
            "click table a": "onHrefClick"
        },
        template: _.template($('#tableTemplateCategories').html() ),
        newFetch: function() {
            this.collection.fetch({
                success: function() {console.log('retrive data for categories from server')},
                error: function() {console.log('cannot retrive data for categories from server')}
                })
            },
        onHrefClick: function(ev) {
            var target = ev.target,
                id = $(target).data("id");
            ev.preventDefault();
            var model = this.collection.get(id).clone();
            new CategoryView({"model": model}).render();
            this.remove();
        },
        _getData: function() {
            var data = this.collection.toJSON();
            var categories = [];
            _.each(data, function(value, key, list) {
                if (!(value.parent) && value._id !== "586e6219f36d282f8ecbb80a") {
                    categories.push(value);
                };
            })
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


    $(document).ready(function() {
        // initialize
        new CategoriesView();
    });
});
