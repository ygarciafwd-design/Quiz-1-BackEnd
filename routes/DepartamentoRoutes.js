const express = require("express");
const router = express.Router();
const DepartamentoController = require("../controllers/DepartamentoController");

router.get("/", DepartamentoController.getAll);
router.get("/:id", DepartamentoController.getById);


module.exports = router;
