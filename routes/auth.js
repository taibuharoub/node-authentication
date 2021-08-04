const express = require("express");

const authController = require("../controllers/auth")

const router = express.Router();

router.route("/login").get(authController.login).post(authController.postLogin);
router.route("/register").get(authController.register).post(authController.postRegister);
router.route("/logout").get(authController.logout);

module.exports = router;
