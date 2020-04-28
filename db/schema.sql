DROP DATABASE IF EXISTS `aptitude_db`;
CREATE DATABASE `aptitude_db`;
-- Need to not drop database after it's hosted
USE `aptitude_db`;


CREATE TABLE user (
user_id int NOT NULL AUTO_INCREMENT,
email varchar( 50 ) NOT NULL UNIQUE,
usr_pass varchar( 32 ) NOT NULL,
recruiter boolean NOT NULL,
PRIMARY KEY ( user_id )
);

CREATE TABLE userprofile (
profile_id int NOT NULL AUTO_INCREMENT,
profile_img varchar ( 64 ),
first_name varchar ( 64 ) NOT NULL,
last_name varchar ( 64 ) NOT NULL,
tagline varchar ( 64 ),
website varchar ( 64 ),
descrip varchar( 512 ),
city varchar ( 64 ) NOT NULL,
willmove boolean NOT NULL,
testresults varchar ( 64 ),
user_id int NOT NULL,
PRIMARY KEY ( profile_id ),
FOREIGN KEY ( user_id ) REFERENCES User ( user_id )
);

CREATE TABLE recruiterprofile (
recruiter_id int NOT NULL AUTO_INCREMENT,
first_name varchar ( 64 ) NOT NULL,
last_name varchar ( 64 ) NOT NULL,
user_id  int NOT NULL,
PRIMARY KEY ( recruiter_id ),
FOREIGN KEY ( user_id ) REFERENCES User ( user_id )
);

CREATE TABLE interviews (
interview_id int NOT NULL AUTO_INCREMENT,
user_id INT NOT NULL,
interview_time DATETIME NOT NULL,
interview_location varchar ( 64 ) NOT NULL,
PRIMARY KEY ( interview_id ),
FOREIGN KEY ( user_id ) REFERENCES User ( user_id )
);