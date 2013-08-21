define(['couchPotatoService', 'lazy/services/version'], function(couchPotato) {
  couchPotato.registerFilter([
    'interpolator',
    [
      'version',
      function(version) {
        return function(text) {
          return String(text).replace(/\%VERSION\%/mg, version);
        };
      }
    ]
  ]);
});
