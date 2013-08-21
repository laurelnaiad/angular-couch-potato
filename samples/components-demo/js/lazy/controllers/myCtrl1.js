define(['couchPotatoService', 'lazy/services/version'], function (couchPotato) {
  couchPotato.registerController([
    'MyCtrl1',
    [
      '$scope', 'version',
      function($scope, version) {
        $scope.scopedAppVersion = version;
      }
    ]
  ]);
});
