import java.util.ArrayList;

public class Course {

    private String courseName;
    private int takenSemester;
    private String courseCode;
    private Course prequisiteCourse;
    private int credit;
    private ArrayList<Student> enrolledStudent;
    private ArrayList<Lecturer> lecturerOfCourse;

    public Course() {
        
    }

    public Course(String courseName, int takenSemester, String courseCode, Course prequisiteCourse, int credit, ArrayList<Student> enrolledStudent, ArrayList<Lecturer> lecturerOfCourse) {
        this.courseName = courseName;
        this.takenSemester = takenSemester;
        this.courseCode = courseCode;
        this.prequisiteCourse = prequisiteCourse;
        this.credit = credit;
        this.enrolledStudent = enrolledStudent;
        this.lecturerOfCourse = lecturerOfCourse;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public int getTakenSemester() {
        return takenSemester;
    }

    public void setTakenSemester(int takenSemester) {
        this.takenSemester = takenSemester;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public Course getPrequisiteCourse() {
        return prequisiteCourse;
    }

    public void setPrequisiteCourse(Course prequisiteCourse) {
        this.prequisiteCourse = prequisiteCourse;
    }

    public int getCredit() {
        return credit;
    }

    public void setCredit(int credit) {
        this.credit = credit;
    }

    public ArrayList<Student> getEnrolledStudent() {
        return enrolledStudent;
    }

    public void setEnrolledStudent(ArrayList<Student> enrolledStudent) {
        this.enrolledStudent = enrolledStudent;
    }

    public ArrayList<Lecturer> getLecturerOfCourse() {
        return lecturerOfCourse;
    }

    public void setLecturerOfCourse(ArrayList<Lecturer> lecturerOfCourse) {
        this.lecturerOfCourse = lecturerOfCourse;
    }
}
