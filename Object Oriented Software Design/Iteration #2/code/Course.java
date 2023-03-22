package code;

import javax.print.DocFlavor.STRING;

public class Course {
    private String courseName;
    private String courseCode;
    private String credit;
    private int grade;
    private String semester;
    private String quota;

    public String getQuota() {
        return quota;
    }

    public Course(String courseName, String courseCode, String credit, String quota) {
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.credit = credit;
        this.quota = quota;
    }

    public Course(String courseName, String courseCode, String credit) {
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.credit = credit;
    }

    public String getCourseName() {
        return courseName;
    }
    public String getCourseCode() {
        return courseCode;
    }
    public String getSemester() {
        return semester;
    }
    public String getCredit() {
        return credit;
    }
    public int getGrade() {
        return grade;
    }
}
