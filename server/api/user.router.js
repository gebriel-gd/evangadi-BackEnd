const router = require("express").Router();
const auth = require("./middleware/auth");
const {
  createUser,
  getUsers,
  getUserById,
  login,
} = require("./user.controller");

router.post("/", createUser);
router.get("/all", getUsers);
router.get("/", auth, getUserById);
router.post("/login", login);

module.exports = router;

// require Statements:

// The code starts by importing necessary modules using require. It imports the following modules:
// express: This is the core Express.js module used for creating the router.
// auth: This is a custom middleware module, presumably used for authentication.
// user.controller: This module likely contains various controller functions related to user management, such as creating users, getting user data, and user login.
// Router Creation:

// A new router is created using express.Router(). This router is an instance of an Express router, which allows you to define routes and associated logic.
// Route Definitions:

// The router defines several routes and associates them with specific controller functions:
// router.post("/"): This route handles HTTP POST requests to the root path ("/"). It is associated with the createUser function, which is likely responsible for creating a new user.
// router.get("/all"): This route handles HTTP GET requests to the "/all" path. It is associated with the getUsers function, which is likely responsible for fetching a list of all users.
// router.get("/"): This route handles HTTP GET requests to the root path ("/"). It includes the auth middleware, meaning it is protected by authentication. It is associated with the getUserById function, which is likely responsible for fetching user data by their ID.
// router.post("/login"): This route handles HTTP POST requests to the "/login" path. It is associated with the login function, which is likely responsible for handling user login.
// Export:

// The router is exported using module.exports. This makes the defined routes and their associated logic available to other parts of the application. It can be used by the main application to mount these routes.
// In summary, this code sets up an Express router with routes for user-related actions like creating a user, getting a list of users, fetching user data by ID, and user login. These routes are designed to work with controller functions defined elsewhere in the application. The auth middleware is used to secure the route that gets user data by ID, ensuring that only authenticated users can access it.
