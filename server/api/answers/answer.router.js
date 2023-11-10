const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  postAnswer,
  getAllAnswersAlongWithTheirQuestions,
} = require("./answer.controller");

router.post("/questions/:questionId/answers", auth, postAnswer);
router.get(
  "/questions/:questionId/answers",
  auth,
  getAllAnswersAlongWithTheirQuestions
);

module.exports = router;
