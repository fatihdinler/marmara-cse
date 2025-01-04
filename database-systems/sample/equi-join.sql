use Company;

-- Retrieve the EmployeeID, FirstName, LastName, ProjectName, and HoursWorked for all employees by matching the EmployeeID 
-- in the Employees table with the EmployeeID in the EmployeeProjects table and matching the ProjectID in the EmployeeProjects
-- table with the ProjectID in the Projects table. Use only the WHERE clause to connect the tables.

SELECT Employees.EmployeeID, Employees.FirstName, Employees.LastName, Projects.ProjectName, EmployeeProjects.HoursWorked
FROM Employees, EmployeeProjects, Projects
WHERE (Employees.EmployeeID = EmployeeProjects.EmployeeID AND EmployeeProjects.ProjectID = Projects.ProjectID)
ORDER BY Employees.EmployeeID;