username = input("Enter your username : ")
password = input("Enter your password : ")

totalLength = len(username) + len(password)

print("Your username and password length is {}.".format(totalLength))

if(totalLength > 15) : 
    print("Your length is too much!")