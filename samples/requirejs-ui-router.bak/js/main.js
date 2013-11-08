require.config({
  baseUrl: '/js'
});

require( [
  'app'
], function(app) {
  'use strict';
  angular.element(document).ready(function() {
    angular.bootstrap(document, [app['name'], function($locationProvider){
      //$locationProvider.html5Mode(true).hashPrefix('!');
    }]);
  });
});
