requirejs.config({
  baseUrl: '../js',
  paths: {
    backbone: './lib/backbone',
    underscore: './lib/underscore',
    jquery: './lib/jquery'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    }
  }
});