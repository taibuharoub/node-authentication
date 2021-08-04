const express = require("express");

const secretsController = require("../controllers/secrets")

const router = express.Router();

router.get("/secrets", secretsController.getSecrets);

module.exports = router;
