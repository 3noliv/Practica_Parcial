const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { matchedData } = require("express-validator");
const generateCode = require("../utils/generateCode.js");

// Registro de usuario
const registerUser = async (req, res) => {
  try {
    console.log("🟢 Recibiendo datos:", req.body);

    const data = req.body;
    console.log("🟢 Datos procesados:", data);

    if (!data.email || !data.password) {
      return res
        .status(400)
        .json({ message: "Email y password son obligatorios" });
    }

    const userExists = await User.findOne({ email: data.email });
    if (userExists) {
      console.log("🔴 Email ya registrado");
      return res.status(409).json({ message: "Email ya registrado" });
    }

    const verificationCode = generateCode();
    console.log("🟢 Código de verificación generado:", verificationCode);

    const newUser = new User({ ...data, verificationCode });
    await newUser.save();
    console.log("✅ Usuario guardado en la base de datos");

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("🟢 Token JWT generado");

    res.status(201).json({
      user: {
        email: newUser.email,
        status: newUser.status,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    console.error("❌ Error en el registro:", error);
    res
      .status(500)
      .json({ message: "Error en el registro", error: error.message });
  }
};

// Validación del email
const validateEmail = async (req, res) => {
  try {
    console.log("🟢 Token recibido:", req.user);
    console.log("🟢 Código recibido:", req.body.code);

    const user = await User.findById(req.user.id);
    if (!user) {
      console.log("🔴 Usuario no encontrado");
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    console.log("🟢 Código en BD:", user.verificationCode);

    if (user.verificationCode !== req.body.code) {
      console.log("🔴 Código incorrecto");
      return res.status(400).json({ message: "Código incorrecto" });
    }

    user.status = "verified";
    await user.save();
    console.log("✅ Email validado correctamente");

    res.json({ message: "Email validado correctamente" });
  } catch (error) {
    console.error("❌ Error en la validación:", error);
    res.status(500).json({ message: "Error en la validación" });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = matchedData(req);
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ user: { email: user.email, role: user.role }, token });
  } catch (error) {
    res.status(500).json({ message: "Error en el login" });
  }
};

module.exports = { registerUser, validateEmail, loginUser };
