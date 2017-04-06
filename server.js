var express        = require('express');
var app            = express();
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

var team_id = -1;
var soccerTeams = [ { "id" : ++team_id,
                      "team" : "Some team",
                      "players" : ["goalkeeper", "forward"]
                    },
                    { "id" : ++team_id,
                      "team" : "Manchester United",
                      "players" : ["Rooney", "Ibrahimovic"]
                    }];

app.get('/api/teams', function(req, res) {
  res.json(soccerTeams);
});

app.post('/api/teams', function(req, res) {
  soccerTeams.push( { "id": ++team_id,
                      "team" : req.body.text,
                      "players": []
                    });
  res.json(soccerTeams);
});

app.delete('/api/teams/:team_id', function(req, res) {
  for (var i = 0; i < soccerTeams.length; i++) {
    if (soccerTeams[i].id == req.params.team_id) {
      soccerTeams.splice(i, 1);
      break;
    };
  };
  res.json(soccerTeams);
});

app.post('/api/teams/:team_id', function(req, res) {
  //console.log("req.params.team_id: ", req.params.team_id);
  //console.log("req.body[req.params.team_id]: ", req.body[req.params.team_id]);
  for (var i = 0; i < soccerTeams.length; i++) {
    if (soccerTeams[i].id == req.params.team_id) {
      soccerTeams[i].players.push(req.body[req.params.team_id]);
      break;
    };
  };
  res.json(soccerTeams);
});

app.delete('/api/teams/:team_id/:player', function(req, res) {
  for (var i = 0; i < soccerTeams.length; i++) {
    if (soccerTeams[i].id == req.params.team_id) {
      //console.log("req.params.player: ", req.params.player);
      for (var j = 0; j < soccerTeams[i].players.length; j++) {
        //console.log("soccerTeams[i].players[j]: ", soccerTeams[i].players[j]);
        if (soccerTeams[i].players[j] == req.params.player) {
          soccerTeams[i].players.splice(j, 1);
          break;
        };
      };
    };
  };
  res.json(soccerTeams);
});

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

app.listen(3000, function(){
  console.log('listening on *:3000');
});
