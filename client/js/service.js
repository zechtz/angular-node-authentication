angular.module('myApp').factory('AuthService', [
  '$q', '$timeout', '$http',
  ($q, $timeout, $http)  => {
    // create a user variable
    let user = null;

    function isLoggedIn() {
      if (user) return true;
      return false;
    }

    /**
     * persist user login status
     */
    function getUserStatus() {
      return $http.get('/status')
        .then(function(data) {
          if (data.status) {
            user = true;
          } else {
            user = false;
          }
        }, function(data) {
          user = false;
        });
    }

    function login(username, password) {
      // create new instance of deferred
      let deferred = $q.defer();

      $http.post('/login', {username: username,  password: password })
        .then(function(data, status){
          if (data.status === 200 && data.status ){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        },function(data) {
          user = false;
          deferred.reject();
        });
      return deferred.promise;
    }

    function logout() {
      let deferred = $q.defer();
      $http.get('/logout')
        .then(function(data){
          user = false;
          deferred.resolve();
        },function(data){
          user = false;
          deferred.reject();
        });
      return deferred.promise;
    }

    function register(username, password) {

      let deferred = $q.defer();

      $http.post('/register', {username: username,  password: password })
        .then(function(data, status){
          console.log(username);
          if (data.status === 200 && data.status){
            console.log(data.data.status);
            deferred.resolve(data.data.status);
          } else {
            deferred.reject();
          }
        },function(data){
          deferred.reject(data.data.err.message);
        });
      return deferred.promise;
    }

    return ({
      isLoggedIn    : isLoggedIn,
      getUserStatus : getUserStatus,
      login         : login,
      logout        : logout,
      register      : register
    });
  }
]);
