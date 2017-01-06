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
        url: "/REST",
        idAttribute: "_id"
    }),
    url: "/REST"
}),
    tree = new Tree();
tree.fetch({
        success: function() {console.log('retrive data for "tree" model from server')},
        error: function() {console.log('cannot retrive data for "tree" model from server')}
    });
// представлення категорії(моделі із колекції)
var CategView = Backbone.View.extend({
//    model: new Backbone.Model.extend(),
    el: $('#stuff'),
    initialize: function(options) {
        
        this.template = _.template($("#categTemplate").html() );
//        this.model.set(options.model);
//        this.model = options.model;
//        console.log(arguments);
//        debugger;
//        this.model.on("change", this.render, this).trigger("change");
//        this.render();
    },
    events: {
        "click #save-btn": "saveItem",
        "click #delete-btn": "deleteItem"
    },
    saveItem: function(ev) {
        ev.preventDefault();
        this.model.set(this.newAtr() );
        debugger;
        tree.trigger("update");
//        debugger;
   /*     this.model.save({},{
            success: function() {console.log('successfuly update doc')},
            error: function() {console.log('cannot update doc')}
        });*/
//        tree.fetch();// ініціалізація нового рендера дерева
        this.$el.html("");
    },
    deleteItem: function(ev) {
        ev.preventDefault();
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
        this.$el.html(this.template(this.model.toJSON() ) );
        return this;
    }
});

// Педставлення моделі 'Tree'
var TreeView = Backbone.View.extend({
    collection: tree,
    el: $('#siteTree'),
    initialize: function() {
        this.collection.on("update", this.render, this);
    },
    events: {
        "click .treeHref": "onNodeClick"
    },
    render: function() {
        var categories = this._buildTreeFromData();
        this.$el.html("<div onclick='tree_toggle(arguments[0])'>" + fu_tree(categories) + "</div>");
    },
    onNodeClick: function(ev) {
        var target = ev.target,
            id = $(target).data("id");
        ev.preventDefault();
        var model = this.collection.get(id);
        new CategView({"model": model}).render();
        
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
                    if (value.parent == id) {
                        parent.childrens.push(value)
                    }
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
                    "<div class='Content'><a data-id='" + categ[key]._id + "' class='treeHref' href='" + categ[key].href + "'>" + categ[key].name + "</a></div>";
                    str += tree(categ[key].childrens);
                    str = str + "</li>"
                // якщо останній елемент - записати відповідні стилі
                } else {
                    str = str + "<li class='Node ExpandLeaf IsLast'><div class='Expand'></div>" + 
                    "<div class='Content'><a data-id='" + categ[key]._id + "' class='treeHref' href='" + categ[key].href + "'>" + categ[key].name + "</a></div></li>"
                }
            // якщо не останній елемент
            } else {
                // якщо є вкладені елементи - розпакувати
                if (categ[key].childrens) {
                    str = str + "<li class='Node ExpandClosed'><div class='Expand'></div>" + 
                    "<div class='Content'><a data-id='" + categ[key]._id + "' class='treeHref' href='" + categ[key].href + "'>" + categ[key].name + "</a></div>";
                    str += tree(categ[key].childrens);
                    str = str + "</li>"
                // якщо останній елемент - записати відповідні стилі
                } else {
                    str = str + "<li class='Node ExpandOne'><div class='Expand'></div>" + 
                    "<div class='Content'><a data-id='" + categ[key]._id + "' class='treeHref' href='" + categ[key].href + "'>" + categ[key].name + "</a></div></li>"
                }
            }
        }
        return str + "</ul>"
    }
    return containerStr + tree(categ) + "</li></ul>"
};
