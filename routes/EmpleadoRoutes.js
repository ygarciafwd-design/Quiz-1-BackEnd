const express = require("express");
const router = express.Router();
const EmpleadoController = require("../controllers/EmpleadoController");

router.get("/", EmpleadoController.getAll);
router.get("/:id", EmpleadoController.getById);
router.post("/", EmpleadoController.create);
router.put("/:id", EmpleadoController.update);
router.delete("/:id", EmpleadoController.delete);

module.exports = router;
