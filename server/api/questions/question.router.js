const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  postQuestion,
  getAllQuestions,
  singleQuestion,
} = require("./question.controller");

router.post("/questions", auth, postQuestion);
router.get("/questions", auth, getAllQuestions);
router.get("/questions/:questionId", auth, singleQuestion);

module.exports = router;
