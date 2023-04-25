package code;

import java.io.*;
import java.util.*;
import org.json.simple.*;
import org.json.simple.parser.*;

public class CourseManager {

    static JSONParser jsonParser = new JSONParser();
    String path = "\\C:\\Users\\dilan\\Downloads\\CSE3063F22P1_GRP8-main\\CSE3063F22P1_GRP8-main\\Iteration #2\\database\\courses.json";

    private static ArrayList<Course> normalCourses = new ArrayList<Course>();
    private static ArrayList<Course> electiveCourses = new ArrayList<Course>();

    public void createCourse() {
        String courseName;
        String courseCode;
        String courseType;
        String courseCredit;
        String courseQuota="";
        String[] courseCategory = { "semester1", "semester2", "semester3", "semester4", "semester5", "semester6",
                "semester7", "semester8", "FTE", "TE", "NTE" };
        for (int i = 0; i < courseCategory.length; i++) {
            JSONArray courseMap = FileHandler.readCourses(path, courseCategory[i]);
            for (Object object : courseMap) {
                courseName = (String) ((JSONObject) object).get("Course Name");
                courseCode = (String) ((JSONObject) object).get("Course Code");
                courseType = (String) ((JSONObject) object).get("Type");
                courseCredit = (String) ((JSONObject) object).get("ECTS");
                
                Course courseToBeAdded;
                switch (courseCategory[i]) {
                    case "FTE":
                        // System.out.println(object);
                        courseToBeAdded = new FteCourse(courseCode, courseName, courseCredit);
                        electiveCourses.add(courseToBeAdded);
                        break;
                    case "NTE":
                        courseToBeAdded = new NteCourse(courseCode, courseName, courseCredit);
                        electiveCourses.add(courseToBeAdded);
                        break;
                    case "TE":
                        courseToBeAdded = new TeCourse(courseCode, courseName, courseCredit);
                        electiveCourses.add(courseToBeAdded);
                        break;

                    default:
                    if(courseCode.equalsIgnoreCase("CSE4000")||courseCode.equalsIgnoreCase("CSE3000"))
                        courseToBeAdded = new Course(courseName, courseCode, courseCredit);
                    
                    else
                        courseQuota = (String) ((JSONObject) object).get("Quota");
                        courseToBeAdded = new Course(courseName, courseCode, courseCredit,courseQuota);
                        normalCourses.add(courseToBeAdded);
                        break;
                }
            }
        }

    }

    public static ArrayList<Course> getNormalCourses() {
        return normalCourses;
    }

    public static ArrayList<Course> getElectiveCourses() {
        return electiveCourses;
    }

}
