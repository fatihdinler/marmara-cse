public class Student {
    private String name;
    private String studentId;
    private int grade;
    private String semester;

    public Student(String name, String studentId, int grade, String semester) {
        this.name = name;
        this.studentId = studentId;
        this.grade = grade;
        this.semester = semester;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }
}