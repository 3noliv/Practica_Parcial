const express = require("express");
const router = express.Router();

const userRoutes = require("./user");
const mailRoutes = require("./mail");

// Prefijo para las rutas de usuario
router.use("/user", userRoutes);
router.use("/mail", mailRoutes);

module.exports = router;
