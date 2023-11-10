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
  userById: (user_id, callback) => {
    pool.query(
      `SELECT registration.user_id,user_name,user_email,first_name,last_name FROM registration LEFT JOIN profile ON registration.user_id = profile.user_id WHERE registration.user_id=?`,
      [user_id],
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

// This code is a JavaScript module that appears to be part of a server-side application, specifically dealing with database operations. It's written in Node.js and is using a module called "pool" which is presumably a database connection pool. Let's break down what each function in this module does for a beginner:

// register: This function is used to insert a new user registration into a database. It expects two arguments, data and callback. The data argument is an object containing user information (user_name, user_email, and user_password), and the callback is a function that will be called once the database query is complete. If there's an error during the database operation, it will be passed to the callback. If successful, the result will be passed to the callback as well.

// profile: This function is used to insert user profile information into a database. It also expects data and callback arguments, with data containing user information (user_id, first_name, and last_name). It works similarly to the register function, handling errors and results in the same way.

// userById: This function retrieves user information by their user_id from the database. It takes an id argument and a callback. It performs a SQL query to join the "registration" and "profile" tables based on the user_id and returns the user's details if found. If there's an error or no user is found, the callback is used to handle that.

// getUserByEmail: This function is used to retrieve a user by their email address. It takes an email argument and a callback. It performs a SQL query to select user information based on the provided email address. If a user with that email is found, it is returned. If there's an error or no user is found, the callback is used to handle the situation.

// getAllUsers: This function retrieves all users from the "registration" table. It takes a callback argument and performs a SQL query to select user_id, user_name, and user_email for all users. The results are passed to the callback function.

// In all these functions, they use the pool.query method to execute SQL queries, and the callback function is used to handle errors and results. The pool appears to be an external database connection pool used to connect to a database, but its implementation is not shown in this code.

// These functions can be used in a Node.js application to perform common operations like user registration, user profile management, and user retrieval by email or user_id from a database.
