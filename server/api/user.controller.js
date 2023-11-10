const {
  register,
  getAllUsers,
  userById,
  getUserByEmail,
  profile,
} = require("./user.service");
const pool = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  createUser: (req, res) => {
    const { userName, firstName, lastName, email, password } = req.body;
    console.log(req.body);

    if (!userName || !firstName || !lastName || !email || !password)
      return res
        .status(400)
        .json({ msg: "Not all fields have been provided!" });

    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: "Password must be at least 8 characters!" });

    pool.query(
      "SELECT * FROM registration WHERE user_email = ?",
      [email],
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(err).json({ msg: "email database connection err" });
        }

        if (results.length > 0) {
          return res
            .status(400)
            .json({ msg: "An account with this email already exists!" });
        } else {
          const salt = bcrypt.genSaltSync();
          req.body.password = bcrypt.hashSync(password, salt);

          register(req.body, (err, results) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .json({ msg: "email 2 database connection err" });
            }
            pool.query(
              "SELECT * FROM registration WHERE user_email = ?",
              [email],
              (err, results) => {
                if (err) {
                  return res
                    .status(err)
                    .json({ msg: "registeration database connection err" });
                }
                req.body.userId = results[0].user_id;
                console.log(req.body);
                profile(req.body, (err, results) => {
                  if (err) {
                    console.log(err);
                    return res
                      .status(500)
                      .json({ msg: "registeration2 database connection err" });
                  }
                  return res.status(200).json({
                    msg: "New user added successfully",
                    data: results,
                  });
                });
              }
            );
          });
        }
      }
    );
  },
  getUsers: (req, res) => {
    getAllUsers((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      return res.status(200).json({ data: results });
    });
  },
  getUserById: (req, res) => {
    userById(req.id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      if (!results) {
        return res.status(404).json({ msg: "Record not found" });
      }
      return res.status(200).json({ data: results });
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;
    //validation
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been provided" });
    getUserByEmail(email, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: "database connection err" });
      }
      if (!results) {
        return res
          .status(404)
          .json({ msg: "No account with this email has been registered" });
      }
      const isMatch = bcrypt.compareSync(password, results.user_password);
      if (!isMatch) return res.status(404).json({ msg: "Invalid Credentials" });
      const token = jwt.sign({ id: results.user_id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({
        token,
        user: {
          id: results.user_id,
          display_name: results.user_name,
        },
      });
    });
  },
};

// This line imports functions and objects from a file called user.service. These functions likely contain database-related operations and user services.

// const pool = require("../config/database");:

// This line imports a database connection pool from a database.js file in the config directory. The pool variable is used to manage database connections.
// const bcrypt = require("bcryptjs");:

// This line imports the bcryptjs library, which is used for hashing passwords securely.
// const jwt = require("jsonwebtoken");:

// This line imports the jsonwebtoken library, which is used for generating JSON Web Tokens (JWT) for authentication.
// require("dotenv").config();:

// This line configures environment variables by loading them from a .env file using the dotenv library. It's common practice to store sensitive data, such as secret keys or database credentials, in a separate .env file.
// module.exports = {:

// This starts the definition of a JavaScript module that will export several functions to handle user-related operations.
// createUser: (req, res) => {:

// This defines a function called createUser that takes two parameters: req (request) and res (response), typically used in HTTP request handling.
// const {...} = req.body;:

// This line extracts specific properties (userName, firstName, lastName, email, password) from the req.body object. These values are expected to be sent as part of an HTTP request body.
// Input Validation:

// The code checks if any of the required properties are missing. If any are missing, it returns a 400 (Bad Request) response with an error message.
// Password Length Validation:

// It checks if the password is at least 8 characters long. If not, it returns a 400 response with an error message.
// Database Query to Check for Existing Email:

// It queries the database to check if an account with the provided email already exists.
// If the email already exists:

// It returns a 400 response with an error message indicating that an account with that email already exists.
// If the email does not exist:

// It uses bcrypt to hash the provided password and then calls the register function to create a new user account in the database. It also creates a user profile.
// Nested Database Queries:

// The code includes nested database queries to first insert user data, then retrieve the newly inserted user's ID, and finally create a user profile linked to the user's ID.
// Response:

// After successful registration, it returns a 200 (OK) response with a success message and the user data.
// getUsers: (req, res) => {:

// This function is defined to retrieve a list of all users from the database.
// getAllUsers:

// It calls the getAllUsers function to retrieve the list of users from the database.
// Response:

// It returns a 200 (OK) response with the list of users in the response body.
// Similar patterns are followed for other functions like getUserById and login:

// They handle user data retrieval and login functionality, respectively, with error handling and response generation based on the results of the database queries.
// In summary, this code exports a set of functions that handle user-related operations. These functions interact with the database, perform validation checks, and return appropriate HTTP responses based on the results of these operations. The code uses libraries like bcrypt for password hashing and jsonwebtoken for token generation, and it follows common best practices for user registration and authentication.
