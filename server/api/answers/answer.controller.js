const pool = require("../../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  postAnswer: (req, res) => {
    const questionId = req.params.questionId;
    // const user_id = req.user_id; // Declare user_id with 'const' or 'let'

    const { answer, answer_code_block,user_id } = req.body;
    console.log("Received request body:", req.body);

    // Check if required data is provided
    if (!answer) {
      return res.status(400).json({ msg: "Answer has not been provided!" });
    }

    // Log user_id to verify it is correctly defined
    console.log("User ID:", user_id);

    pool.query(
      `INSERT INTO answer (answer,answer_code_block,user_id,question_id) VALUES (?, ?, ?,?)`,
      [answer, answer_code_block, user_id, questionId],

      (error, results) => {
        if (error) {
          console.log("Database query error:", error);
          return res
            .status(500)
            .json({ msg: "An error occurred while posting the answer" });
        }

        // The query was successful, and results contain information about the insert.
        return res
          .status(200)
          .json({ msg: "Answer posted successfully", data: results });
      }
    );
  },
  getAllAnswersAlongWithTheirQuestions: (req, res) => {
    const questionId = req.params.questionId;

    const sql = `SELECT a.answer, a.answer_code_block, q.question_id, q.question, q.question_description, q.question_code_block, q.tags, q.user_id, p.first_name, p.last_name, r.user_email, r.user_name
FROM answer AS a
JOIN question AS q ON q.question_id = a.question_id
JOIN profile AS p ON p.user_id = q.user_id
JOIN registration AS r ON r.user_id = q.user_id
WHERE a.question_id = ? ORDER BY a.answer_id DESC`;

    pool.query(sql, [questionId], (error, results) => {
      if (error) {
        console.log("Database query error:", error);
        return res.status(500).json({
          status: false,
          msg: "An error occurred while retrieving answers",
        });
      }
      console.log("Query results:", results);
      res
        .status(200)
        .json({ status: true, total: results.length, answers: results });
    });
  },
};
