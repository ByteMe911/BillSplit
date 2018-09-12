const con = require('./index.js')
const db = con.connection

const insert = {

  //there is a lot of repeating. I will refactor to implement DRY

  member: function (memberName, userLoginID, callback) {
    let queryStr = `insert into member (memberName, userLoginID) \
    value ('${memberName}', ${userLoginID})`
    db.query(queryStr, function(err, result) {
      if (err) {
        console.log(err)
      } else {
        callback(result);
      }
    });
  },

  event: function(eventName, userLoginID, callback) {
    let queryStr = `insert into event (eventName, userLoginID) \
    value ('${eventName}', ${userLoginID})`
    db.query(queryStr, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        callback(result);
      }
    });
  },

  eventMember: function(memberID, eventID, userLoginID, callback) {
    let queryStr = `insert into eventMember (memberID, eventID, userLoginID) \
    value (${memberID}, ${eventID}, ${userLoginID})`
    db.query(queryStr, function(err, result) {
      if (err) {
        console.log(err)
      } else {
        callback(result);
      }
    });
  },

  debt: function(debtorId, creditorId, amount, eventId, userLoginID, callback) {
    let queryStr = `insert into debt (debtor, creditor, amount, event, userLoginID) \
    value(${debtorId}, ${creditorId}, ${amount}, ${eventId}, ${userLoginID})`
    db.query(queryStr, function(err, result) {
      if (err) {
        console.log(err)
      } else {
        callback(result);
      }
    });
  }

}

const select = {

  currentUserLoginId: function(username, callback) {
    //this function will use the username from logging in to search the
    //userLogin table and find and return that users id for use in other quaries.
    let queryStr = 'SELECT userId FROM userLogin \
    WHERE username = username';
    db.query(queryStr, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        callback(result);
      }
    });
  },

  //used to select the debt id for use in other quaries
  debtId: function(debtor, creditor, eventId, callback) {
    let queryStr = 'SELECT id FROM debt \
    WHERE debtor = debtor AND creditor = creditor AND event = eventId'
    db.query(queryStr, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        callback(result);
      }
    });
  },

  eventId: function(eventName, callback) {
    let queryStr = `SELECT id FROM event \
    WHERE eventName = '${eventName}'`
    db.query(queryStr, function(err, result) {
      if(err) {
        console.log(err);
      } else {
        callback(result);
      }
    })
  },

  memberId: function(memberName, callback) {
    let queryStr = `SELECT id FROM member \
    WHERE memberName = '${memberName}'`
    db.query(queryStr, function(err, result) {
      if(err) {
        console.log(err);
      } else {
        callback(result);
      }
    })
  },

  //used to select debt amount between 2 people
  debtAmount: function(debtId, callback) {
    let queryStr = 'SELECT amount FROM debt \
    WHERE id = debtId';
    db.query(queryStr, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        callback(result);
      }
    });
  }

  //select how many debts and how much in total is owned between users

}

const update = {

  //used to update debt amount between 2 people
  debtAmount: function(debtId, newAmt, callback) {
    let queryStr = 'UPDATE debt SET amount = newAmt \
    WHERE id = debtId'
    db.query(queryStr, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        callback(result);
      }
    });
  }

}

module.exports.insert = insert;
module.exports.select = select;
module.exports.update = update;

//insert into member (memberName, userLoginID) value ('Adam', 0)