var mysql = require('mysql');

var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 password : 'password',
 database : 'billSplit'
});

// connection.connect();

connection.connect(function(err)  {
 if(err) {
   throw err;
  }
 else {
   console.log("success server-database");
 }

});

var saveEvent = function(eventObj, cb) {
  var strEventObj = JSON.stringify(eventObj);
  var queryStr = "INSERT into event (event) VALUES (?)";
  connection.query(queryStr, [strEventObj], function (err, result, fields) {
    if(err) {
      throw err;
    } else {
      console.log("event object inserted");
      cb('inserted');
    }
  });
}

var getEvents = function(object, cb) {
 console.log("In get events function");
 console.log('obj', object);
 // var eventObj = object.split(':');
 // console.log("1",userNamePasswordArray[0]);
 // console.log("2",userNamePasswordArray[1]);
 var sql = 'SELECT event FROM event';
 connection.query(sql, function(err, results, fields) {
   if(err) {
     throw err;
   } else {
     console.log(results,"results");
     cb(results);
     // console.log("fields", fields);
     // console.log("checkinguser else success");
     // if(results.length === 0) {
     //   console.log("User does not exist, redirect to signup page");
     //   cb('nouser');
     }
  });
}  
   // else {
   //     // var pwd = 'SELECT username FROM usertable WHERE username=? AND password=?'

   //     console.log(results[0].password,"results[0]");
   //     if(results[0].password  === userNamePasswordArray[1]) {
   //       console.log("Correct password , redirect to inside the app");
   //       cb('success');

   //     } else {
   //       console.log("Redirect to login page, wrong password");
   //       cb('failure');
   //     }
   //   }
   //   //console.log(results);
   // }


var saveUser = function(userNamePassword, cb) {
  console.log("in save fn");
  var userNamePasswordArray = userNamePassword.split(':');
  console.log("1",userNamePasswordArray[0]);
  console.log("2",userNamePasswordArray[1]);
  var sql = 'SELECT * FROM userlogin WHERE username=?';
  var runQuery = 0;
  //var sql = "INSERT INTO usertable (username, password) VALUES (?, ?)";
  sql = "INSERT INTO userlogin (username, password) VALUES (?, ?)";
  connection.query(sql, [userNamePasswordArray[0], userNamePasswordArray[1]], function (err, result, fields) {
    if(err) {
      throw err;
    } else {
      console.log("new user inserted");
      cb('inserted');
    }
  });
}


var checkIfTheUserExists= function(userNamePassword, cb) {
 console.log("In check function");
 var userNamePasswordArray = userNamePassword.split(':');
 console.log("1",userNamePasswordArray[0]);
 console.log("2",userNamePasswordArray[1]);
 var sql = 'SELECT * FROM userlogin WHERE username=?';
 connection.query(sql, [userNamePasswordArray[0]], function(err, results, fields) {
   if(err) {
     throw err;
   } else {
     console.log(results,"results");
     //console.log("fields", fields);
     console.log("checkinguser else success");
     if(results.length === 0) {
       console.log("User does not exist, redirect to signup page");
       cb('nouser');
     } else {
       // var pwd = 'SELECT username FROM usertable WHERE username=? AND password=?'

       console.log(results[0].password,"results[0]");
       if(results[0].password  === userNamePasswordArray[1]) {
         console.log("Correct password , redirect to inside the app");
         cb('success');

       } else {
         console.log("Redirect to login page, wrong password");
         cb('failure');
       }
     }
     //console.log(results);
   }
 });
}

// var sql = "INSERT INTO weekly (currency, open, high, low, close, weeklydate) VALUES (?, ?, ?, ?, ?, ?)";
//     connection.query(sql, [symbol, open, high, low, close, dateArray[i]], function (err, result, fields) {

var selectAll = function(callback) {
 console.log("Insited");
 connection.query('SELECT * FROM usertable', function(err, results, fields) {
   if(err) {
     callback(err, null);
   } else {
     callback(null, results);
   }
 });
};

var listBillSplits = function(callback) {
 console.log("list bill splits");
 connection.query('SELECT * FROM debt', function(err, results, fields) {
 // connection.query('SELECT id, member.memberName FROM debt INNER JOIN member ON debt.debtor=member.id', function(err, results, fields) {
   if(err) {
   //  callback(err, null);
   } else {
   //  callback(null, results);
   console.log(results);
   callback(results);
   }
 });
};

module.exports.selectAll = selectAll;
module.exports.saveEvent = saveEvent;
module.exports.saveUser = saveUser;
module.exports.listBillSplits = listBillSplits;
module.exports.checkIfTheUserExists = checkIfTheUserExists;
module.exports.getEvents = getEvents;



// var selectAll = function(callback) {
//   connection.query('SELECT * FROM items', function(err, results, fields) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, results);
//     }
//   });
// };


