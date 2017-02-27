define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    // Колекція моделей дерева структури сайту
    var Collection = Backbone.Collection.extend({
        model: Backbone.Model.extend({
            idAttribute: "_id"
        }),
        url: "/REST"
    });
    var collection = new Collection();
    collection.fetch({
                success: function() {console.log('retrive data for collection from server')},
                error: function() {console.log('cannot retrive data for collection from server')}
                });
    window.App ?  window.App : window.App = {};
    window.App.Collections ? window.App.Collections : window.App.Collections = {};
    // екземпляр колекції
    window.App.Collections.collection ? window.App.Collections.collection : window.App.Collections.collection = collection;
    
    if (!App.Templates) {
        App.Templates = Object.create(null);
        App.Templates.item = " \
                <tr> \
                     <% if(codeRef) { %> \
                        <td><a data-id='<%= _id %>' href='<%= href %>'><%= codeID %></a></td> \
                     <% } else { %> \
                        <td><%= codeID %></td> \
                     <% } %> \
                     <td><img src='<%= photo %>' /></td> \
                     <td><%= name %></td> \
                     <% if (sort) { %> \
                        <td><%= sort %></td> \
                     <% } %> \
                     <td><%= harvest %></td> \
                     <td><%= date %></td> \
                     <td><%= cost %></td> \
                </tr> \
            ";
        App.Templates.categ = " \
            <table class='table'> \
                <thead> \
                    <tr> \
                         <th colspan='7'><a data-id='<%= _id %>' href='<%= href %>'><%= name %></a></th> \
                    </tr> \
                </thead> \
                <tbody> \
                      <tr> \
                         <% if(codeRef) { %> \
                         <td><a data-id='<%= _id %>' href='<%= href %>'><%= codeID %></a></td> \
                         <% } else { %> \
                         <td><%= codeID %></td> \
                         <% } %> \
                         <td><img src='<%= photo %>' /></td> \
                         <td><%= name %></td> \
                         <% if (sort) { %> \
                            <td><%= sort %></td> \
                         <% } %> \
                         <td><%= harvest %></td> \
                         <td><%= date %></td> \
                         <td><%= cost %></td> \
                      </tr> \
                </tbody> \
            </table> \
        ";
        App.Templates.categs = " \
            <table class='table'> \
                <thead> \
                    <tr> \
                         <th><a data-id='<%= _id %>' href='<%= href %>'><%= name %></a></th> \
                    </tr> \
                </thead> \
                <tbody> \
                      <tr> \
                            <td><img class='imgBack' src='<%= img %>' /></td> \
                      </tr> \
                </tbody> \
            </table> \
        ";
    }
});