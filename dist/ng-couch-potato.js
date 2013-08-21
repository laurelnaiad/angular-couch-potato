/*! ng-couch-potato - v0.0.5 - 2013-08-20
 * https://github.com/stu-salsbury/ng-couch-potato
 * Copyright (c) 2013 Stu Salsbury;
 *    Uses software code found at https://github.com/szhanginrhythm/angular-require-lazyload
 * Licensed MIT
 */
(function() {
'use strict';
//ECMAScript 5 rules apply.
//Self-invoking anonymous function keeps global scope clean.

  //Register the module.
  //Getting angular onto the global scope is the client's responsibility.
  var module = angular.module('scs.couch-potato', ['ng']);

  //couchPotato uses these providers to do its registration work.
  function CouchPotatoProvider(
    $controllerProvider,
    $compileProvider,
    $provide,
    $filterProvider
  ) {

    //Expose each provider's functionality as single-argument functions.
    //The component-definining functions that are passed as parameters
    //should bear their own names.

    function registerValue(value) {
        $provide.value.apply(null, value);
    }

    function registerFactory(factory) {
        $provide.factory.apply(null, factory);
    }

    function registerFilter(filter) {
        $filterProvider.register.apply(null, filter);
    }

    function registerDirective(directive) {
        $compileProvider.directive.apply(null, directive);
    }

    function registerController(controller) {
        $controllerProvider.register.apply(null, controller);
    }

    function resolveDependencies(dependencies) {
      function delay($q, $rootScope) {
        var defer = $q.defer();

        require(dependencies, function() {
          defer.resolve();
          $rootScope.$apply();
        });
        return defer.promise;
      }
      delay.$inject = ['$q', '$rootScope'];
      return delay;
    }
    this.resolveDependencies = resolveDependencies;


    function resolveDependenciesProperty(configProperties) {
      if (configProperties.dependencies) {
        var resolveConfig = configProperties;
        var deps = configProperties.dependencies;
        delete resolveConfig['dependencies'];

        resolveConfig.resolve = {};
        resolveConfig.resolve.delay = resolveDependencies(deps);

        return resolveConfig;
      }
      else
      {
        return configProperties;
      }

    }
    this.resolveDependenciesProperty = resolveDependenciesProperty;

    //***************************************
    //service definition -- expose the registration
    //functions during run-time as a service
    //***************************************
    this.$get = function () {
      var svc = {};

      svc.registerValue = registerValue;
      svc.registerFactory = registerFactory;
      svc.registerFilter = registerFilter;
      svc.registerDirective = registerDirective;
      svc.registerController = registerController;

      svc.resolveDependenciesProperty = resolveDependenciesProperty;
      svc.resolveDependencies = resolveDependencies;

      return svc;
    };

  }
  CouchPotatoProvider.$inject = [
    '$controllerProvider',
    '$compileProvider',
    '$provide',
    '$filterProvider'
  ]; //inject the providers into CouchPotatoProvider

  //register the provider/service
  module.provider('$couchPotato', CouchPotatoProvider);

}());
