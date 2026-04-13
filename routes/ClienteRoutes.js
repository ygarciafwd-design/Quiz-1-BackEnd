const express = require("express");
const router = express.Router();

const ClienteController = require("../controllers/ClienteController");

router.get("/", ClienteController.getAll);
router.get("/:id", ClienteController.getById);


module.exports = router;
