var express = require('express');
var bodyParser = require('body-parser');
const db = require('../database-mysql/index.js')
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var items = require('../database-mysql');
// var items = require('../database-mongo');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));
app.post('/login', function (req, res) {
  console.log('Inside server req body',req.body);
  var userNamePassword = req.body.username;
  console.log('usernamepassword',userNamePassword);
  var userNamePasswordArray = userNamePassword.split(':');
  console.log(userNamePasswordArray);
  items.checkIfTheUserExists(userNamePasswordArray);
  //items.insertUser(req.body);
});
app.post('/signup', function (req, res) {
  console.log('Inside server req body',req.body);
});
app.get('/signup', function (req, res) {
  console.log('Inside server req body',req.body);
});
app.get('/login', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});
app.listen(3000, function() {
  console.log('listening on port 3000!');
});