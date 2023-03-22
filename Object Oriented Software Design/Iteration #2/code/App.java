package code;

import java.io.*;
import java.util.*;
import org.json.simple.*;
import org.json.simple.parser.*;

public class App {

    static ArrayList<Student> studentList = new ArrayList<>();
    static ArrayList<Course> normalCourses = new ArrayList<>();
    static ArrayList<Course> electiveCourses = new ArrayList<>();

    public static void main(String[] args) throws Exception {

        // Read courses by this way.
        // String path = "\\C:\\Users\\Lenovo\\Desktop\\workspace\\Java
        // Projects\\oop-project\\database\\courses.json";
        // JSONArray semester1Courses = fileHandler.readCourses(path, "semester1");
        // System.out.println(semester1Courses);

        // Create edilen studentları görmek için
        // getStudentList();
        getNormalCourses();
        getElectiveCourses();

    }

    public static void getNormalCourses() {
        CourseManager cm = new CourseManager();
        cm.createCourse();
        normalCourses = cm.getNormalCourses();
        for (int i = 0; i < normalCourses.size(); i++) {
            System.out.println(normalCourses.get(i).getCourseName() + "   " + normalCourses.get(i).getCourseCode() + "   " + normalCourses.get(i).getCredit()+
             "   " + normalCourses.get(i).getQuota());
        }
    }

    public static void getElectiveCourses() {
        CourseManager cm = new CourseManager();
        cm.createCourse();
        electiveCourses = cm.getElectiveCourses();
        for (int i = 0; i < electiveCourses.size(); i++) {
            System.out.println(electiveCourses.get(i).getCourseName() + "   " + electiveCourses.get(i).getCourseCode() + "   " + electiveCourses.get(i).getCredit());
        }
    }

    public static void getStudentList() {
        StudentManager sm = new StudentManager();
        studentList = sm.createStudent();
        for (int i = 0; i < studentList.size(); i++) {
            System.out.println(studentList.get(i).getName() + "   " + studentList.get(i).getStudentId() + "   "
                    + studentList.get(i).getGrade() + "   " + studentList.get(i).getSemester());
        }
    }
}
