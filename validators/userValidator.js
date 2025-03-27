const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validateRegister = [
  check("email")
    .exists()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ser un email válido"),

  check("password")
    .exists()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),

  (req, res, next) => validateResults(req, res, next),
];

const validateLogin = [
  check("email")
    .exists()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ser un email válido"),

  check("password").exists().withMessage("La contraseña es obligatoria"),

  (req, res, next) => validateResults(req, res, next),
];

const validateCode = [
  check("code")
    .exists()
    .withMessage("El código es obligatorio")
    .isLength({ min: 6, max: 6 })
    .withMessage("El código debe tener exactamente 6 dígitos")
    .isNumeric()
    .withMessage("El código debe ser numérico"),

  (req, res, next) => validateResults(req, res, next),
];

const validateOnboarding = [
  check("name")
    .exists()
    .withMessage("El nombre es obligatorio")
    .notEmpty()
    .withMessage("El nombre no puede estar vacío"),

  check("surname")
    .exists()
    .withMessage("El apellido es obligatorio")
    .notEmpty()
    .withMessage("El apellido no puede estar vacío"),

  check("nif")
    .exists()
    .withMessage("El NIF es obligatorio")
    .matches(/^[0-9]{8}[A-Z]$/)
    .withMessage("El NIF debe tener 8 números seguidos de una letra mayúscula"),

  (req, res, next) => validateResults(req, res, next),
];

module.exports = {
  validateRegister,
  validateLogin,
  validateCode,
  validateOnboarding,
};
