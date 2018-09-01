const con = require('./index.js')
const db = con.connection

const insert = {

  //there is a lot of repeating. I will refactor to implement DRY

  member: function (memberName, userLoginID, callback) {
    let queryStr = 'insert into member (memberName, userLoginID) \
    value (memberName, userLoginID)'
    db.query(queryStr, function(err, result) {
      if (err) {
        console.log(err)
      } else {
        callback(result);
      }
    });
  },

  event: function(eventName, userLoginID, callback) {
    let queryStr = 'insert into event (eventName, userLoginID) \
    value (eventName, userLoginID)'
    db.query(queryStr, function(err, result) {
      if (err) {
        console.log(err)
      } else {
        callback(result);
      }
    });
  },

  eventMember: function(memberID, eventID, userLoginID, callback) {
    let queryStr = 'insert into eventMember (memberID, eventID, userLoginID) \
    value (memberID, eventID, userLoginID)'
    db.query(queryStr, function(err, result) {
      if (err) {
        console.log(err)
      } else {
        callback(result);
      }
    });
  },

  debt: function(debtor, creditor, amount, userLoginID, callback) {
    let queryStr = 'insert into debt (debtor, creditor, amount, userLoginID) \
    value(debtor, creditor, amount, userLoginID)'
    db.query(queryStr, function(err, result) {
      if (err) {
        console.log(err)
      } else {
        callback(result);
      }
    });
  }

}

module.exports.insert = insert