angular.module('myApp')
  .controller('SessionCtrl', [
    '$scope', '$location', 'AuthService',
    function($scope, $location, AuthService){

      $scope.login = function() {
        // initial values
        $scope.error    =  false;
        $scope.disabled =  true;

        AuthService.login($scope.username, $scope.password)
          .then(function(){
            $location.path('/');
            $scope.disabled = false;
            $scope.loginForm = {};
          })
          .catch(() => {
            $scope.error = true;
            $scope.errorMessage = 'Invalid username and/or password';
            $scope.disabled = false;
            $scope.loginForm = {};
          });
      };

      $scope.logout = function () {
        AuthService.logout()
          .then(function () {
            $location.path('/login');
          });
      };
    }]);
