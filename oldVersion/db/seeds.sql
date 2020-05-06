INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('graybear@bearmail.com', 'gbear1', false);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('2bears@bearmail.com', '2beary', false);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('colorfulmurray@fake.com', 'murray', false);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('graymurray@fake.com', 'gmurray', false);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('normalcage@nic.com', 'cage', false);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('graycage@nic.com', 'gcage', false);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('crazycage@fake.com', 'niccage', false);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('sadbear@cage.com', 'frownbear', false);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('waterbear@bear.com', 'splashbear', false);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('Austin@companymail.com', 'Austin', true);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('Aaron@companymail.com', 'Aaron', true);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('Abbie@companymail.com', 'Abbie', true);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('Gabriella@companymail.com', 'Gabriella', true);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('Galina@companymail.com', 'Galina', true);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('Genesis@companymail.com', 'Genesis', true);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('Glenn@companymail.com', 'Glenn', true);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('Orion@companymail.com', 'Orion', true);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('Ollie@companymail.com', 'Ollie', true);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('Upton@companymail.com', 'Upton', true);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('Winona@companymail.com', 'Winona', true);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('Winter@companymail.com', 'Winter', true);
INSERT INTO user ( email, usr_pass, recruiter ) VALUES ('Xenia@companymail.com', 'Xenia', true);

INSERT INTO userprofile ( user_id, profile_img, first_name, last_name, profback, website, descrip, city, willmove, testresults) VALUES ( 1, 'https://placebear.com/g/400/400', 'Gray', 'Bear', 1, 'https://en.wikipedia.org/wiki/Bear', 'Bear, highly efficient in resolution conflict.', 'Great Smoky Mountains', false, 'Human Resources');
INSERT INTO userprofile ( user_id, profile_img, first_name, last_name, profback, website, descrip, city, willmove, testresults) VALUES ( 2, 'https://www.placebear.com/400/400', 'Two', 'Bears', 2, 'https://tinyurl.com/y8zqswmq', 'A team of bears dedicated to risk analysis.', 'Blue Ridge', true, 'Risk & Quantitative Analysis');
INSERT INTO userprofile ( user_id, profile_img, first_name, last_name, profback, website, descrip, city, willmove, testresults) VALUES ( 3, 'http://www.fillmurray.com/500/500', 'Debonair', 'Murray', 3, 'https://www.imdb.com/name/nm0000195/','"Bill Murray is an American actor, comedian, and writer." -IMDB', 'Wilmette, Illinois', true, 'Sales & Relationship Management');
INSERT INTO userprofile ( user_id, profile_img, first_name, last_name, profback, website, descrip, city, willmove, testresults) VALUES ( 4, 'http://www.fillmurray.com/g/500/500', 'Gray', 'Murray', 4, 'https://en.wikipedia.org/wiki/Bill_Murray', 'William James Murray is,"...Known for his deadpan delivery[, Bill] first rose to fame on Saturday Night Live," from which he won an emmy (wikipedia).', 'Evanston, Illinois', false, 'Finance');
INSERT INTO userprofile ( user_id, profile_img, first_name, last_name, profback, website, descrip, city, willmove, testresults) VALUES ( 5, 'http://www.placecage.com/400/400', 'Nicolas', 'Cage', 5, 'https://www.imdb.com/name/nm0000115/', '"Nicolas Cage was born Nicolas Kim Coppola in Long Beach, California, the son of comparative literature professor August Coppola and dancer/choreographer Joy Vogelsang." -IMDB', 'Long Beach, California', true, 'Strategic Initiatives & Business Management');
INSERT INTO userprofile ( user_id, profile_img, first_name, last_name, profback, website, descrip, city, willmove, testresults) VALUES ( 6, 'http://www.placecage.com/g/400/400', 'Gray', 'Cage', 6, 'https://googlethatforyou.com?q=Nicolas%20Cage', 'You know him.', 'Somewhere', false, 'Internal Audit');
INSERT INTO userprofile ( user_id, profile_img, first_name, last_name, profback, website, descrip, city, willmove, testresults) VALUES ( 7, 'http://www.placecage.com/c/400/400', 'Bird', 'Cage', 7, 'http://www.placecage.com/c/400/400', 'A very rare cage.', '1 out of 1000', true, 'Legal & Compliance');
INSERT INTO userprofile ( user_id, profile_img, first_name, last_name, profback, website, descrip, city, willmove, testresults) VALUES ( 8, 'https://www.placebear.com/g/500/500', 'Smart', 'Bear', 8, 'https://en.wikipedia.org/wiki/Aristotle', "I wonder what he's thinking about?", 'A forest near you', false, 'Marketing & Corporate Communications');
INSERT INTO userprofile ( user_id, profile_img, first_name, last_name, profback, website, descrip, city, willmove, testresults) VALUES ( 9, 'https://www.placebear.com/600/600', 'Fishing', 'Bearoni', 1, 'https://en.wikipedia.org/wiki/Fishing',"'Fishing is the activity of trying to catch fish. Fish are normally caught in the wild. Techniques for catching fish include hand gathering, spearing, netting, angling and trapping.' - wikipedia ", 'Some river', true, 'Technology Support');
 
INSERT INTO interviews ( user_id, interview_time, interview_location, recruiter_id ) VALUES (5, '2020-05-07T15:37', 'At the office, conference room 203.', 20);

SELECT * FROM user;
SELECT * FROM userprofile;
SELECT * FROM recruiterprofile;
SELECT * FROM interviews;