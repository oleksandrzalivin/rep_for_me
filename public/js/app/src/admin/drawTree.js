define(function() {
    // відкривання-закривання вузлів
    if(!window.tree_toggle) {
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
    }
    
    // create a tree from JSON
    function fu_tree(categ) {
        // головний кореневий вузол
        var containerStr = 	'<ul class="Container">' +
                            '<li class="Node IsLast IsRoot ExpandOpen">' +
                            '<div class="Expand"></div>' +
                            '<div class="Content"><span id="title">Продукти</span></div>';
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
                        str = str + "</li>";
                    // якщо останній елемент - записати відповідні стилі
                    } else {
                        str = str + "<li class='Node ExpandLeaf IsLast'><div class='Expand'></div>" + 
                        "<div class='Content'><a data-id='" + categ[key]._id + "' data-parent='" + categ[key].parent + "' class='treeHref' href='" + categ[key].href + "'>" + categ[key].name + "</a></div></li>";
                    }
                // якщо не останній елемент
                } else {
                    // якщо є вкладені елементи - розпакувати
                    if (categ[key].childrens) {
                        str = str + "<li class='Node ExpandClosed'><div class='Expand'></div>" + 
                        "<div class='Content'><a data-id='" + categ[key]._id + "' data-parent='" + categ[key].parent + "' class='treeHref' href='" + categ[key].href + "'>" + categ[key].name + "</a></div>";
                        str += tree(categ[key].childrens);
                        str = str + "</li>";
                    // якщо останній елемент - записати відповідні стилі
                    } else {
                        str = str + "<li class='Node ExpandOne'><div class='Expand'></div>" + 
                        "<div class='Content'><a data-id='" + categ[key]._id + "' data-parent='" + categ[key].parent + "' class='treeHref' href='" + categ[key].href + "'>" + categ[key].name + "</a></div></li>";
                    }
                }
            }
            return str + "</ul>";
        }
        return containerStr + tree(categ) + "</li></ul>";
    }
    return fu_tree;
});
