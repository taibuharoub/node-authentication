const express = require("express");

const authController = require("../controllers/auth")

const router = express.Router();

router.route("/login").get(authController.login).post(authController.postLogin);
router.route("/register").get(authController.register).post(authController.postRegister);

module.exports = router;
