"use strict";
var app = angular.module("SwitchMovies", ["ngMaterial", "ui.router", "ui.bootstrap"]);

app.config(function ($stateProvider) {
  $stateProvider.state("default", {
    url: "",
    controller: function ($state) {
      $state.go("home");
    }
  });
});
