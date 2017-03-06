angular.module('myApp').controller('UsersCtrl',
  ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {

    $scope.register = function () {

      // initial values
      $scope.error    =  false;
      $scope.disabled =  true;
      $scope.title    =  "Register";

      // call register from service
      AuthService.register($scope.username, $scope.password)
      // handle success
        .then(function (successMessage) {
          $location.path('/login');
          $scope.disabled       =  false;
          $scope.successMessage =  successMessage;
          $scope.username       =  "";
          $scope.password       =  "";
        })
      // handle error
        .catch(function (errorMessage) {
          $scope.error        =  true;
          $scope.errorMessage =  errorMessage;
          $scope.disabled     =  false;
          $scope.username     =  "";
          $scope.password     =  "";
        });
    };
  }]);
