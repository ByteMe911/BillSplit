//The commited out info is where foreign keys will point to other tables.
//to get a similiar effect without a database, point to the object itself like so
//window.events = {
//   event0: {
//     eventid: 0,
//     eventName: Dinner
//     belongsTo: window.userLogins.userLogin0
//   }
// }

window.userLogins = {
  userLogin0: {
    userid: 0,
    username: Adam,
    password: Adam
  },
  userLogin1: {
    userid: 1,
    username: Tom,
    password: Tom
  },
  userLogin2: {
    userid: 2,
    username: Jimmy,
    password: Jimmy
  },
  userLogin3: {
    userid: 3,
    username: Himanshu,
    password: Himanshu
  }
}

window.events = {
  event0: {
    eventid: 0,
    eventName: Dinner
    //belongsTo: userLogin0.userid
  }
}

window.members = {
  member0: {
    memberid: 0,
    memberName: Adam
    //belongsTo: userLogin0.userid
  },
  member1: {
    memberid: 1,
    memberName: Tom
    //belongsTo: userLogin0.userid
  },
  member2: {
    memberid: 2,
    memberName: Jimmy
    //belongsTo: userLogin0.userid
  },
  member3: {
    memberid: 3,
    memberName: Himanshu
    //belongsTo: userLogin0.userid
  }
}

window.eventMembers = {
  //member: members.member0.memberid
  //event: events.event0.eventid
  //belongsTo: userLogin0.userid
}

window.debts = {
  debt0: {
    debtid: 0,
    amount: 100
    //debtor: members.member0.memberid
    //creditor: members.member1.memberid
    //belongsTo: userLogin0.userid
  },
  debt0: {
    debtid: 1,
    amount: 75
    //debtor: members.member3.memberid
    //creditor: members.member4.memberid
    //belongsTo: userLogin0.userid
  }
}