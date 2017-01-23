define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');
    require('./src/drawTree');// define functions for drawing in window scope
    
    
    // Модель дерева структури сайту
    var Tree = Backbone.Collection.extend({
        model: Backbone.Model.extend({
            idAttribute: "_id"
        }),
        url: "/REST"
    }),
        tree = new Tree();

    // представлення категорії(моделі із колекції)
    var CategView = Backbone.View.extend({
        tagName: "div",
        initialize: function(options) {
            this.template = _.template($("#categTemplate").html() );
        },
        events: {
            "click #save-btn": "saveItem",
            "click #delete-btn": "deleteItem"
        },
        saveItem: function(ev) {
            ev.preventDefault();
            var id = this.model.get("_id"),
                file = $('#photo').prop('files');
            if (file.length) {
                     // Создаем новый объект FormData
                    var fd = new FormData();

                    fd.append('file', file[0]);

                    // Загружаем файл

                    $.ajax({
                        url: '/file',
                        data: fd,
                        contentType:false,
                        processData:false,
                        type:'POST',
                        success: function(){
                            console.log("file sent");
                        }
                    });
                }
            
            if (id == "5873b8ebf36d2872530dfeac" || id == "586e6219f36d282f8ecbb80a") {
                this.model.set(this.newAtr() ).unset("_id");
                tree.add(this.model).save({}, {
                    success: function() {console.log('successfully created model')},
                    error: function() {console.log('cannot create model')}
                });
                tree.fetch({
                    success: function() {console.log('retrive data for "tree" model from server')},
                    error: function() {console.log('cannot retrive data for "tree" model from server')}
                    });
            } else {
            tree.get(id).set(this.newAtr() ).save({}, {
                success: function() {console.log('successfully update model_id: ' + id)},
                error: function() {console.log('cannot update model_id: ' + id)}
            });
    //        this.model.set(this.newAtr() );
    //        this.model.save();
            };
            tree.trigger("update");
            this.remove();// remove this view instance
        },
        deleteItem: function(ev) {
            ev.preventDefault();
            var id = this.model.get("_id");
            tree.get(id).destroy({
                success: function() {console.log('successfully deleted model_id: ' + id)},
                error: function() {console.log('cannot delete model_id: ' + id)}
            });
            this.remove();// remove this view instance
        }, 
        newAtr: function() { // записує нові значення атрибутів із сторінки
            var atr = Object.create(null);
            var file = $('#photo').prop('files');
            _.each(this.model.toJSON(), function(value, key, list) {
                var text = $("#" + key).val();
                if (text) {
                    if (key == "photo" && file.length) {
                        text = "./images/" + file[0].name;
                    }
                    atr[key] = text;
                }
            });
            return atr;
        },
        render: function() {
            $("#stuff").html(this.$el.html(this.template(this.model.toJSON() ) ) );
            return this;
        }
    });

    // Педставлення моделі 'Tree'
    var TreeView = Backbone.View.extend({
        collection: tree,
        el: $('#siteTree'),
        initialize: function() {
            this.collection.on("update", this.render, this),
            this.newFetch()
        },
        newFetch: function() {
            this.collection.fetch({
                success: function() {console.log('retrive data for "tree" model from server')},
                error: function() {console.log('cannot retrive data for "tree" model from server')}
                })
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
                        if (value._id == "5873b8ebf36d2872530dfeac" && id !== "586e6219f36d282f8ecbb80a") {// перший елемент - новий бланк
                            var val = _.clone(value);
                            val.parent = id;
                            parent.childrens.splice(0, 0, val);
                        };
                    });
                    if (id == "586e6219f36d282f8ecbb80a") {// new category
                        categories.splice(0, 0, parent);
                    } else {
                        categories.push(parent);
                    };
                };
            })
            return categories
        }

    });


    $(document).ready(function() {
        // initialize
        new TreeView();
    });
});
