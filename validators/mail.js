const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorMail = [
  check("subject").exists().notEmpty().withMessage("Subject is required"),
  check("text").exists().notEmpty().withMessage("Text content is required"),
  check("to")
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage("Valid recipient email is required"),
  (req, res, next) => validateResults(req, res, next),
];

module.exports = { validatorMail };
