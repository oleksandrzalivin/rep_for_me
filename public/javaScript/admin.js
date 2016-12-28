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

var data;
(function() {
    // Модель дерева структури сайту
    var Tree = Backbone.Model.extend({
        url: "/REST"
    }),
        tree = new Tree();
    tree.fetch({
            success: function() {console.log('retrive data for "tree" model from server')},
            error: function() {console.log('cannot retrive data for "tree" model from server')}
        });
  /*  // модель категорії
    var Categ = Backbone.Model.extend({
        url: "/REST"
    });
    var fruit = new Categ;
    // представлення катег фрукти
    var FruitView = Backbone.View.extend({
        model: fruit,
        el: $('#stuff'),
        initialize: function() {
            this.model.on("change", this.render, this)
        },
        render: function() {
            var doc;
            for (var i in data) {
                if (data[i].tag == "fruit") doc = data[i]
            };
            console.log(doc);
            this.$el.html('<p><a href="'+doc.linkSelf+'">'+doc.tabName+'</a></p>');
            return this
        }
    });
        
        */
    // Педставлення моделі 'Tree'
    var TreeView = Backbone.View.extend({
        model: tree,
        el: $('#siteTree'),
        initialize: function() {
            this.model.on("change", this.render, this)
        },
        ivents: {
            "click .treeHref": "newView"
        },
        newView: function(ev) {
            console.log("click");
            if ($(this).text() == "Фрукти") {
                        new FruitView().render
                    }
        },
        render: function() {
            data = this.model.toJSON();
            var categories = [];
            for (var i in data) {
                if (data[i].tag == "treeData") categories = data[i].data
            };
            this.$el.append("<div onclick='tree_toggle(arguments[0])'>" + fu_tree(categories) + "</div>");
            $(document).ready(function() {
                $('.treeHref').click(function(ev) {
                    ev.preventDefault();
                    $( this ).fadeOut( 100 );
                    $( this ).fadeIn( 500 );
                })
            });
            return this
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
                        "<div class='Content'><a class='treeHref' href='" + categ[key].link + "'>" + categ[key].name + "</a></div>";
                        str += tree(categ[key].childrens);
                        str = str + "</li>"
                    // якщо останній елемент - записати відповідні стилі
                    } else {
                        str = str + "<li class='Node ExpandLeaf IsLast'><div class='Expand'></div>" + 
                        "<div class='Content'><a class='treeHref' href='" + categ[key].link + "'>" + categ[key].name + "</a></div></li>"
                    }
                // якщо не останній елемент
                } else {
                    // якщо є вкладені елементи - розпакувати
                    if (categ[key].childrens) {
                        str = str + "<li class='Node ExpandClosed'><div class='Expand'></div>" + 
                        "<div class='Content'><a class='treeHref' href='" + categ[key].link + "'>" + categ[key].name + "</a></div>";
                        str += tree(categ[key].childrens);
                        str = str + "</li>"
                    // якщо останній елемент - записати відповідні стилі
                    } else {
                        str = str + "<li class='Node ExpandOne'><div class='Expand'></div>" + 
                        "<div class='Content'><a class='treeHref' href='" + categ[key].link + "'>" + categ[key].name + "</a></div></li>"
                    }
                }
            }
            return str + "</ul>"
        }
        return containerStr + tree(categ) + "</li></ul>"
    };
    // initialize
    new TreeView; 
    
})();    