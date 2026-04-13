const express = require("express");
const router = express.Router();
const EmpleadoController = require("../controllers/EmpleadoController");

router.get("/", EmpleadoController.getAll);
router.get("/:id", EmpleadoController.getById);


module.exports = router;
