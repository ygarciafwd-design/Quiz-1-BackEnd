const express = require("express");
const router = express.Router();
const ProyectoController = require("../controllers/ProyectoController");

router.get("/cliente/:clienteId", ProyectoController.getByCliente);

router.get("/", ProyectoController.getAll);
router.get("/:id", ProyectoController.getById);
router.post("/", ProyectoController.create);
router.put("/:id", ProyectoController.update);
router.delete("/:id", ProyectoController.delete);

module.exports = router;
