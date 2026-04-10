const express = require("express");
const cors = require("cors");
require("dotenv").config();

const empleadoRoutes = require("./routes/EmpleadoRoutes");
const proyectoRoutes = require("./routes/ProyectoRoutes");
const clienteRoutes = require("./routes/ClienteRoutes");
const departamentoRoutes = require("./routes/DepartamentoRoutes");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API - Sistema de Gestión de Empresa de Desarrollo",
    version: "1.0.0",
    endpoints: {
      empleados: "/api/empleados",
      proyectos: "/api/proyectos",
      clientes: "/api/clientes",
      departamentos: "/api/departamentos",
    },
  });
});

app.use("/api/empleados", empleadoRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/departamentos", departamentoRoutes);

app.listen(PORT, () => {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  🚀 Servidor iniciado correctamente");
  console.log(`  📡 URL: http://localhost:${PORT}`);
  console.log(`  🌐 Entorno: ${process.env.NODE_ENV || "development"}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Endpoints disponibles:");
  console.log(`  → GET  http://localhost:${PORT}/api/empleados`);
  console.log(`  → GET  http://localhost:${PORT}/api/proyectos`);
  console.log(`  → GET  http://localhost:${PORT}/api/clientes`);
  console.log(`  → GET  http://localhost:${PORT}/api/departamentos`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
});

module.exports = app;
