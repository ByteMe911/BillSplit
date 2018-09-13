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
    // console.log('Inside server req body',req.body);
    var userName = req.body.username;
    // console.log('username',userName);
    var password = req.body.password;
    // console.log('password', password);
    var data = userName+':'+password;

    items.checkIfTheUserExists(data, function(result) {
      // console.log("result",result);
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
  // console.log('Inside server req body',req.body);
   var userName = req.body.username;
    // console.log('username',userName);
    var password = req.body.password;
    // console.log('password', password);
    var data = userName+':'+password;
    items.saveUser(data, function(result) {
      // console.log("result", result);
      if(result === 'inserted') {
        // console.log('signupsuccessful');
        //res.send('dashboard');
        res.send('dashboard');
      }
    });
});

app.post('/createEvent', function (req, res) {
  console.log('Inside server req body for eventObj', req.body);
  items.saveEvent(req.body, function(result) {
    // console.log("result", result);
    res.send('event');
  });
});

app.get('/dashboard', function (req, res) {
  // console.log('Inside server req body',req.body);
  // console.log('Inside serv res',res.body)
});

app.get('/signup', function (req, res) {
  // console.log('Inside server req body',req.body);
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
  // console.log("/billsplits ");
  items.listBillSplits(function(data) {
    // console.log("data " + JSON.stringify(data));
    res.json(data);
  });
});

function getResults(obj) {
  var positive = '';

  for (var person in obj) {
      
    if (obj[person] > 0) {
      positive = person;
      console.log(positive, 'is owed by the following');
    } 

    if (obj[person] < 0) {
      console.log(`${person} owes ${positive} ${obj[person]}`);
    }
  }

}

app.get('/createEvent', function (req, res) {
  // console.log('Inside server req body for eventObj', req.body);

  items.getEvents(req.body, function(data) {
    var arr = [];
    var totalObj = {};
    var localData = data;
    for (var i = 0; i < localData.length; i++) {
      var userObj = {};
      var obj = JSON.parse(localData[i].event);
      console.log('obj parsed', obj.objStr);
      var finalObj = obj.objStr;
      var objectFinal = JSON.parse(finalObj);

    for (j = 0; j < objectFinal.members.length; j++) {
      // console.log('members j loop', objectFinal.members[j])
      var name = objectFinal.members[j].name;
      var value = parseFloat(Math.round((objectFinal.members[j].value) * 100) / 100).toFixed(2)
      userObj[name] = Number(value);
      totalObj[name] = 0;
    }
    arr.push(userObj);
      // console.log('new user obj',userObj);
      // console.log('arr', arr)

    arr.forEach(function(obj) {
      for (var name in obj) {
        totalObj[name] += obj[name];
      }
    });

    var positive = '';
    var resultOutput = '';
    // getResults(totalObj);

    for (var person in totalObj) {
      
      if (totalObj[person] > 0) {
        positive = person;
        // console.log(positive)
        console.log(positive, 'is owed by the following ',);
      } 
      if (totalObj[person] < 0) {
      // console.log('person',person);
        // console.log(person, 'owes', positive, '$', totalObj[person]);
        console.log(`${person} owes ${positive} ${totalObj[person]}`);
        // console.log(positive, 'is owed by', totalObj[person]);
      }

    }


}

    // console.log('totalObj', totalObj);
    res.send(totalObj);

  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});