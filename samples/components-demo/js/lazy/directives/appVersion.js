define(['couchPotatoService', 'lazy/services/version'], function (couchPotato) {
  couchPotato.registerDirective([
    'appVersion',
    [
      'version',
      function factory(versionValue) {
        return function (scope, elm, attrs) {
          elm.text(versionValue);
        };
      }
    ]
  ]);
});
