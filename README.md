# aplikacja_biurowa_web H1

## Introduction
The aim of my project was to design a web application that supported the work of a receptionist. 
The main assumption of the application is to streamline the guest registration process, additionally the application has a task list function.

## Technologies
Project is created with:
* nodeJS v14.15.0
* expressJS v4.16.1
* mongoDB
* javaScript
* pug v.2.0.0-beta11
* Heroku

## Activation

http://recepcja.herokuapp.com

Login data:
login: test@test.pl
password: qwerty

## User manual

In order to run a web application, you must first of all have access to the Internet. 
Due to the fact that the system is in the cloud of the Heroku platform,
it is possible to connect to the application website by entering the appropriate URL on the installed browser.
After launching the application page, the main page will be displayed in the browser window with buttons navigating between the application sections 
to log in to the system, select the Login option, after which the login form will be displayed on the page. 
After successfully completing the login process, the user is redirected to the user panel, which is a view that allows registration, 
removing a guest and viewing all added guests. 
In order to add a new guest, the user should press the blue Add Guest button, which brings up the guest registration form. 
As part of the screen presenting the above-mentioned registration functions, the user has to fill in the following fields:
First name, Last name, Company name, Time of entry, Time of departure, Date of visit, Room number and the optional field Purpose of visit. 
After correct completion of all the above-mentioned windows, the data is saved and presented in the form of a table on the list of visitors. 
If one of the windows is omitted, the user is also informed about the completion of the missing field with an appropriate message. 
In the user section view, it is possible to delete an added guest using the Delete button. 
After clicking on the Search section on the main navigation panel, 
the user is able to filter and search for results using the search tool located at the top of the page. 
You can search and filter data about guests using such filters as: name, surname, company name. 
The Reminders section view allows you to add and save to-do items for the future. 
For this purpose, the user enters appropriate information in the Enter reminder field and then clicks the Save button. 
When the user performs the saved activity, he can delete the saved record at any time using the red Delete button.
The user fills in the Login and Password fields to be able to fully use all the options of the website.


