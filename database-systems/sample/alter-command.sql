use school;

-- To add a new column to an existing table, use ALTER command with the following syntax.
ALTER TABLE Student_T 
ADD StudentGrades INT

-- You can add multiple columns in one SQL command as follows. 
ALTER TABLE Student_T
ADD StartDate DATETIME, StudentAddress VARCHAR(40)

-- To change the data type of a column, use ALTER command with the following syntax.
-- Go for Student_T table, find out the StudentGrades column & change it data type to SMALLINT.
ALTER TABLE Student_T
ALTER COLUMN StudentGrades SMALLINT