from string import whitespace
from tempfile import TemporaryDirectory
# import pandas as pd
import requests
from bs4 import BeautifulSoup
from tabulate import tabulate
import json
import re
myRequest = requests.get('https://catalog.ucsc.edu/en/Current/General-Catalog/Courses')
soup = BeautifulSoup(myRequest.content,'html.parser')
allCoursesHref = soup.find_all('a', href = True)
arrayOfCourses = []
for course in allCoursesHref:
    # use a temporary string to split the course names
    # if it's a valid course the substring Courses/Name-of-Course"/
    # will be present
    # For Example:
    # <a href="/Current/General-Catalog/Courses/AM-Applied-Mathematics">AM - Applied Mathematics</a>
    # thus the string becomes an array of lenght greater than 1, with the name of the course present on index 1
    # ['<a href="/Current/General-Catalog/', 'AM-Applied-Mathematics', '>AM - Applied Mathematics</a>']
    # String that doest contain the substring Courses/Name-of-Course"
    # ['<a href="/Current/General-Catalog/Courses">Courses</a>']
    tempStr = re.split('Courses\/(.*?)"', str(course))
    if len(tempStr) > 1:
        arrayOfCourses.append(tempStr[1])
#for i in arrayOfCourses:
#    print("Course: ", i)

### Get the individual courses for each department
    ### Firebase object should be:
    ### nameOfDepartment.json: This is a collection
    ### inside nameOfcourse:
    ###     'cse12': {
    ###         course: ...,
    ###         units: ....,
    ###         description: ...
    ###     },
    ###     'cse13': {
    ###         course: ...,
    ###         units: ....,
    ###         description: ...
    ###     }
mainObj = {}
for course in arrayOfCourses:
    facultyRequest = requests.get('https://catalog.ucsc.edu/en/Current/General-Catalog/Courses/'+course)
    facultySoup = BeautifulSoup(facultyRequest.content,'html.parser')
    allHref = facultySoup.find_all('h2', class_='course-name')
    currentHref = []
    for fullLink in allHref:
        tempStr = re.split('href="(.*?)"', str(fullLink))
        currentHref.append(tempStr[1])
    courseObj = {}
    ### *Sanitized as in no white space, tabs, or carriage returns
    ### String containing the sanitized name of a class
    cleanClassName = ''
    ### String containing the sanitized description of a class.
    cleanDesc = ''
    ### String containing the sanitized credits of a class.
    cleanCredits = ''
    ### String containing the sanitized professors of a class.
    cleanProf = ''
    ### Arrays containing the name and descriptions of the extra fields
    ### extraName can be 'Requirements', 'Repetable for Credit'
    ### and extraText can be a description containing a link or a 'Yes' or 'No'
    extraName = []
    extraText = []
    ### String for the quarters a course is offered
    quarterStr = ''
    for currentCourse in currentHref:
        courseRequest = requests.get('https://catalog.ucsc.edu/'+str(currentCourse))
        classSoup = BeautifulSoup(courseRequest.content,'html.parser')
        className = classSoup.find_all('h1')
        keyClassName = ''
        for currentClass in className:
            classStr = re.split('<span>(.*)', str(currentClass))
            if len(classStr) > 1:
                keyClassName = re.split('<span>(.*?)<\/span>', str(currentClass))
                keyClassName = keyClassName[1]
                classStr = classStr[1].replace('</span>','')
                cleanClassName = classStr.replace('\r','')
        ### Get course description
        courseDesc = classSoup.find_all('div', class_='desc')
        for desc in courseDesc:
        # print('Description before white space: ', desc)
            whiteSpace = re.split('\r\n\t(.*)\r\n', str(desc))
            if len(whiteSpace) == 1:
                ### Get rid of empty div elements with class 'desc'
                whiteSpace = re.split('\n(.*)\n', str(desc))
            # print('Lenght of whiteSpace: ', len(whiteSpace))
            if (len(whiteSpace)  > 1):
                # print('Appending: ', whiteSpace[1])
                cleanDesc = whiteSpace[1]
        courseRef = desc.find_all('a', class_='sc-courselink')
        for link in courseRef:
            # print('Original Description', desc)
            # print('link: ', link)
            tempStr = re.split('>(.*?)<', str(link))
            # print('str: ', tempStr)
            # print('Clean desc: ', cleanDesc[-1])
            cleanDesc = cleanDesc.replace(str(link), tempStr[1])
            # print('clean Desc: ',cleanDesc[-1])
        cleanDesc = cleanDesc.replace('<i>','')
        cleanDesc = cleanDesc.replace('</i>','')
        cleanDesc = cleanDesc.replace('<p>','')
        cleanDesc = cleanDesc.replace('</p>','')
        cleanDesc = cleanDesc.replace('\t','')
        cleanDesc = cleanDesc.replace('\xa0',' ')
        ### Get course Credit (Not needed when going page by page)
        '''courseCredit = classSoup.find('div', class_='credits')
        creditWhiteSpace = re.split('\r\n\t\t\t(.*)\r', str(courseCredit))
        if (len(creditWhiteSpace)  > 1):
            cleanCredits = creditWhiteSpace[1]
        else:
            cleanCredits = 'No information'
        '''
        ### Get course professors
        courseProf = classSoup.find('div', class_='instructor')
        entireProfName = re.split('<p>(.*)<\/p>', str(courseProf))
        # print(currentCourse)
        # print(profWhiteSpace)
        if (len(entireProfName)  > 1):
            firstNameProf = re.split('">(.*?)<', entireProfName[1])
            lastNameProf = re.split('<\/span>(.*)', entireProfName[1])
            cleanProf = firstNameProf[1] + lastNameProf[1]
        else:
            cleanProf = 'No information'
        ### Get General Education code if necessary
        genEdCode = classSoup.find('div', class_='genEd')
        ### Get ExtraFields (Requirements, Repeatable for credits)
        extraField = classSoup.find_all('div', {'class':'extraFields'})
        ### Get quater offered if given
        quaterOffered = classSoup.find('div', class_='quarter')
        quarterStr = re.split('<p>(.*)<\/p>', str(quaterOffered))
        if len(quarterStr) > 1:
            quarterStr = quarterStr[1]
        else: quarterStr = 'No information'
        for field in extraField:
            extraTags = field.find_all('h4')
            requirementTags =field.find_all('p')
            # print('COURSE: ',currentCourse)
            # print(field)
            ### Some requirements have links inside them
            requirementLink = field.find_all('a')
            for extra, requirementTags in zip(extraTags, requirementTags):
                # print(extra)
                nameOfField = re.split('\r\n\t\t(.*)\r', str(extra))
                requirementsDesc = re.split('<p>(.*)<\/p>', str(requirementTags))
                extraName.append(nameOfField[1])
                extraText.append(requirementsDesc[1])
            for link in requirementLink:
                tempStr = re.split('>(.*?)<', str(link))
                extraText[-1] = extraText[-1].replace(str(link), tempStr[1])
        courseObj[keyClassName] = {}
        courseObj[keyClassName]['Class Name'] = cleanClassName
        courseObj[keyClassName]['Class Description'] = cleanDesc
        courseObj[keyClassName]['Professor(s)'] = cleanProf
        courseObj[keyClassName]['Quarter Offered'] = quarterStr
        if (genEdCode is None):
            courseObj[keyClassName]['General Education Code'] = 'None'
        else:
            whiteSpace = re.split('<p>(.*?)<\/p>',str(genEdCode))
            courseObj[keyClassName]['General Education Code'] = whiteSpace[1]
        if (not extraName or not extraText):
            courseObj[keyClassName]['Requirements'] = 'None'
            courseObj[keyClassName]['Repeteable for Credit'] = 'No'
        else:
            # in case that a course is repeteable for credit and has a requirement
            for name, text in zip(extraName, extraText):
                courseObj[keyClassName][name] = text
        # print(courseObj[keyClassName])
    # print('course:', course ,' || ' ,'desc: ', len(cleanDesc),' || ', 'credits: ', len(cleanCredits),' || ','href: ', len(cleanClassName),' || ', 'prof: ', len(cleanProf))
    
    mainObj[course] = courseObj
    print('Done with: ', course)
    if course == 'YIDD-Yiddish':
        break
f = open('combinedFiles.json', 'w+')
json.dump(mainObj, f)
# f.write(str(courseObj))
f.close()
