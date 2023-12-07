import java.io.*;
import java.util.*;
import org.json.simple.*;
import org.json.simple.parser.*;

public class FileHandler {

    static JSONParser jsonParser = new JSONParser();

    public static JSONArray readCourses(String path, String courseCategory) {
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(path), "UTF-8"));
            JSONObject allCourses = (JSONObject) jsonParser.parse(reader);
            JSONArray requestedCourses = (JSONArray) allCourses.get(courseCategory);
            return requestedCourses;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static HashMap<String, JSONArray> readStudents(String idPath, String namePath) {
        HashMap<String, JSONArray> students = new HashMap<String, JSONArray>();
        try {
            FileReader reader = new FileReader(idPath);
            Object studentIDs = jsonParser.parse(reader); // all courses.
            JSONArray studentIDsArray = (JSONArray) studentIDs;
            students.put("IDs", studentIDsArray);
            FileReader reader2 = new FileReader(namePath);
            Object studentNames = jsonParser.parse(reader2);
            JSONArray studentNamesArray = (JSONArray) studentNames;
            students.put("Names", studentNamesArray);
            return students;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
}
