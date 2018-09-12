var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

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
app.use(session({secret: 'ssshhhhh'}));

  app.post('/login', function (req, res) {
  //sess=req.session;
  //console.log("sess", sess);
    console.log('Inside server req body',req.body);
    var userName = req.body.username;
    console.log('username',userName);
    var password = req.body.password;
    console.log('password', password);
    var data = userName+':'+password;

    items.checkIfTheUserExists(data, function(result) {
      console.log("result",result);
      if (result === 'success') {
        res.send('dashboard');
      } else if(result === 'nouser') {
        res.send('signup');
      } else {
        res.send('login');
      }
    });
  });

app.post('/signup', function (req, res) {
  console.log('Inside server req body',req.body);
   var userName = req.body.username;
    console.log('username',userName);
    var password = req.body.password;
    console.log('password', password);
    var data = userName+':'+password;
    items.saveUser(data, function(result) {
      console.log("result", result);
      if(result === 'inserted') {
        console.log('signupsuccessful');
        //res.send('dashboard');
        res.send('dashboard');
      }
    });
});

app.get('/dashboard', function (req, res) {
  console.log('Inside server req body',req.body);
  console.log('Inside serv res',res.body)
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

app.get('/billsplits', function (req, res) {
  console.log("/billsplits ");
  items.listBillSplits(function(data) {
    console.log("data " + JSON.stringify(data));
    res.json(data);
  });
});
app.listen(3000, function() {
  console.log('listening on port 3000!');
});