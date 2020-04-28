INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('user@test.test', 'password', false);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('recruiter@test.test', 'password', true);

INSERT INTO userprofile ( user_id, profile_img, first_name, last_name, tagline, website, descrip, city, willmove, testresults) VALUES ( 1, 'http://www.placecage.com/400/400', 'Fake', 'Name', 'Hire me please', 'www.google.com', 'This is the description section. Fake Name is a human being whom would like to be hired', 'Atlanta', true, 'Legal & Compliance');

INSERT INTO recruiterprofile ( user_id, first_name, last_name ) VALUES (2, 'Recruiter', 'Person');

INSERT INTO interviews ( user_id, interview_time, interview_location ) VALUES (1, '2012-12-21 12:12:12', 'Zoom or some business address yo');

SELECT * FROM user;
SELECT * FROM userprofile;
SELECT * FROM recruiterprofile;
SELECT * FROM interviews;