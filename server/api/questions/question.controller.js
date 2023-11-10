
const pool = require("../../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  postQuestion: (req, res) => {
    const user_id = req.user_id; // Declare user_id with 'const' or 'let'
    const { question, question_description, question_code_block, tags } =
      req.body;
    console.log("Received request body:", req.body);

    // Check if required data is provided
    if (!question) {
      return res
        .status(400)
        .json({ msg: "Not all fields have been provided!" });
    }

    // Log user_id to verify it is correctly defined
    console.log("User ID:", user_id);

    pool.query(
      `INSERT INTO question (question, question_description, question_code_block, tags, user_id) VALUES (?, ?, ?, ?, ?)`,
      [question, question_description, question_code_block, tags, user_id],
      (error, results) => {
        if (error) {
          console.log("Database query error:", error);
          return res
            .status(500)
            .json({ msg: "An error occurred while posting the question" });
        }

        // The query was successful, and results contain information about the insert.
        return res
          .status(200)
          .json({ msg: "Question posted successfully", data: results });
      }
    );
  },

  getAllQuestions: (req, res) => {
    const sql = `SELECT q.question_id, q.question, q.question_description, q.question_code_block, q.tags, q.user_id, p.first_name, p.last_name, r.user_email, r.user_name
FROM question AS q
JOIN profile AS p ON q.user_id = p.user_id
JOIN registration AS r ON q.user_id = r.user_id
ORDER BY q.question_id DESC;`;

    console.log("SQL Query:", sql);

    pool.query(sql, (error, results) => {
      if (error) {
        console.log("Database query error:", error);
        return res.status(500).json({
          status: false,
          msg: "An error occurred while retrieving questions",
        });
      }
      console.log("Query results:", results);
      res
        .status(200)
        .json({ status: true, total: results.length, questions: results });
    });
  },
  singleQuestion: (req, res) => {
    const questionId = req.params.questionId;
    const user_id = req.user_id;

    const sql = `
        SELECT
            q.question_id,
            q.question,
            q.question_description,
            q.question_code_block,
            q.tags,
            q.user_id,
            p.first_name,
            p.last_name,
            r.user_email,
            r.user_name
        FROM
            question AS q
        JOIN
            profile AS p ON q.user_id = p.user_id
        JOIN
            registration AS r ON q.user_id = r.user_id
        WHERE
            q.question_id = ? 
    `;

    console.log("SQL Query:", sql);

    pool.query(sql, [questionId], (error, results) => {
      if (error) {
        console.log("Database query error:", error);
        return res.status(500).json({
          status: false,
          msg: "An error occurred while retrieving the question",
        });
      }
      console.log("Query results:", results);
      res
        .status(200)
        .json({ status: true, total: results.length, questions: results });
    });
  },
};
