import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;

import org.json.simple.JSONArray;
import java.util.HashMap;

public class StudentManager {
    static ArrayList<Student> studentList = new ArrayList<Student>();

    private String studentNamePath = "\\C:\\Users\\Lenovo\\Desktop\\workspace\\Java Projects\\oop-project\\database\\student_names.json";
    private String studentIdsPath = "\\C:\\Users\\Lenovo\\Desktop\\workspace\\Java Projects\\oop-project\\database\\student_ids.json";

    FileHandler fileHandler = new FileHandler();

    public ArrayList<Student> createStudent() {
        HashMap<String, JSONArray> students = FileHandler.readStudents(studentIdsPath, studentNamePath);
        Random rand = new Random();

        for (int i = 0; i < students.get("Names").size(); i++) {
            HashMap<String, String> nameMap = (HashMap<String, String>) students.get("Names").get(i);
            HashMap<String, String> idMap = (HashMap<String, String>) students.get("IDs").get(i);
            int randomNumberForSemester = rand.nextInt(100);
            int randomNumberForGrade = 1 + rand.nextInt(4);
            if (randomNumberForSemester % 2 == 0) {
                Student student = new Student(nameMap.get("name"), idMap.get("random_id"), randomNumberForGrade,"FALL");
                studentList.add(student);
            } else {
                Student student = new Student(nameMap.get("name"), idMap.get("random_id"), randomNumberForGrade,"SPRING");
                studentList.add(student);
            }
        }
        return studentList;
    }

}