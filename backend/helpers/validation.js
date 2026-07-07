const { check } = require("express-validator")

exports.registerValidator = [
    check('name' , 'Name is Required').not().isEmpty(),
    check('email' , 'Please Enter a Valid Email').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),
    check('mobile', 'Mobile Number must be 11 Digit').isLength({
        min:11,
        max:11
    }),
    check('password' , 'password is Required').not().isEmpty(),
    check('image').custom((value,{req})=>{
        if (!req.file) return true; // optional image
        if(req.file.mimetype==='image/jpeg' || req.file.mimetype==='image/png'){
            return true;
        }else{
            return false;
        }
        }).withMessage('please Upload Image format jpg or png')
];


exports.sendMailVerificationValidator = [
     check('email' , 'Please Enter a Valid Email').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),
    ];



exports.loginValidatior = [
    check('email' , 'Please Enter a Valid Email').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),
    check('password' , 'password is Required').not().isEmpty(),
]
