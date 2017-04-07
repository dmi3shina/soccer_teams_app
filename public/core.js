var soccerTeams = angular.module('soccerTeams', ['ngCookies']);

function mainController($scope, $http, $cookieStore, $rootScope) {
  $scope.username = null;
  $scope.password = null;
  $scope.formData = {};
  $scope.newPlayer = {};

  $scope.login = function(data) {
    if (data == null) {
      var auth = window.btoa($scope.username + ':' + $scope.password);
    } else {
      auth = data;
    };
    $http.defaults.headers.common['Authorization'] = 'Basic ' + auth;
    $http.get('/api/teams')
         .success(function(data) {
            $(".login").hide();
            $(".container").show();
            $rootScope.globals = {
                currentUser: {
                  username: $scope.username,
                  auth: auth
                }
            };
            $cookieStore.put('globals', $rootScope.globals);
            $scope.username = null;
            $scope.password = null;
            $scope.teams = data;
            console.log(data);
         })
         .error(function(data) {
            $(".alert").show();
            console.log('Error: ' + data);
         });
  };

  window.onload = function() {
    $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        //$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.auth;
        $scope.login($rootScope.globals.currentUser.auth);
      };
  };

  $scope.logout = function() {
    $rootScope.globals = {};
    $cookieStore.remove('globals');
    $http.defaults.headers.common.Authorization = 'Basic ';
    $(".container").hide();
    $(".login").show();
  };

  $scope.createTeam = function() {
      $http.post('/api/teams', $scope.formData)
          .success(function(data) {
            $scope.formData = {};
            $scope.teams = data;
            console.log(data);
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
  };

  $scope.deleteTeam = function(id) {
    $http.delete('/api/teams/' + id)
         .success(function(data) {
           $scope.teams = data;
           console.log(data);
         })
         .error(function(data) {
           console.log('Error: ' + data);
         });
  };

  $scope.createPlayer = function(id) {
      $http.post('/api/teams/'+ id, $scope.newPlayer)
           .success(function(data) {
             $scope.newPlayer[id] = null;
             $scope.teams = data;
             console.log(data);
           })
           .error(function(data) {
             console.log('Error: ' + data);
           });
  };

  $scope.deletePlayer = function(id, player) {
    $http.delete('/api/teams/' + id + "/" + player)
         .success(function(data) {
           $scope.teams = data;
           console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
  };

}
