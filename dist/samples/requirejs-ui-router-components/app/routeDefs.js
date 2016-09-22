define(['app'], function(app) {
  app.registerProvider(
    'routeDefs',
    [
      '$stateProvider',
      '$urlRouterProvider',
      '$couchPotatoProvider',
      function (
        $stateProvider,
        $urlRouterProvider,
        $couchPotatoProvider
      ) {

        this.$get = function() {
          // this is a config-time-only provider
          // in a future sample it will expose runtime information to the app
          return {};
        };

        $stateProvider
          .state('home', {
            url: '/',
            component: 'home',
            template: '<home></home>',
            resolve: {
              dummy: $couchPotatoProvider.resolveDependencies(['components/home/index'])
            }
          })
          .state('about', {
            url: '/about',
            template: '<about></about>',
            resolve: {
              dummy: $couchPotatoProvider.resolveDependencies(['components/about/index'])
            }
          });
      }
    ]
  );
});
