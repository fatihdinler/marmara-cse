import random

class Transcript:

    def _init_(self, letterGrade = None):
        self.__letterGrade = letterGrade

    def getLetterGrade(self):
        return self.letterGrade

    def setLetterGrade(self, letterGrade):
        self.letterGrade = letterGrade

    def generateRandomLetterGrade(self):
        try : 
            grades = ["AA", "BA", "BB", "CB", "CC", "DC", "DD", "FD", "FF"]
            letterGrade = random.choice(grades)
            self.setLetterGrade(letterGrade)
        except Exception as error : 
            print('Error is occurred with generateRandomLetterGrade : ' , str(error))
            
        
    def gradeChangeToDouble(self, grade):
        try : 
            if grade == "AA":
                return 4
            elif grade == "BA":
                return 3.5
            elif grade == "BB":
                return 3
            elif grade == "CB":
                return 2.5
            elif grade == "CC":
                return 2
            elif grade == "DC":
                return 1.5
            elif grade == "DD":
                return 1
            elif grade == "FD":
                return 0.5
            elif grade == "FF":
                return 0
        except Exception as error : 
            print('Error occurred with gradeChangeToDouble : ' , str(error))
    
    def printStudentInfoOnConsole(self, student = None, advisor= None, course= None, gano= None, yano = None):
        try : 
            print("----- Students are created! -----")
            print("For Example: ")
            print()
            print("Student Name: " + student.getName())
            print("Student Number: " + str(student.getStudentNumber()))
            print("Student Year: " + str(student.getYear()))
            print("Student Semester: " + str(student.getSemester()))
            print("Student Department: " + student.getDepartment())
            print("Student Title: " + student.getTitle())
            print("Student Yano: " + str(yano))
            print("Student Gano: " + str(gano))
            print("Student Advisor Name and Title: " + advisor.getTitle() + " " + advisor.getName())
            print()
            print("Last Semester Course Names: ")
            for i, c in enumerate(course.getLastSemesterCourseList()):
                print(i + 1, c.course_name)
        except Exception as error : 
            print('Error occurred with printStudentInfoOnConsole : ' , str(error))
