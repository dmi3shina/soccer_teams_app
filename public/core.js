var soccerTeams = angular.module('soccerTeams', []);

function mainController($scope, $http) {

  $scope.formData = {};
  $scope.newPlayer = {};
/*
  $scope.login = function() {
    if ($scope.username = $scope.password) {
      $(".login").hide();
      $(".container").show();
    };
  };
*/
  $http.get('/api/teams')
       .success(function(data) {
          $scope.teams = data;
          console.log(data);
       })
       .error(function(data) {
          console.log('Error: ' + data);
       });

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
