# NITC Query System

This “NITC query system” is a web application that is 
designed and built to give the students of NITC a platform 
where they can have discussions about anything related to the campus.

## Tech Stack 
The following Tech Stack is used for the project:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **Front-End**         | HTML,CSS,Bootstrap                                                            |
| **Back-End**                 | Node JS  |
| **Database**                  | MySQL                               |
| **Routing Module**        | Express 
| **Config Module**      | Passport

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 8.0.0


# Getting started
- Clone the repository
```
git clone https://github.com/kartiks-21/question-answer-webapp.git
```
- Install dependencies
```
npm install
```
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:8000`




## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **node_modules**         | Contains all  npm dependencies                                                            |
| **views**                 | Contains all the EJS which display the dynamic content on the front end  |
| **routes**                  | Contains all the express routing of the website.                               |
| **controllers**        | Contains the functionalities of their respective EJS front end. 
| **config**      | Contains Express Middlewares and passport module configuration for Login/Sign-Up. 
| **assets/css**              | Conatians all the CSS files used for the front-end.  
| **assets/images**      | Contains all the images used for the website.
| **assets/js**           | Contains all JS files used for front-end.                       
| package.json             | Contains npm dependencies.                                                |


## User Interface

**Sign Up**

![App Screenshot](https://media.discordapp.net/attachments/914015480040267796/915153426629918720/signup.png?width=975&height=566)

**Login**

![App Screenshot](https://media.discordapp.net/attachments/914015480040267796/915153671032037376/login.png?width=976&height=566)

**Home Screen**

![App Screenshot](https://media.discordapp.net/attachments/914015480040267796/915154095432695808/homescreen_userloggedin-1.png?width=974&height=566)

**Profile Page**

![App Screenshot](https://media.discordapp.net/attachments/914015480040267796/915154471246499900/userprofile-1.png?width=974&height=566)
