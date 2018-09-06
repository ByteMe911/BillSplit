var mysql = require('mysql');

var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 password : 'password',
 database : 'testdb'
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

var saveUser = function(userObj) {
 console.log("in save fn");
 var dbObj = JSON.parse(userObj);
 console.log(dbObj);
 var sql = "INSERT INTO usertable (username, password) VALUES (?, ?)";
   // connection.query(sql, [symbol, open, high, low, close, dateArray[i]], function (err, result, fields) {
   //   if(err) {
   //     throw err;
   //   } else {
   //   console.log("Success");
   //   }
   // });
}

var checkIfTheUserExists= function(userNamePasswordArray) {
 console.log("In check function");
 var sql = 'SELECT * FROM usertable WHERE username=?';
 connection.query(sql, [userNamePasswordArray[0]], function(err, results, fields) {
   if(err) {
     throw err;
   } else {
     console.log(results,"results");
     //console.log("fields", fields);
     console.log("checkinguser else success");
     if(results.length === 0) {
       console.log("User does not exist, redirect to signup page");
     } else {
       // var pwd = 'SELECT username FROM usertable WHERE username=? AND password=?'

       console.log(results[0].password,"results[0]");
       if(results[0].password  === userNamePasswordArray[1]) {
         console.log("Correct password , redirect to inside the app");
         // res.redirect('/test');
       } else {
         console.log("Redirect to login page, wrong password");
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

module.exports.selectAll = selectAll;
module.exports.checkIfTheUserExists = checkIfTheUserExists;