package code;

import java.util.ArrayList;

public class transcript {
    private ArrayList<Course> passedCourses;
    private ArrayList<Course> failedCourses;
    private int totalCredits;
    private float gpa;

    public transcript(ArrayList<Course> passedCourses,
            ArrayList<Course> failedCourses, int totalCredits, float gpa) {
        this.passedCourses = passedCourses;
        this.failedCourses = failedCourses;
        this.totalCredits = totalCredits;
        this.gpa = gpa;
    }

    public ArrayList<Course> getPassedCourses() {
        return this.passedCourses;
    }

    public ArrayList<Course> getFailedCourses() {
        return this.failedCourses;
    }

    public int getTotalCredits() {
        return totalCredits;
    }

    public float getGpa() {
        return gpa;
    }

}
