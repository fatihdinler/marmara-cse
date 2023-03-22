import java.util.ArrayList;

public class Student extends Person {
    private String studentID;
    private String department;
    private Integer semesterNumber;
    private double gpa;
    private ArrayList<Course> currentCourses;
    private ArrayList<Course> passedCourses;
    private ArrayList<Course> failedCourses;
    private ArrayList<Course> requestedCourses;

    public Student() {
    }

    public Student(String studentID, String department, Integer semesterNumber, double gpa, ArrayList<Course> currentCourses, ArrayList<Course> passedCourses, ArrayList<Course> failedCourses, ArrayList<Course> requestedCourses) {
        this.studentID = studentID;
        this.department = department;
        this.semesterNumber = semesterNumber;
        this.gpa = gpa;
        this.currentCourses = currentCourses;
        this.passedCourses = passedCourses;
        this.failedCourses = failedCourses;
        this.requestedCourses = requestedCourses;
    }

    public String getStudentID() {
        return studentID;
    }

    public void setStudentID(String studentID) {
        this.studentID = studentID;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getSemesterNumber() {
        return semesterNumber;
    }

    public void setSemesterNumber(Integer semesterNumber) {
        this.semesterNumber = semesterNumber;
    }

    public double getGpa() {
        return gpa;
    }

    public void setGpa(double gpa) {
        this.gpa = gpa;
    }

    public ArrayList<Course> getCurrentCourses() {
        return currentCourses;
    }

    public void setCurrentCourses(ArrayList<Course> currentCourses) {
        this.currentCourses = currentCourses;
    }

    public ArrayList<Course> getPassedCourses() {
        return passedCourses;
    }

    public void setPassedCourses(ArrayList<Course> passedCourses) {
        this.passedCourses = passedCourses;
    }

    public ArrayList<Course> getFailedCourses() {
        return failedCourses;
    }

    public void setFailedCourses(ArrayList<Course> failedCourses) {
        this.failedCourses = failedCourses;
    }

    public ArrayList<Course> getRequestedCourses() {
        return requestedCourses;
    }

    public void setRequestedCourses(ArrayList<Course> requestedCourses) {
        this.requestedCourses = requestedCourses;
    }
}
