const pool = require("../config/database");
module.exports = {
  register: (data, callback) => {
    pool.query(
      `INSERT INTO registration(user_name,user_email,user_password)VALUES(?,?,?)`,

      [data.userName, data.email, data.password],

      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

  profile: (data, callback) => {
    pool.query(
      `INSERT INTO profile(user_id,first_name,last_name)VALUES(?,?,?)`,
      [data.userId, data.firstName, data.lastName],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  userById: (id, callback) => {
    pool.query(
      `SELECT registration.user_id,user_name,user_email,first_name,last_name FROM registration LEFT JOIN profile ON registration.user_id = profile.user_id WHERE registration.user_id=?`,
      [id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result[0]);
      }
    );
  },
  getUserByEmail: (email, callback) => {
    pool.query(
      `SELECT * FROM registration WHERE user_email=?`,
      [email],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result[0]);
      }
    );
  },
  getAllUsers: (callback) => {
    pool.query(
      `SELECT user_id,user_name,user_email FROM registration`,
      [],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
};

//In summary, this module exports a set of functions that interact with a database. When these functions are called, they execute SQL queries using the provided database connection pool and pass the results or errors to a callback function that you provide when calling these functions. These functions are typically used for user registration, profile creation, and user data retrieval in a web application.

//This line imports a database connection pool from a separate file named database.js located in the config directory. The pool variable is an instance of a database connection pool that will be used to execute SQL queries.

//This line starts the definition of a JavaScript module that will export various functions to interact with the database.

//This is the start of a function definition called register. It takes two parameters: data and callback. data likely contains information about a user registration, and callback is a function to handle the result or an error.

//This line calls the query method on the database connection pool (pool) to execute a SQL query. This method is used to interact with the database.
// The SQL query is a string enclosed in backticks (``) and is written in a template literal format. It inserts data into a table named registration.

//This is an array of values that correspond to placeholders (?) in the SQL query. These values come from the data parameter, and they will be inserted into the query in the same order as the placeholders.

//This line defines a callback function that will be executed after the SQL query is completed. The function takes two parameters: err for an error object and result for the query result.

//This line defines a callback function that will be executed after the SQL query is completed. The function takes two parameters: err for an error object and result for the query result.
