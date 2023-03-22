
class Person:

    def __init__(self, name = None, department = None, title = None):
        self.__name = name
        self.__department = department
        self.__title = title

    def getName(self):
        return self.__name

    def setName(self, name):
        self.__name = name

    def getDepartment(self):
        return self.__department

    def setDepartment(self, department):
        self.__department = department

    def getTitle(self):
        return self.__title

    def setTitle(self, title):
        self.__title = title
