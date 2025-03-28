const express = require("express");
const {
  registerUser,
  validateEmail,
  loginUser,
  updateOnboarding,
  updateCompany,
  updateLogo,
  getCurrentUser,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const uploadLogo = require("../middlewares/uploadLogo");
const {
  validateRegister,
  validateLogin,
  validateCode,
  validateOnboarding,
  validateCompany,
} = require("../validators/userValidator");

const router = express.Router();

/**
 * @openapi
 * /api/user/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Registro de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado correctamente
 */
router.post("/register", validateRegister, registerUser);

/**
 * @openapi
 * /api/user/validation:
 *   put:
 *     tags:
 *       - User
 *     summary: Validación del email con código
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [code]
 *             properties:
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email validado correctamente
 */
router.put("/validation", authMiddleware, validateCode, validateEmail);

/**
 * @openapi
 * /api/user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Login de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login correcto, retorna token
 */
router.post("/login", validateLogin, loginUser);

/**
 * @openapi
 * /api/user/me:
 *   get:
 *     tags:
 *       - User
 *     summary: Obtener datos del usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario actual
 */
router.get("/me", authMiddleware, getCurrentUser);

/**
 * @openapi
 * /api/user/register:
 *   put:
 *     tags:
 *       - User
 *     summary: Completar onboarding con nombre, apellidos y NIF
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, surname, nif]
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               nif:
 *                 type: string
 *     responses:
 *       200:
 *         description: Onboarding actualizado correctamente
 */
router.put("/register", authMiddleware, validateOnboarding, updateOnboarding);

/**
 * @openapi
 * /api/user/company:
 *   patch:
 *     tags:
 *       - User
 *     summary: Actualizar datos de la empresa
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, cif, address]
 *             properties:
 *               name:
 *                 type: string
 *               cif:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empresa actualizada correctamente
 */
router.patch("/company", authMiddleware, validateCompany, updateCompany);

/**
 * @openapi
 * /api/user/logo:
 *   patch:
 *     tags:
 *       - User
 *     summary: Subida del logo del usuario (IPFS)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Logo actualizado correctamente
 */
router.patch("/logo", authMiddleware, uploadLogo.single("logo"), updateLogo);

/**
 * @openapi
 * /api/user:
 *   delete:
 *     tags:
 *       - User
 *     summary: Eliminar usuario (soft o hard delete)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: soft
 *         schema:
 *           type: boolean
 *         description: true (soft delete) o false (hard delete)
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 */
router.delete("/", authMiddleware, deleteUser);

module.exports = router;
