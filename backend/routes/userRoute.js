// backend/routes/userRoute.js
const express = require("express");
const router = express.Router();

//middleware
router.use(express.json());

const userController = require("../controllers/userController");
const { registerValidator, sendMailVerificationValidator, loginValidatior } = require('../helpers/validation');

router.post("/register", registerValidator, userController.userRegister);
router.post("/send-mail-verification", sendMailVerificationValidator, userController.sendMailVerification);
router.post("/login", loginValidatior, userController.loginUser);

module.exports = router;