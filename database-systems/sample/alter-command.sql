use School

-- ! adds a single column to the table
alter table student 
add grades INT

-- ! adds multi column to the table
alter table student
add entryDate DATETIME, location VARCHAR(40)

-- ! change the data type of a column 
 alter table student 
 alter column grades SMALLINT