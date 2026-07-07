const express = require("express");
const router = express.Router();
const path = require("path");

//middleware
router.use(express.json());


const multer = require("multer");

//storage setup

const storage = multer.diskStorage({
    destination: function(req , file ,cb){
        if(file.mimetype==='image/jpg' || file.mimetype==='image/png')
        cb(null , path.join(__dirname , "../public/images"))
    },
    filename:function(req, file, cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null, name)
    } 
})

const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer ({storage:storage});

const userController = require("../controllers/userController");
const {registerValidator , sendMailVerificationValidator , loginValidatior} = require('../helpers/validation')
router.post("/register" , upload.single("image"), registerValidator , userController.userRegister);
router.post("/send-mail-verification" , sendMailVerificationValidator ,  userController.sendMailVerification)
router.post("/login" ,  loginValidatior , userController.loginUser)

module.exports = router;