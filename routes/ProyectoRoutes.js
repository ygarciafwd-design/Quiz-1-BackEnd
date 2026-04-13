const express = require("express");
const router = express.Router();
const ProyectoController = require("../controllers/ProyectoController");

router.get("/cliente/:clienteId", ProyectoController.getByCliente);

router.get("/", ProyectoController.getAll);
router.get("/:id", ProyectoController.getById);


module.exports = router;
