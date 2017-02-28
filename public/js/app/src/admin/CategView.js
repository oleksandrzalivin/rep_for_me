define(['jquery', 'underscore', 'backbone', '../categCollect'], function ($, _, Backbone) {
    var categories = App.Collections.collection;    
    
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
            var newElem = "5873b8ebf36d2872530dfeac", 
                newCat = "586e6219f36d282f8ecbb80a";
            if (id == newElem || id == newCat) {
                this.model.set(this.newAtr() ).unset("_id");
                categories.add(this.model).save({}, {
                    success: function() {
                        console.log('successfully created model');
                        categories.fetch({
                            success: function() {console.log('retrive data for categories from server')},
                            error: function() {console.log('cannot retrive data for categories from server')}
                            });
                    },
                    error: function() {console.log('cannot create model')}
                });
            } else {
            categories.get(id).set(this.newAtr() ).save({}, {
                success: function() {console.log('successfully update model_id: ' + id)},
                error: function() {console.log('cannot update model_id: ' + id)}
            });
            }
            categories.trigger("update");
            // remove this view instance
            this.remove();
        },
        deleteItem: function(ev) {
            ev.preventDefault();
            var id = this.model.get("_id");
            categories.get(id).destroy({
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
    return CategView;
});