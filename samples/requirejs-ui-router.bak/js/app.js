define([], function () {
  'use strict';

  var app = angular.module('app', ['scs.couch-potato', 'ui.compat']);
  app.config(['$stateProvider', '$routeProvider', '$urlRouterProvider', '$couchPotatoProvider', '$locationProvider', '$provide',
    function ($stateProvider,   $routeProvider,   $urlRouterProvider, $couchPotatoProvider, $locationProvider, $provide) {
      //comment out the decorator function for html5mode
      //uncomment the decorator function for force hash(bang) mode
      // $provide.decorator('$sniffer', function($delegate) {
      //   $delegate.history = false;
      //   return $delegate;
      // });
      $locationProvider.html5Mode(true);


      $urlRouterProvider
        .when('/c?id', '/contacts/:id')
        .otherwise('/');

      $routeProvider
        .when('/user/:id', {
          redirectTo: '/contacts/:id'
        });

      $stateProvider
        .state('home', {
          url: '/',
          template: '<p class="lead">Welcome to the ngStates sample</p><p>Use the menu above to navigate</p>' +
            '<p>Look at <a href="/c?id=1">Alice</a> or <a href="/user/42">Bob</a> to see a URL with a redirect in action.<' + '/p>'
        })
        .state('contacts', {
          url: '/contacts',
          abstract: true,
          templateUrl: '/partials/contacts.html',
          controller: 'contactsController',
          resolve: {
            dummy: $couchPotatoProvider.resolveDependencies(['controllers/contactsController'])
          }
        })
        .state('contacts.list', {
          // parent: 'contacts',
          url: '',
          templateUrl: '/partials/contacts.list.html'
        })
        .state('contacts.detail', {
          // parent: 'contacts',
          url: '/{contactId}',
          resolve: {
            dummy: $couchPotatoProvider.resolveDependencies(['controllers/contactsDetailController']),
            something:
              [        '$timeout',
              function ($timeout) {
                return $timeout(function () { return 'Asynchronously resolved data'; }, 10);
              }]
          },
          views: {
            '': {
              templateUrl: '/partials/contacts.detail.html',
              controller: 'contactsDetailController'
            },
            'hint@': {
              template: 'This is contacts.detail populating the view "hint@"'
            },
            'menu': {
              templateProvider:
                [ '$stateParams',
                function ($stateParams){
                  // This is just to demonstrate that $stateParams injection works for templateProvider
                  // $stateParams are the parameters for the new state we're transitioning to, even
                  // though the global '$stateParams' has not been updated yet.
                  return '<hr><small class="muted">Contact ID: ' + $stateParams.contactId + '</small>';
                }]
            }
          }
        })
        .state('contacts.detail.item', {
          // parent: 'contacts.detail',
          url: '/item/:itemId',
          resolve: {
            dummy: $couchPotatoProvider.resolveDependencies(['controllers/contactsDetailItemController'])
          },
          views: {
            '': {
              templateUrl: '/partials/contacts.detail.item.html',
              controller: 'contactsDetailItemController'
            },
            'hint@': {
              template: 'Overriding the view "hint@"'
            }
          }
        })
        .state('contacts.detail.item.edit', {
          resolve: {
            dummy: $couchPotatoProvider.resolveDependencies(['controllers/contactsDetailItemEditController'])
          },
          views: {
            '@contacts.detail': {
              templateUrl: '/partials/contacts.detail.item.edit.html',
              controller: 'contactsDetailItemEditController'
            }
          }
        })
        .state('about', {
          url: '/about',
          templateProvider:
            [        '$timeout',
            function ($timeout) {
              return $timeout(function () { return 'Hello world'; }, 100);
            }]
        });
    }]);

  app.run([ '$rootScope', '$state', '$stateParams', '$couchPotato',
    function($rootScope,   $state,   $stateParams, $couchPotato) {
      //"cheating" so that couchPotato is available in requirejs
      //define modules -- we want run-time registration of components
      //to take place within those modules because it allows
      //for them to have their own dependencies also be lazy-loaded.
      //this is what requirejs is good at.
      app.couchPotato = $couchPotato;
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }
  ]);

  return app;

});
