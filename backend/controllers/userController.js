// backend/controllers/userController.js
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator')
const mailer = require('../helpers/mailer')
const jwt = require("jsonwebtoken")

//  REGISTER 
const userRegister = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation Error',
                errors: error.array()
            });
        }

        const { name, email, mobile, password } = req.body;

        const isExists = await User.findOne({ email });
        if (isExists) {
            return res.status(400).json({
                success: false,
                msg: 'User Already Exists'
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            mobile,
            password: hashPassword
        });

        const userData = await user.save();

        const msg = `<p>Hi ${name}, Please <a href="http://127.0.0.1:3000/mail-verification?id=${userData._id}">verify</a> your email.</p>`;

        mailer.sendMail(email, 'Mail Verification', msg);

        return res.status(200).json({
            success: true,
            msg: 'Registered Successfully',
            user: userData
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};

//  SEND MAIL VERIFICATION 
const sendMailVerification = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation errors',
                errors: errors.array()
            });
        }

        const { email } = req.body;

        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({
                success: false,
                msg: 'Email does not exist',
            });
        }

        if (userData.is_verified == 1) {
            return res.status(400).json({
                success: false,
                msg: `${userData.email} Email Already Verified`
            });
        }

        const msg = `<p>Hi ${userData.name}, Please <a href="http://127.0.0.1:3000/mail-verification?id=${userData._id}">verify</a> your email.</p>`;

        await mailer.sendMail(userData.email, 'Mail Verification', msg);

        return res.status(200).json({
            success: true,
            msg: "Mail verification link sent to your email. Please verify"
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};

//  MAIL VERIFICATION 
const mailVerification = async (req, res) => {
    try {
        if (req.query.id === undefined) {
            return res.render('404');
        }

        const userData = await User.findOne({ _id: req.query.id });

        if (userData) {
            if (userData.is_verified == 1) {
                if (userData.is_verified == 1) {
                    return res.redirect('http://localhost:5173/login');
                }
            }

            await User.findByIdAndUpdate(req.query.id, {
                $set: { is_verified: 1 }
            });

            await User.findByIdAndUpdate(req.query.id, {
                $set: { is_verified: 1 }
            });

            return res.redirect('http://localhost:5173/login');
        } else {
            return res.render('mail-verification', { message: 'User Not Found' });
        }
    } catch (error) {
        console.error(error.message);
        return res.render('404');
    }
};

// ====================== GENERATE TOKEN ======================
const generateAccessToken = async (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        name: user.name
    };

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" });
    return token;
};

// LOGIN
const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation errors',
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: "Email and Password are required"
            });
        }

        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(401).json({
                success: false,
                msg: "Email or Password not match"
            });
        }

        const passwordMatch = await bcrypt.compare(password, userData.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                msg: "Email or Password not match"
            });
        }

        if (userData.is_verified === 0) {
            return res.status(401).json({
                success: false,
                msg: "Please verify your email first"
            });
        }

        const accessToken = await generateAccessToken(userData);

        return res.status(200).json({
            success: true,
            msg: "Login Successfully!",
            user: userData,
            accessToken: accessToken,
            tokenType: "Bearer"
        });

    } catch (error) {
        console.error("Login Error:", error.message);
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
};

module.exports = {
    userRegister,
    mailVerification,
    sendMailVerification,
    loginUser
};