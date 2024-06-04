
Project keywords: Axios, React-Frontend, Node.js-Backend, MySQL, CSS, HTML

A React application with a Node.js backend and a MySQL database. The main purpose of this app is to emulate message board and discussion forums. This is the first version, so the features are limited for now.

Features at this moment:

SWEARWORD FILTER

when you write messages, the program checks your sentences for swear words. if yes, the program will tell you about the use of prohibited words and you must remove them if you want to save your message in the database. This feature is made with a JavaScript list. the user's input is compared to a list of common English swear words.

SQL SEARCHES
you can search the database using the html interface. for now, the search works with the ID number and the date the message was sent. You can choose which option you want to use by clicking on the html checkbox.
more search options are under development. The search component is a so-called unmanaged component, so I use the useRef method to get the user input

LIKE / UNLIKE THE POST
Each saved post has likes and dislikes columns in the database, which can be added by clicking the thumbs up or thumbs down button. (SQL query: UPDATE messages SET `likes`= likes +1 WHERE id= ? )
the program searches for the id value of the corresponding post with the function parameter and updates the correct post based on it.

Login & CRUD features
Before you can use crud functions, you need to login. Username and password are stored in the sql database used by the program. If the login is successful, the program uses the react-router-navigate method to move the user to the home page

CSS
With the help of the CSS-flex feature, 3 messages are always displayed in one line. After three messages, a new line starts for other messages.
