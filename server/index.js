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
  let membersName = []
  let eventName = req.body.eventName;
  let billCost = Number(req.body.billCost);
  let payee = req.body.payee;
  let evenSplit = true

  for (let i = 0; i < req.body.members.length; i++) {
      members.push([req.body.members[i].name, 1]);
      membersName.push(`'${req.body.members[i].name}'`);
  }

  db.insert.manyMembers(members, function(result) {
    console.log('insert manyMembers');
    db.insert.event(eventName, 1, function(result) {
      console.log('event inserted');
      db.select.memberId(payee, function(result) {
        console.log('payeeId selected');
        let payeeId = result[0].id;
        db.select.manyMembersId(membersName, function(members) {
          db.select.eventId(eventName, function(result) {
            console.log('eventId selected')
            let eventId = result[0].id;
            members.forEach(function(member) {
              db.insert.eventMember(member.id, eventId, 1, function(result) {
                console.log('eventMember added');
              });
              if (member.memberName !== payee) {
                console.log(member.memberName);
                console.log(payee);
                db.insert.debt(member.id, payeeId, billCost, eventId, 1, function(result) {
                  console.log('debt added');
                })
              }
            });
          })
        })
      });
    });
  });
    // let membersId = {};
    // result.forEach(function(item) {
    //   membersId[item.memberName] = item.id

    // });

  // db.insert.member(payee, 1, function (result) {
  //   console.log('payee inserted');
  //   db.select.memberId(payee, function (result) {
  //     console.log('payeeId selected');
  //     payeeId = result[0].id;
  //     db.insert.event(eventName, 1, function(result) {
  //       console.log('event inserted');
  //       db.select.eventId(eventName, function(result) {
  //         console.log('eventId selected');
  //         eventId = result[0].id;
  //         for (let i = 0; i < members.length; i++) {
  //           db.insert.member(members[i], 1, function (result) {
  //             console.log('member inserted');
  //             db.select.memberId(members[i], function (result) {
  //               console.log('memberId selected');
  //               memberId = result[0].id;
  //               db.insert.eventMember(memberId, eventId, 1, function (result) {
  //                 console.log('eventMember inserted');
  //                 db.insert.debt(memberId, payeeId, billCost, eventId, 1, function (result) {
  //                   console.log('debt inserted');
  //                 })
  //               })
  //             })
  //           })
  //         }
  //       })
  //     })
  //   })
  // })

  //console.log('Post members ', members);
  console.log('createEvent Post');
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});