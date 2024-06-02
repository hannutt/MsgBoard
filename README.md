A React application with a Node.js backend and a MySQL database. The main purpose of this app is to emulate message board and discussion forums.
This is the first version, so the features are limited for now.

Features at this moment:

SWEARWORD FILTER

when you write messages, the program checks your sentences for swear words. if yes, the program will tell you about the use of 
prohibited words and you must remove them if you want to save your message in the database. This feature is made with a JavaScript list. 
the user's input is compared to a list of common English swear words.

LIKE THE POST

Every saved post has a likes column in the database that can be added by clicking the thumbs up button. (SQL query: UPDATE messages SET `likes`= likes +1 WHERE id= ? )
the program searches for the id value of the corresponding post with the function parameter and updates the correct post based on it.

CRUD features
Login-only access to update and delete features is now under development. Create and read features can be used without logging in.
