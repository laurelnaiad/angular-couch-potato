define(['couchPotatoService'], function (couchPotato) {
  couchPotato.registerController([
    'contactsDetailController',
    [        '$scope', '$stateParams', 'something',
    function ($scope,   $stateParams,   something) {
      $scope.something = something;
      $scope.contact = findById($scope.contacts, $stateParams.contactId);
    }]
  ]);
});
