const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { matchedData } = require("express-validator");
const generateCode = require("../utils/generateCode.js");

// Registro de usuario
const registerUser = async (req, res) => {
  try {
    const data = matchedData(req);
    const userExists = await User.findOne({ email: data.email });
    if (userExists)
      return res.status(409).json({ message: "Email ya registrado" });

    const verificationCode = generateCode();
    const newUser = new User({ ...data, verificationCode });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .status(201)
      .json({
        user: {
          email: newUser.email,
          status: newUser.status,
          role: newUser.role,
        },
        token,
      });
  } catch (error) {
    res.status(500).json({ message: "Error en el registro" });
  }
};

// Validación del email
const validateEmail = async (req, res) => {
  try {
    const { code } = matchedData(req);
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    if (user.verificationCode !== code)
      return res.status(400).json({ message: "Código incorrecto" });

    user.status = "verified";
    await user.save();
    res.json({ message: "Email validado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error en la validación" });
  }
};



module.exports = { registerUser, validateEmail };
