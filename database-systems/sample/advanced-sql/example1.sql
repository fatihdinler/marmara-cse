use Company;

-- Query 1: List all employees along with their department names.
-- SELECT e.FirstName, e.LastName, d.DepartmentName
-- FROM Employees e
--     INNER JOIN Departments d
--     ON e.DepartmentID = d.DepartmentID

-- Query 3: List all projects with their assigned employees and hours worked.
-- SELECT p.ProjectName, ep.HoursWorked, e.EmployeeID, e.FirstName, e.LastName
-- FROM Projects p
--     INNER JOIN EmployeeProjects ep
--     ON p.ProjectID = ep.ProjectID
--     INNER JOIN Employees e
--     ON e.EmployeeID = ep.EmployeeID