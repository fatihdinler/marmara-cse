import java.util.ArrayList;

public class CourseDetails extends Course {
    private int numberOfMaximumStudents;
    private ArrayList<String> days;
    private int theoriticalHours;
    private int labHours;

    public CourseDetails() {
    }

    public CourseDetails(int numberOfMaximumStudents, ArrayList<String> days, int theoriticalHours, int labHours) {
        this.numberOfMaximumStudents = numberOfMaximumStudents;
        this.days = days;
        this.theoriticalHours = theoriticalHours;
        this.labHours = labHours;
    }

    public int getNumberOfMaximumStudents() {
        return numberOfMaximumStudents;
    }

    public void setNumberOfMaximumStudents(int numberOfMaximumStudents) {
        this.numberOfMaximumStudents = numberOfMaximumStudents;
    }

    public ArrayList<String> getDays() {
        return days;
    }

    public void setDays(ArrayList<String> days) {
        this.days = days;
    }

    public int getTheoriticalHours() {
        return theoriticalHours;
    }

    public void setTheoriticalHours(int theoriticalHours) {
        this.theoriticalHours = theoriticalHours;
    }

    public int getLabHours() {
        return labHours;
    }

    public void setLabHours(int labHours) {
        this.labHours = labHours;
    }
}
