const mysql = require("mysql2");
require("dotenv").config();
const pool = mysql.createPool({
  // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  host: "85.10.205.173",
  user: "gebriel",
  password: "ShibereM1",
  database: "evangadiforum_db",
  port: 3306,
  connectionLimit: 10,
});

pool.getConnection(function (err, connection) {
  console.log("Database connected!");
});

let registration = `CREATE TABLE if not exists registration(
    user_id int auto_increment,
    user_name varchar (255) not null,
    user_email varchar (255) not null,
    user_password varchar (255) not null,
    PRIMARY KEY (user_id)
)`;

let profile = `CREATE TABLE if not exists profile(
    user_profile_id int auto_increment,
    user_id int not null,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    PRIMARY KEY (user_profile_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id)
)`;

let question = `CREATE TABLE if not exists question(
    question_id int auto_increment,
    question varchar(255) not null,
    question_description varchar(255),
    question_code_block varchar(255),
    tags varchar(255),
    user_id int not null,
    PRIMARY KEY (question_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id)
)`;

let answer = `CREATE TABLE if not exists answer(
    answer_id int auto_increment,
    answer varchar(255) not null,
    answer_code_block varchar(255),
    user_id int not null,
    question_id int not null,
    PRIMARY KEY (answer_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id),
    FOREIGN KEY (question_id) REFERENCES question(question_id)
)`;

pool.query(registration, (err, results) => {
  if (err) throw err;
  console.log("registration table created");
});
pool.query(profile, (err, results) => {
  if (err) throw err;
  console.log("profile table created");
});
pool.query(question, (err, results2) => {
  if (err) throw err;
  console.log("question table created");
});
pool.query(answer, (err, results2) => {
  if (err) throw err;
  console.log("answer table created");
});

module.exports = pool;

// In summary, this code sets up a connection to a MySQL database, creates tables for user registration, profiles, questions, and answers, and exports the connection pool for use in a Node.js application. It demonstrates how to establish a database connection, define table structures, and execute queries to create tables in the database.

// require Statements:

// The code starts by importing necessary modules using require:
// mysql2: This is a Node.js library used to interact with MySQL databases.
// dotenv: This library is used for loading environment variables from a .env file.
// Database Connection Pool:

// A connection pool is created using mysql.createPool. A connection pool is a collection of database connections maintained by the application. It includes the following configuration options:

// socketPath: The path to the MySQL socket file. In this case, it points to a local MySQL server using MAMP.
// host, user, password, and database: These options are set using environment variables (loaded from the .env file) to connect to the MySQL database.
// connectionLimit: This option sets the maximum number of connections that can be open at once.
// The pool.getConnection function is used to obtain a database connection from the connection pool and logs "Database connected!" when a connection is successfully obtained.

// Table Creation Queries:

// Several SQL queries are defined to create tables in the database. Each query defines the table structure, including columns, data types, and foreign key relationships. The tables being created are:

// registration: Likely for user registration data.
// profile: Likely for user profile information.
// question: Likely for storing questions, possibly in a Q&A application.
// answer: Likely for storing answers to questions.
// Each query includes SQL CREATE TABLE statements with the respective table structures.

// Executing Table Creation Queries:

// The pool.query function is used to execute each of the table creation queries. These queries are asynchronous, and the callback functions handle errors (if any) and log a message to indicate that the table was created successfully.
// Exporting the Connection Pool:

// The module.exports = pool; statement exports the database connection pool, making it available for use in other parts of the Node.js application. This allows other parts of the application to interact with the database using the connection pool.
