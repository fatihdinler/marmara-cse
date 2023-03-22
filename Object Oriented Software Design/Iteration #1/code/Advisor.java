import java.util.ArrayList;

public class Advisor extends Lecturer {
    private ArrayList<Student> studentList;

    public Advisor() {
    }

    public Advisor(ArrayList<Student> studentList) {
        this.studentList = studentList;
    }

    public ArrayList<Student> getStudentList() {
        return studentList;
    }

    public void setStudentList(ArrayList<Student> studentList) {
        this.studentList = studentList;
    }
}
