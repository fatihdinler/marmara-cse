import random
import json

from Advisor import Advisor
from Course import Course
from Transcript import Transcript


class StudentProcess:

    def __init__(self, new_student = None):
        self.__student = new_student
        self.__List = []
        self.List2 = []

    def getList(self):
        return self.__List

    def setList(self, List):
        self.__List.append(List)

    def getList2(self):
        return self.__List2

    def setList2(self, List2):
        self.__List2 = List2

    def getStudent(self):
        return self.__student

    def setStudent(self, student):
        self.__student = student
        
    def createStudentJsonFile(self):
        try : 
            course = Course()
            transcript = Transcript()
            advisor = Advisor()
            jsonObj = {}
            with open("C:\\Users\\90554\\PycharmProjects\\OOPProject\\Student\\" + str(self.getStudent().getStudentNumber()) + ".json", "w") as file:

                course.takeCoursesFromInputFile(self.getStudent().getStudentList()[0].getSemester())
                advisor.takeAdvisorFromInputFile()
                studentInfo = {"Student Year": self.getStudent().getStudentList()[0].getYear(),
                        "Student Semester": self.getStudent().getStudentList()[0].getSemester(),
                        "Student Number": self.getStudent().getStudentList()[0].getStudentNumber(),
                        "Student Department": self.getStudent().getStudentList()[0].getDepartment(),
                        "Advisor Info": advisor.randomAdvisorAssignment()}

                for i in range(len(course.getCourseList())):
                    transcript.generateRandomLetterGrade()
                    courseInfo = course.getCourseList()[1].getCourseName() + " - " + transcript.getLetterGrade()
                    a = {"Course Name " + str(i + 1): courseInfo}
                    self.setList(a)

                # Write data to Json file
                List2 = [studentInfo, self.getList()]
                jsonString = json.dumps(List2)
                file.write(jsonString)
                file.close()

            course.takeElectiveCoursesFromInputFile()
    
            for i in range(2, self.getStudent().getSemester() + 1):
                if i == 2:
                    jsonObj["Elective Course " + str(i - 1)] = course.getElectiveCourseList()[
                        random.randint(0,8)].getCourseName()
                elif i == 3:
                    jsonObj["Elective Course " + str(i - 1)] = course.getElectiveCourseList()[
                        random.randint(0,8)].getCourseName()
                elif i == 7:
                    jsonObj["Elective Course " + str(i - 4)] = course.getElectiveCourseList()[
                        random.randint(0,8) + 8].getCourseName()
                    jsonObj["Elective Course " + str(i - 3)] = course.getElectiveCourseList()[
                        random.randint(0,8) + 16].getCourseName()
                    jsonObj["Elective Course " + str(i - 2)] = course.getElectiveCourseList()[
                        random.randint(0,8) + 16].getCourseName()



            if self.getStudent().getStudentList()[0].getStudentNumber() == 150122001:
                transcript.printStudentInfoOnConsole(self.getStudent(), advisor, course)
        except Exception as error : 
            print('Error is occurred with createStudentJsonFile : ' , str(error))
