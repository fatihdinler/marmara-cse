-- To create a new database, use this command.
-- ex: create database <database_name>
-- create database school

-- use school database.
use school

-- To create a new table, use this command.
create table Student_T
(
    StudentNumber VARCHAR(4),
    StudentName VARCHAR(12),
    StudentSurname VARCHAR(12),
    StudentSSNNumber CHAR(11),
    StudentInformation text
)