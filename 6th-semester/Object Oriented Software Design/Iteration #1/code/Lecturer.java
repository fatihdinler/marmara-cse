import java.util.ArrayList;

public class Lecturer extends Person{
    private ArrayList<Course> teachingCourses;

    public Lecturer() {
    }

    public Lecturer(ArrayList<Course> teachingCourses) {
        this.teachingCourses = teachingCourses;
    }

    public ArrayList<Course> getTeachingCourses() {
        return teachingCourses;
    }

    public void setTeachingCourses(ArrayList<Course> teachingCourses) {
        this.teachingCourses = teachingCourses;
    }
}
