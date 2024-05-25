import math, re, sys
from numpy import *

# usage: python 2-tsp-verifier.py inputfilename solutionfilename

def main(instancefile, solutionfile):
    cities = readinstance(instancefile)
    solution = readsolution(solutionfile)
    checksolution(cities, solution[0],solution[1],solution[2],solution[3],solution[4])


def distance(a, b):
    # a and b are integer pairs (each representing a point in a 2D, integer grid)
    # Euclidean distance rounded to the nearest integer:
    dx = a[0] - b[0]
    dy = a[1] - b[1]
    return (round(math.sqrt(dx * dx + dy * dy)))


def readinstance(filename):
    # each line of input file represents a city given by three integers:
    # identifier x-coordinate y-coordinate (space separated)
    # city identifiers are always consecutive integers starting with 0
    # (although this is not assumed here explicitly,
    #    it will be a requirement to match up with the solution file)
    f = open(filename, 'r')
    line = f.readline()
    cities = []
    while len(line) > 1:
        lineparse = re.findall(r'[^,;\s]+', line)
        cities.append([int(lineparse[1]), int(lineparse[2])])
        line = f.readline()
    f.close()
    return cities


def readsolution(filename):
    # first line is the sum of the tour lengths of the first and the second traveling salesmen
    # second line is the length of the tour of the first salesman and the number of cities visited in this tour
    # the next lines are the cities in the order they are visited by the tour of the first salesman
    # there is a blank line
    # the next line is the length of the tour of the second salesman and the number of cities visited in this tour
    # remaining lines are the cities in the order they are visited by the tour of the second salesman
    # each city is listed once
    # cities are identified by integers from 0 to n-1

    # city lists
    salesman1_cities = []
    salesman2_cities = []

    #read file
    with open(filename,"r") as file:
        total_tour_length = int(file.readline().strip())
        salesman1_info = file.readline().split()
        file_content = file.read()
        lines = file_content.splitlines()

    flag = False
    for line in lines:
        if line == '':
            flag = True
        else:
             if(line != '') and flag != True:
                  salesman1_cities.append(int(line))
             else:
                 line_split = line.split()
                 if len(line_split)>1:
                     salesman2_info = line_split
                 else:
                     salesman2_cities.append(int(line_split[0]))

    return [total_tour_length, salesman1_info,salesman1_cities,salesman2_info,salesman2_cities]

def checkduplicate(cityorder):
    cityorder_sorted = list(cityorder)
    cityorder_sorted.sort()
    for i in range(len(cityorder) - 1):
        # check duplicate citites
        if (cityorder_sorted[i] == cityorder_sorted[i + 1]):
            print('ERROR: There is a city visited multiple times by the same salesman.')
            exit();
def checkinvalid(n,cityorder):
    for i in range(len(cityorder)):
        # check invalid city id
        if ((cityorder[i] < 0) | (cityorder[i] >= n)):
            print('ERROR: Invalid city id: ', cityorder[i])
            exit();
def checkcommoncity(cityorder1,cityorder2):
    set1 = set(cityorder1)
    set2 = set(cityorder2)
    common_cities = set1.intersection(set2)
    if(len(common_cities) != 0):
        print('ERROR: There is a city visited by both salesmen.')
        exit();
def checktour(cities,cityorder1,cityorder2):
    cityorder = cityorder1+ cityorder2 #combine two lists
    cityorder_sorter = list(cityorder)
    cityorder_sorter.sort()
    city_indices = list(range(len(cities)))
    if(cityorder_sorter != city_indices):
        print('ERROR: Invalid tour')
        exit();

def checksolution(cities,total_tour_length,salesman1_info,salesman1_cityorder,salesman2_info,salesman2_cityorder):
    #total city num
    n = len(cities)
    #salesman1
    salesman1_tour_length = int(salesman1_info[0])
    salesman1_city_num = int(salesman1_info[1])

    # salesman2
    salesman2_tour_length = int(salesman2_info[0])
    salesman2_city_num = int(salesman2_info[1])

    # check total city num
    if ((n != (salesman1_city_num+salesman2_city_num))):
        print('ERROR: Total city num does not match')
        exit();
    else:
        checkduplicate(salesman1_cityorder)
        checkduplicate(salesman2_cityorder)
        checkinvalid(n, salesman1_cityorder)
        checkinvalid(n, salesman2_cityorder)
        checkcommoncity(salesman1_cityorder,salesman2_cityorder)
        checktour(cities, salesman1_cityorder, salesman2_cityorder)

    # calculate the length of the tour given by salesman1_cityorder:
    tour_length1 = 0
    for i in range(len(salesman1_cityorder)):
        tour_length1 = tour_length1 + distance(cities[salesman1_cityorder[i]], cities[salesman1_cityorder[i - 1]])

    # calculate the length of the tour given by salesman1_cityorder:
    tour_length2 = 0
    for i in range(len(salesman2_cityorder)):
        tour_length2 = tour_length2 + distance(cities[salesman2_cityorder[i]], cities[salesman2_cityorder[i - 1]])

    #total tour length
    tot_tour = tour_length1 + tour_length2

    #check tour lengths
    if(tour_length1 == salesman1_tour_length and tour_length2 == salesman2_tour_length and tot_tour == total_tour_length ):
        print('Your solution is VERIFIED. ')
    else:
        # check tour length for salesman1
        if(tour_length1 != salesman1_tour_length):
            print('Your solution is NOT VERIFIED.')
            print('The tour length of salesman 1 is given as ', salesman1_tour_length)
            print('but computed as ', tour_length1)

        # check tour length for salesman2
        if (tour_length2 != salesman2_tour_length):
            print('Your solution is NOT VERIFIED.')
            print('The tour length of salesman 2 is given as ', salesman2_tour_length)
            print('but computed as ', tour_length2)

        #check total tour length
        if(tot_tour != total_tour_length):
            print('Your solution is NOT VERIFIED.')
            print('The total tour length  is given as ', total_tour_length)
            print('but computed as ', tot_tour)

#main(sys.argv[1], sys.argv[2])
main('test-input-4.txt', 'test-output-4.txt')