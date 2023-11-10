require("dotenv").config();
const pool = require("./server/config/database");
const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const userRouter = require("./server/api/user.router");
const questionRouter = require("./server/api/questions/question.router");
const answerRouter = require("./server/api/answers/answer.router");
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/users", questionRouter);
app.use("/api/users", answerRouter);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

//connects to database, so it connects to the pool connection

//The line require("dotenv").config(); is typically used to load and configure environment variables from a .env file in your Node.js application. Here's what it does: require("dotenv"):

// This part imports the dotenv library. dotenv is a popular Node.js library that allows you to load environment variables from a .env file into your application.
// .config():

// The config() method is called on the imported dotenv module. This method reads the contents of the .env file, parses it, and assigns the environment variables specified in the file to the process.env object. These environment variables are then accessible throughout your Node.js application.
// The purpose of using dotenv and the .config() method is to keep sensitive information, such as API keys, database connection strings, and other configuration variables, out of your codebase and stored securely in a separate .env file. This practice enhances security and makes it easier to manage configuration settings in different environments (e.g., development, staging, production) without modifying your source code.

//imports express method and assigns it to express const

//imports cors method and assigns it to express const

//Here, you create an instance of the Express application by invoking the express function. The app variable is used to set up and configure your web application.

//This line configures CORS for your Express application. It uses the app.use method to apply the CORS middleware to all routes. This is done to allow cross-origin requests, which can be helpful when your frontend code is hosted on a different domain than your server.

//Here, you configure the Express application to use the urlencoded middleware. This middleware is used to parse incoming HTTP requests with URL-encoded payloads (typically form data). The extended: true option allows for complex objects and arrays to be parsed.

//This line configures the Express application to use the json middleware. It parses incoming HTTP requests with JSON payloads and makes the request data available as JavaScript objects in req.body.

//Finally, you start the Express server and have it listen on the specified port (4000). When the server starts, it will log a message to the console, indicating that it is now listening at http://localhost:4000.

//Connection pools help reduce the time spent connecting to the MySQL server by reusing a previous connection, leaving them open instead of closing when you are done with them.

// This improves the latency of queries as you avoid all of the overhead that comes with establishing a new connection.
