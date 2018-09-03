CREATE DATABASE IF NOT EXISTS billSplit;

USE billSplit;

CREATE TABLE IF NOT EXISTS userLogin (
  id int NOT NULL AUTO_INCREMENT,
  username VARCHAR(34) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS member (
  id int NOT NULL AUTO_INCREMENT,
  memberName VARCHAR(34) NOT NULL,
  userLoginID int,
  FOREIGN KEY (userLoginID) REFERENCES userLogin(id),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS event (
  id int NOT NULL AUTO_INCREMENT,
  eventName VARCHAR(255) NOT NULL,
  userLoginID int,
  FOREIGN KEY (userLoginID) REFERENCES userLogin(id),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS eventMember (
  id int NOT NULL AUTO_INCREMENT,
  memberID int,
  eventID int,
  userLoginID int,
  FOREIGN KEY (memberID) REFERENCES member(id),
  FOREIGN KEY (eventID) REFERENCES event(id),
  FOREIGN KEY (userLoginID) REFERENCES userLogin(id),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS debt (
  id int NOT NULL AUTO_INCREMENT,
  debtor int,
  creditor int,
  event int,
  userLoginID int,
  amount NUMERIC(18,2) NOT NULL,
  FOREIGN KEY (debtor) REFERENCES member(id),
  FOREIGN KEY (creditor) REFERENCES member(id),
  FOREIGN KEY (userLoginID) REFERENCES userLogin(id),
  FOREIGN KEY (event) REFERENCES event(id),
  PRIMARY KEY (id)
);

/*
Run
mysql -u root -p < schema.sql
from the command line in the database-mysql folder
change 'root' to your username
*/