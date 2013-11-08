define(['couchPotatoService'], function (couchPotato) {
  couchPotato.registerController([
    'contactsDetailItemController',
    [        '$scope', '$stateParams', '$state',
    function ($scope,   $stateParams,   $state) {
      $scope.item = findById($scope.contact.items, $stateParams.itemId);
      $scope.edit = function () {
        $state.transitionTo('contacts.detail.item.edit', $stateParams);
      };
    }]
  ]);
});
