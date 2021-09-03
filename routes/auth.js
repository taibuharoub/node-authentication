const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.route("/login").get(authController.login).post(authController.postLogin);
router
  .route("/register")
  .get(authController.register)
  .post(authController.postRegister);
router.route("/logout").get(authController.logout);
router.route("/auth/google").get(authController.getOAouth);
router.route("/auth/google/secrets").get(authController.getOauthCallback);
// router.get(
//   "/auth/google/secrets",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect("/");
//   }
// );

module.exports = router;
