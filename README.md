
Project keywords: Axios, React-Frontend, Node.js-Backend, MySQL, CSS, HTML, Bootstrap

A React application with a Node.js backend and a MySQL database. The main purpose of this app is to emulate message board and discussion forums. This is the first version, so the features are limited for now.

Features at this moment:

PROTECTED ROUTES

The routes are secured with the React router V6. On the login page, the authentication token is stored in LocalStorage if the username and password are correct.then the private routes component uses the localstorage get item method to get a "true" value that authenticates access to other pages.

The default value of the private route component is "False", which prevents access to routes without a successful login.

SWEARWORD FILTER

when you write messages, the program checks your sentences for swear words. if yes, the program will tell you about the use of prohibited words and you must remove them if you want to save your message in the database. This feature is made with a JavaScript list. the user's input is compared to a list of common English swear words.

SQL SEARCHES

you can search the database using the html interface. for now, the search works with the ID number and the date the message was sent. You can choose which option you want to use by clicking on the html checkbox.
more search options are under development. The search component is a so-called unmanaged component, so I use the useRef method to get the user input.
The search result view is editable, you can hide unnecessary information using check boxes. By clicking on them, the state variable changes the hidden value of the html elements between true/false

LIKE / UNLIKE THE POST

Each saved post has likes and dislikes columns in the database, which can be added by clicking the thumbs up or thumbs down button. (SQL query: UPDATE messages SET `likes`= likes +1 WHERE id= ? )
the program searches for the id value of the corresponding post with the function parameter and updates the correct post based on it.

Login & CRUD features

Before you can use crud functions, you need to login. Username and password are stored in the sql database used by the program. If the login is successful, the program uses the react-router-navigate method to move the user to the home page.

LOG OUT

the logout feature uses the localstorage.clear() method to remove the token from local storage and navigates the user back to the login pages using the React useNavigation hook.

CREATE ACCOUNT

If you don't have a username and password, you can create them. On the account creation page, the password is asked twice as in the real-life examples and stored in state variables. then the useEffect Hook checks if the passwords match. if the passwords are the same, the user will see a notification and the values ​​will be saved in the database. The Register button is disabled by default, but will be enabled if the password matches and The input fields are filled. The program also displays a green success icon if the requirements are met. The icon is stored in a state variable and displayed in the img element

CSS

With the help of the CSS-flex feature, 3 messages are always displayed in one line. After three messages, a new line starts for other messages. The CSS hover selector is used with paragraph tags to change the background color. If the user does not like the hover effect, it can be turned off by clicking the checkbox. Then the state variable changes to a different div class that doesn't have a hover selector.

The login page has CSS animations. When the login pages load, the background of the login button changes from blue to yellow and back to blue. This is done with CSS animation and keyframe properties
