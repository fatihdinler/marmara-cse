import logging
import json
import random

from OOPProject.StudentProcess import StudentProcess
from Person import Person
from configparser import ConfigParser


class Student(Person):

    def __init__(self, year=None, studentNumber=None, semester=None):
        self.__studentNumber = studentNumber
        self.__year = year
        self.__semester = semester
        self.__studentList = []


    def setStudentNumber(self, studentNumber):
        self.__studentNumber = studentNumber

    def getSemester(self):
        return self.__semester

    def setSemester(self, semester):
        if semester < 1 or semester > 8:
            # If enter a value that less than 1 or more than 8 print error message
            raise ValueError("Semester can't be both less than 1 and more than 8.")
        self.__semester = semester

    def getYear(self):
        return self.__year

    def setYear(self, year):
        if year < 1 or year > 4:
            # If enter a value that less than 1 or more than 4 print error message
            raise ValueError("Year can't be both less than 1 and more than 4.")
        self.__year = year

    def __addStudentList(self, student):
        self.getStudentList().append(student)

    def getStudentList(self):
        return self.__studentList

    def setStudentList(self, studentList):
        self.__studentList = studentList

    def generateRandomName(self):
        try :
            firstNames = ["Selim", "Kaan", "Ali", "Muzaffer", "Elif", "Berke", "Sadık", "Bekir", "Kemal",
                      "Gökçe", "Mert", "Ayşenur", "Ferhat", "Ebrar", "Görkem", "Oğuzalp", "Melikşah", "İrfancan",
                      "Atilla", "Dilara", "Şevval",
                      "Muhammed", "Fedai", "Batuhan", "Eda", "Taylan", "Korkut", "Ömer Faruk", "Ebubekir Sıddık",
                      "Deniz", "Meryem", "Danyal",
                      "Emre", " Nazım", "Hikmet", "Talha", "Yakup", "Zülfikar", "Ceylin", "Emircan", "Mervan",
                      "Pekgüzel", "Büşra",
                      "İrem", "Mehlika", "Asena", "Ahsen", "Yağmur", "Enes"]
            lastNames = ["iğrek", "Mungan", "Mustan", "Koçoğlu", "Dizer", "Yıldırım", "Meydan", "Erkam",
                     "Bilge", "Albeni", "Aktemur", "Tatlı", "Dikici", "Balta", "Demirel", "Yavaş", "Aktaş",
                     "Kıl", "Zengin", "Koç", "Sabancı", "Terim", "Ülker", "Yandaş", "Yıldırım", "Tüfekci", "Karaköse",
                     "İpek", "Gülmemiş", "Bal", "Derici", "Belözoğlu", "Bayındır", "Aziz", "Kahveci", "Kadıoğlu",
                     "Karaçay",
                     "Kamaylı"]

            fullName = random.choice(firstNames) + " " + random.choice(lastNames)

            return fullName
        except Exception as error :
            print('Error occurred with generateRandomFile : ' , str(error))

    def generateStudentNumber(self, year, count):
        try :
            numberStart = str(150123 - year)
            numberStart += "0"
            if count < 10:
                studentNum = numberStart + "0" + str(count + 1)
            else:
                studentNum = numberStart + str(count + 1)

            return int(studentNum)
        except Exception as error :
            print('Error occurred with generateStudentNumber : ' , str(error))




    def generateStudentSemester(self, year):
        try :
            logging.basicConfig(filename='student.log', level=logging.INFO)
            logger = logging.getLogger(__name__)
            if year == 1:
                logger.debug("Student is in the 1st year and 1st semester")
                return 1
            elif year == 2:
                logger.debug("Student is in the 2nd year and 3rd semester")
                return 3
            elif year == 3:
                logger.debug("Student is in the 3rd year and 5th semester")
                return 5
            elif year == 4:
                logger.debug("Student is in the 4th year and 7th semester")
                return 7
            else:
                logger.warning("Year entered is invalid")
                return None
        except Exception as error :
            print('Error occurred with generateStudentSemester : ' , str(error))

    def printLogs(self):
        try :
            if self.getYear() == 1:
                print(self.generateStudentSemester(1))  # Output is gonna be 1.
            elif self.getYear() == 2:
                print(self.generateStudentSemester(2))  # Output is gonna be 3.
            elif self.getYear() == 3:
                print(self.generateStudentSemester(3))  # Output is gonna be 5.
            elif self.getYear() == 4:
                print(self.generateStudentSemester(4))  # Output is gonna be 7.
            else:
                print("Invalid Semester")

        except Exception as error:
            print('Error occurred with printLogs : ', str(error))



    def giveTitleToStudent(self, year):
        if year == 1:
            return "Freshman"
        elif year == 2:
            return "Sophomore"
        elif year == 3:
            return "Junior"
        elif year == 4:
            return "Senior"
        else:
            return "error occurred"


    def createStudent(self):
        try :
            # Read a config
            config = ConfigParser()
            config.read("config.ini")
            studentNumber = config["StudentNumber"]
            for year in range(1, 5):
                for i in range(int(studentNumber['studentnumber'])):
                    self.setName(self.generateRandomName())
                    self.setStudentNumber(self.generateStudentNumber(year, i))
                    self.setSemester(self.generateStudentSemester(year))
                    self.setYear(year)
                    self.setTitle(self.giveTitleToStudent(year))
                    self.setDepartment("CSE")
                    self.__addStudentList(self)
                    StudentProcess(self).createStudentJsonFile()
        except Exception as error :
            print('Error occurred with createStudent : ' , str(error))
