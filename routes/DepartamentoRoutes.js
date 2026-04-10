const express = require("express");
const router = express.Router();
const DepartamentoController = require("../controllers/DepartamentoController");

router.get("/", DepartamentoController.getAll);
router.get("/:id", DepartamentoController.getById);
router.post("/", DepartamentoController.create);
router.put("/:id", DepartamentoController.update);
router.delete("/:id", DepartamentoController.delete);

module.exports = router;
