This is a full stack application build with JavaScript. 

The API is build in a node.js / express / sequelize and hold two models: Course and User
Beside that authentication is build in middleware that let's makes sure that the right validation errors pop up
when a person doesn't fill in the required fields correctly. 
The api runs on port 5000

The client side is build with React. User information and log-in/log-out functions are shared with Context. 
Also the user inlog data is "saved" in a cookie for 1 day so the user stays logged in.
I might need to look into the safety of this functionality...

Data related to the courses are loaded in the routes itself
The client side runs on port 3000. 

The goal is to refactor this code a lot cleaner and add some professional styling to it. 
Any help or feedback is more than welcome :)