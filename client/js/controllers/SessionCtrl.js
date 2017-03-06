angular.module('myApp') .controller('SessionCtrl', [
  '$scope', '$location', 'AuthService',
  function($scope, $location, AuthService){

    $scope.login = function() {
      // initial values
      $scope.error    =  false;
      $scope.disabled =  true;

      AuthService.login($scope.username, $scope.password)
        .then(function(user){
          $location.path('/');
          $scope.disabled = false;
        })
        .catch(() => {
          $scope.error = true;
          $scope.errorMessage = 'Invalid username and/or password';
          $scope.disabled = false;
          $scope.username = "";
          $scope.password = "";
        });
    };

    $scope.logout = function () {
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });
    };
  }]);
