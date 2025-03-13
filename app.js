require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/mongo");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta base para verificar conexión
app.get("/", (req, res) => {
  res.send("🚀 Servidor funcionando correctamente!");
});

// Conectar a la base de datos
dbConnect();

const routes = require("./routes");
app.use("/api", routes);

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});
