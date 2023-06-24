# book-movie-ticket is a nodeJs application. The frontend is created using ReactJs while in backend ExpressJs is used.The data is stored Mongodb cloud database according to schema designed using Mongoose library.This application provides an interface to the user to book movie tickets and also show the last booking details.
The Showbuzz website is a NodeJs web application designed to make it easy for users to book movie tickets online. The website is built using Node.js and Express, and provides a simple, intuitive user interface for booking movie tickets.
It consists of three foundational pillars-

Database:-                                                                                                                                      In this, the data is stored in MongoDb cloud database and the code to create connection with the Mongodb server is given in connection.js. And the data is stored according to schema , designed using the Mongoose library, given in Schema.js.

Backend:-                                                                                                                                         It is created using Nodejs and ExpressJs. The Express server listens on port 8080. When the server starts, it sends the get request to the server and brings the build directory ,containing frontend code, for displaying to the user.
And when the frontend components mount , it sends the get request on ‘.../showbuzz/’ and finds the latest created document in the ‘bookMovie’ collection of Mongodb then sends it to frontend to display on the ‘lastBookingDetails’component. If no last-booking is found, then it returns the message ‘no previous booking found.’
And when the user clicks on the ‘Book-now’ button , it sends the post request and creates the document in the collection based on information send by the user and simultaneously the response is send to ‘lastBookinDetails’ component which displays the latest selected details as the ‘last-booking-details’.If its the first booking then initially it display ‘no previous booking found’

Frontend:-                                                                                                                                        It is created using ReactJs. The React server listens on port 3000.
It is a single page application, where two components are rendered on the main page. ‘BookShow’ is rendered on the left side which displays all the movies name, slots and different seat types.The user can select movie, slots and seat by clicking over it and in the bottom there is a ‘Book-now’ button , which sends user selected data to backend to store in database as well as pass again to frontend. Where it is shown on the right side component displayed as ‘last booking details’.
Features
The BookMyShow website offers the following features:
User-friendly interface: The website has an intuitive and easy-to-use interface, making it accessible to users of all skill levels.
Movie selection: Users can select from a variety of movies.
Seat selection: Users can select the specific seats they want for the movie they have chosen.
Slot selection: Users can select the time slot of their choice.                                                                            
                                                                                                                                                                                                                                                                                                                                                                                          
Technologies Used
The BookMyShow website was built using the following technologies:
Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
Express: A popular web framework for Node.js.
MongoDB: A document-based database that stores data in JSON-like documents.
HTML/CSS: The standard markup language and styling language for creating web pages.
