DROP DATABASE IF EXISTS `aptitude_db`;
CREATE DATABASE `aptitude_db`;
-- Need to not drop database after it's hosted
USE `aptitude_db`;


CREATE TABLE user (
id int NOT NULL AUTO_INCREMENT,
email varchar( 50 ) NOT NULL UNIQUE,
usrpass varchar( 32 ) NOT NULL,
employer boolean NOT NULL,
PRIMARY KEY ( id )
);

CREATE TABLE userprofile (
profileid int NOT NULL AUTO_INCREMENT,
profileimg varchar ( 64 ),
firstname varchar ( 64 ) NOT NULL,
lastname varchar ( 64 ) NOT NULL,
githublnk varchar ( 64 ),
tagline varchar ( 64 ),
website varchar ( 64 ),
descrip varchar( 512 ),
city varchar ( 64 ) NOT NULL,
willmove boolean NOT NULL,
testresults varchar ( 64 ),
id int NOT NULL,
PRIMARY KEY ( profileid )
);

CREATE TABLE employerprofile (
companyid int NOT NULL AUTO_INCREMENT,
companyname varchar( 64 ) NOT NULL UNIQUE,
companyimg varchar ( 64 ),
tagline varchar( 64 ),
website varchar ( 64 ),
descrip varchar( 512 ),
resultinterest varchar ( 64 ),
id int NOT NULL,
PRIMARY KEY ( companyid )
);