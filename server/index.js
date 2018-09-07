var express = require('express');
var bodyParser = require('body-parser');
//const db = require('../database-mysql/index.js')
const db = require('../database-mysql/db.js');
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

app.post('/createEvent', function (req, res) {
  console.log(req.body);
  let members = [];
  let eventName = req.body.eventName;
  let billCost = req.body.billCost; //string


  for (let i = 0; i < req.body.members.length; i++) {
    members.push(req.body.members[i].name);
  }
  db.insert.event(eventName, 1, function(result) {
    //console.log('insertEvent post success', result);
  }); // Query to find eventId

  for (let i = 0; i < members.length; i++) {
    db.insert.member(members[i], 1, function(result) {
      //console.log('insertMember post success', result);
    });
  }


  //console.log('Post members ', members);
  console.log('createEvent Post');
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});