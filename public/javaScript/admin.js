// відкривання-закривання вузлів
function tree_toggle(event) {
    event = event || window.event;
    var clickedElem = event.target || event.srcElement;

    if (!hasClass(clickedElem, 'Expand')) {
        return // клик не там
    };

    // Node, на который кликнули
    var node = clickedElem.parentNode;
    if (hasClass(node, 'ExpandLeaf')) {
        return // клик на листе
    };

    // определить новый класс для узла
    var newClass = hasClass(node, 'ExpandOpen') ? 'ExpandClosed' : 'ExpandOpen';
    // заменить текущий класс на newClass
    // регексп находит отдельно стоящий open|close и меняет на newClass
    var re =  /(^|\s)(ExpandOpen|ExpandClosed)(\s|$)/;
    node.className = node.className.replace(re, '$1'+newClass+'$3')
};
function hasClass(elem, className) {
    return new RegExp("(^|\\s)"+className+"(\\s|$)").test(elem.className)
};

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
        var id = this.model.get("_id");
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
        _.each(this.model.toJSON(), function(value, key, list) {
            var text = $("#" + key).val();
            if (text) {
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
                    if (value._id == "5873b8ebf36d2872530dfeac") {// перший елемент - новий бланк
                        var val = _.clone(value);
                        val.parent = id;
                        parent.childrens.splice(0, 0, val);
                    };
                });
                categories.push(parent);
            };
        })
        return categories
    }

});

// create a tree from JSON
function fu_tree(categ) {
    // головний кореневий вузол
    var containerStr = 	'<ul class="Container">' +
                        '<li class="Node IsLast IsRoot ExpandOpen">' +
                        '<div class="Expand"></div>' +
                        '<div class="Content"><span id="title">Продукти</span></div>'
    // генерація вкладених елементів
    function tree(categ) {

        var str = "";
        // батьківський елемент
        str += "<ul class='Container'>";
        // дочірні елементи
        for (var key in categ) {
            // якщо останній елемент - записати необхідні стилі
            if (key == categ.length - 1) {
                // якщо є вкладені елементи - розпакувати
                if (categ[key].childrens) {
                    str = str + "<li class='Node ExpandClosed IsLast'><div class='Expand'></div>" + 
                    "<div class='Content'><a data-id='" + categ[key]._id + "' data-parent='" + categ[key].parent + "' class='treeHref' href='" + categ[key].href + "'>" + categ[key].name + "</a></div>";
                    str += tree(categ[key].childrens);
                    str = str + "</li>"
                // якщо останній елемент - записати відповідні стилі
                } else {
                    str = str + "<li class='Node ExpandLeaf IsLast'><div class='Expand'></div>" + 
                    "<div class='Content'><a data-id='" + categ[key]._id + "' data-parent='" + categ[key].parent + "' class='treeHref' href='" + categ[key].href + "'>" + categ[key].name + "</a></div></li>"
                }
            // якщо не останній елемент
            } else {
                // якщо є вкладені елементи - розпакувати
                if (categ[key].childrens) {
                    str = str + "<li class='Node ExpandClosed'><div class='Expand'></div>" + 
                    "<div class='Content'><a data-id='" + categ[key]._id + "' data-parent='" + categ[key].parent + "' class='treeHref' href='" + categ[key].href + "'>" + categ[key].name + "</a></div>";
                    str += tree(categ[key].childrens);
                    str = str + "</li>"
                // якщо останній елемент - записати відповідні стилі
                } else {
                    str = str + "<li class='Node ExpandOne'><div class='Expand'></div>" + 
                    "<div class='Content'><a data-id='" + categ[key]._id + "' data-parent='" + categ[key].parent + "' class='treeHref' href='" + categ[key].href + "'>" + categ[key].name + "</a></div></li>"
                }
            }
        }
        return str + "</ul>"
    }
    return containerStr + tree(categ) + "</li></ul>"
};
