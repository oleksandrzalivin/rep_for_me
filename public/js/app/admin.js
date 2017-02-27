define(['jquery', 'underscore', 'backbone', './src/drawTree'], function ($, _, Backbone, fu_tree) {
    // відкривання-закривання вузлів
    window.tree_toggle = function(event) {
        event = event || window.event;
        var clickedElem = event.target || event.srcElement;

        if (!hasClass(clickedElem, 'Expand')) {
            return; // клик не там
        }

        // Node, на который кликнули
        var node = clickedElem.parentNode;
        if (hasClass(node, 'ExpandLeaf')) {
            return; // клик на листе
        }

        // определить новый класс для узла
        var newClass = hasClass(node, 'ExpandOpen') ? 'ExpandClosed' : 'ExpandOpen';
        // заменить текущий класс на newClass
        // регексп находит отдельно стоящий open|close и меняет на newClass
        var re =  /(^|\s)(ExpandOpen|ExpandClosed)(\s|$)/;
        node.className = node.className.replace(re, '$1' + newClass + '$3');
        
        function hasClass(elem, className) {
        return new RegExp("(^|\\s)" + className+"(\\s|$)").test(elem.className);
        }
    }
    
    // Колекція моделей дерева структури сайту
    var Tree = Backbone.Collection.extend({
        model: Backbone.Model.extend({
            idAttribute: "_id"
        }),
        url: "/REST"
    }),
        // екземпляр колекції
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
                file = $('input[type=file]').prop('files');
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
                        success: function() {
                            console.log("file sent");
                        }
                    });
                }
            // new element: "5873b8ebf36d2872530dfeac", new categ: "586e6219f36d282f8ecbb80a"
            if (id == "5873b8ebf36d2872530dfeac" || id == "586e6219f36d282f8ecbb80a") {
                this.model.set(this.newAtr() ).unset("_id");
                tree.add(this.model).save({}, {
                    success: function() {
                        console.log('successfully created model');
                        tree.fetch({
                            success: function() {console.log('retrive data for "tree" model from server')},
                            error: function() {console.log('cannot retrive data for "tree" model from server')}
                            });
                    },
                    error: function() {console.log('cannot create model')}
                });
            } else {
            tree.get(id).set(this.newAtr() ).save({}, {
                success: function() {console.log('successfully update model_id: ' + id)},
                error: function() {console.log('cannot update model_id: ' + id)}
            });
            }
            tree.trigger("update");
            // remove this view instance
            this.remove();
        },
        deleteItem: function(ev) {
            ev.preventDefault();
            var id = this.model.get("_id");
            tree.get(id).destroy({
                success: function() {console.log('successfully deleted model_id: ' + id)},
                error: function() {console.log('cannot delete model_id: ' + id)}
            });
            // remove this view instance
            this.remove();
        },
        // записує нові значення атрибутів із форми вводу
        newAtr: function() { 
            var atr = Object.create(null);
            var file = $('input[type=file]').prop('files');
            _.each(this.model.toJSON(), function(value, key, list) {
                var text = $("#" + key).val();
                if (text) {
                    if (key == "photo" && list.parent && file.length) {
                        text = "./images/" + file[0].name;
                    }
                    if (key == "img" && !list.parent && file.length) {
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

    // Педставлення колекції 'Tree'(всього дерева)
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
    
    var AppRouter = Backbone.Router.extend({
        routes: {
            //"*actions": "defaultRoute",
            'index': 'index',
            'test': 'test'
        },
        index: function() {
            console.log('index test dliya Zalivina');
        },
        test: function() {
            console.log("try router");
        }
    });
    Backbone.history.start();

    $(document).ready(function() {
        // initialize
        
        /*app_router.on('route:defaultRoute', function(actions) {
            console.log(actions);
        });*/
        
        new TreeView();
        new AppRouter();
       /* $('#test-route').on('click', function(event) {
            event.preventDefault();
            console.log('test route', window.app_router);
            debugger;
            window.app_router.navigate('admin', {trigger: true});
        });*/
    });
});
