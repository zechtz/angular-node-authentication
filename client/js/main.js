let myApp = angular.module('myApp', ['ngRoute']);

/**
 * redirect back to login averytime user tries to access
 * page without being logged in
 */
myApp.run(function($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function(event, next, current) {
      AuthService.getUserStatus()
        .then(function(){
          if (next.access.restricted && AuthService.isLoggedIn() === false) {
            $location.path('/login');
            $route.reload();
          }
        });
    });
});

myApp.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl : 'partials/home.html',
      controller  : 'MainCtrl',
      access      : {restricted: true}
    })
    .when('/login', {
      templateUrl : 'partials/login.html',
      controller  : 'SessionCtrl',
      access      : {restricted: false}
    })
    .when('/logout', {
      controller : 'SessionCtrl',
      access     : {restricted: true}
    })
    .when('/register', {
      templateUrl : 'partials/register.html',
      controller  : 'UsersCtrl',
      access      : {restricted: false}
    })
    .when('/one', {
      template : '<h1> This is page one</h1>',
      access   : {restricted: true}
    })
    .when('/two', {
      template : '<h1> This is page two</h1>',
      access   : {restricted: false}
    })
    .otherwise({
      redirectTo: '/'
    });
});
