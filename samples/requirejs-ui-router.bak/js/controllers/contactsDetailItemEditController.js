define(['couchPotatoService'], function (couchPotato) {
  couchPotato.registerController([
    'contactsDetailItemEditController',
    [        '$scope', '$stateParams', '$state',
    function ($scope,   $stateParams,   $state) {
      $scope.item = findById($scope.contact.items, $stateParams.itemId);
      $scope.done = function () {
        $state.transitionTo('contacts.detail.item', $stateParams);
      };
    }]
  ]);
});
