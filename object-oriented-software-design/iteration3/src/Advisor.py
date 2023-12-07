
import json
import random

from Person import Person

class Advisor(Person):

    def __init__(self):
        self.__advisorList = []

    def __addAdvisorList(self, advisor):
        self.getAdvisorList().append(advisor)

    def getAdvisorList(self):
        return self.__advisorList

    def setAdvisorList(self, advisorList):
        self.__advisorList = advisorList

    def takeAdvisorFromInputFile(self):
            with open("C:\\Users\\DELL\\Desktop\\input.json") as file:
                data = json.load(file)
                advisorArray = data["advisors"]
                for advisor in advisorArray:
                    advisorName = advisor["advisorName"]
                    department = advisor["department"]
                    title = advisor["rank"]
                    self.setName(advisorName)
                    self.setDepartment(department)
                    self.setTitle(title)
                    self.__addAdvisorList(self)

    def randomAdvisorAssignment(self):
            advisorNo = random.randint(0, 7)
            self.setName(self.getAdvisorList()[0].getName())
            self.setTitle(self.getAdvisorList()[0].getTitle())
            self.setDepartment(self.getAdvisorList()[0].getDepartment())
            advisorInfo = self.getTitle() + " " + self.getName() + " " + self.getDepartment()
            return advisorInfo
