const Users = require('../model/User')
const Tokens = require("../model/token");
const OTPModel = require("../model/otpModel");
const AdminLogin = require("../model/LoginAdmin");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const validatePhoneNumber = require("validate-phone-number-node-js");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const otpGenerator = require("otp-generator");
require("dotenv").config();

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: process.env.EMAIL_SERVICE_API_KEY,
        },
    })
);

/*--------------------------------------------------Signup---------------------------------------------------------------------------- */
exports.checkInWithEmail = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed  or Email already exists.");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const { email } = req.body;
        // const userData = new Users({
        //     email
        // });
        // const saveUserData = await userData.save();

        const OTP = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        otpData = OTP;

        const hashedOTP = await bcrypt.hash(OTP, 10);

        const otp = new OTPModel({ email:email, otp: hashedOTP });
        const result = await otp.save();

        await transporter.sendMail({
            to: email,
            from: process.env.SENDER,
            subject: "Email verification",
            html: `<p>Email verification code.</p>
                              <p>OTP: ${otpData}</p>`,
        });
        res
            .status(201)
            .json({ message: "An email sent to your account, please verify.", posts: {email:email, otpId:result._id} });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.signUp = async (req, res, next) => {
    try {
        let { email, firstName, lastName, otp,otpId } = req.body;
        otp = otp.trim().toString();
        console.log(otp);

        // const user = await Users.findById(otpId);
        // if (!user) {
        //     const error = new Error("User not found.");
        //     error.statusCode = 404;
        //     throw error;
        // }

        const result = await OTPModel.findById(otpId);
        console.log(result);

        if (!result) {
            const error = new Error("Invalid OTP.");
            error.statusCode = 404;
            throw error;
        }
        const isEqual = await bcrypt.compare(otp, result.otp);
        if (!isEqual) {
            const error = new Error("Invalid OTP.");
            error.statusCode = 401;
            throw error;
        }
        await result.remove();
        const post = new Users({ email: email, firstName: firstName, lastName: lastName });
         const user=await post.save();
        const token = new Tokens({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        });

        const postToken = await token.save();
        res.status(200).json({
            message: "OTP verified sucessfully.",
            otpToken: postToken.token,
            userData: user
        });

    } catch (error) {
        next(error);
    }
}

exports.passwordCreation = async (req, res, next) => {
    try {
        const otpToken = req.body.otpToken;
        const newPassword = req.body.password;
        const email = req.body.email;
        console.log(otpToken, newPassword, email);

        let resetUser;
        const user = await Users.findOne({ email: email });
        if (!user) {
            const error = new Error("Bad Request");
            error.statusCode = 400;
            throw error;
        } else {
            const result = await Tokens.findOne({
                userId: user._id,
                token: otpToken,
            });
            if (!result) {
                const error = new Error("Bad Request");
                error.statusCode = 400;
                throw error;
            } else {
                await Tokens.findOneAndDelete({ userId: user._id });
                resetUser = user;
                const hashedPassword = await bcrypt.hash(newPassword, 12);
                user.password = hashedPassword;
                const rt=await user.save();
                console.log(rt);
                const token = jwt.sign(
                    {
                        email: user.email,
                        userId: user._id.toString(),
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "24h" }
                );
                res.status(200).json({message:"successfully logged in",
                    token: token,
                    userId: user._id,
                    userName: user.firstName,
                    email: user.email,
                    expiresIn: 24 * 60 * 60,

                });
            }
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}

/*----------------------------------------Admin signup-------------------------------------------------------------------------------- */

exports.signupAdminPanel = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed or Email already exists.");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const {
            userName,
            email,
            mobile,
            password,
        } = req.body;
        console.log(mobile);
        let status = "Allow";
        const passwordHash = await bcrypt.hash(password, 10);
        const userData = new AdminLogin({
            userName,
            email,
            mobile,
            password: passwordHash,
            status
        });
        const saveUserData = await userData.save();
        const token = await new Tokens({
            userId: saveUserData._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const url = `http://localhost:3000/auth/user/${saveUserData._id}/verify/${token.token}`;

        await transporter.sendMail({
            to: email,
            from: process.env.SENDER,
            subject: "Email Verification",
            html: `<p>Verify email by clicking on the button below.</p>
                  <a type=button href=${url}>Verify Email</a>`,
        });
        res
            .status(201)
            .json({ message: "An email sent to your account, please verify.", posts: saveUserData });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

/*---------------------------------------------Email Verification------------------------------------------------------------------- */
exports.getemailVerified = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        let userId;
        const user = await Users.findOne({ _id: id });
        const adminUser = await AdminLogin.findOne({ _id: id });

        if (!(user || adminUser))
            return res.status(400).json({ message: "Invalid link." });

        const token = await Tokens.findOne({
            userId: id,
            token: req.params.token,
        });

        if (!token) return res.status(400).json({ message: "Invalid link11." });
        if (user) {
            await Users.updateOne({ _id: user._id }, { emailVerified: true });
        } else {
            await AdminLogin.updateOne(
                { _id: adminUser._id },
                { emailVerified: true }
            );
        }

        await token.remove();

        res.status(200).json({ message: "Email verified successfully." });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
/*--------------------------------------------------------Login---------------------------------------------------------------------- */

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // console.log(email, password, role);
        const userData = await Users.findOne({ email: email });
        if (!userData) {
            const error = new Error("A user with this id could not be found.");
            error.statusCode = 401;
            throw error;
        }
        if (!userData.password) {
            throw new Error("This account has been signed up with either google or facebook.");
        }

        const passwordCompare = await bcrypt.compare(password, userData.password);
        if (!passwordCompare) {
            const error = new Error("Invalid E-mail or Password.");
            error.statusCode = 401;
            throw error;
        }


        const token = jwt.sign(
            {
                email: userData.email,
                userId: userData._id.toString(),
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );
        
        res.status(200).json({
            token: token,
            userId: userData._id,
            userName: userData.firstName,
            expiresIn: 24 * 60 * 60,
            email: userData.email
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }

        next(error);
    }
};

/*---------------------------------------------Admin Forgot Password--------------------------------------------------------------------- */

exports.adminPostResetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        let otpData;
        const user = await AdminLogin.findOne({ email: email });

        if (!user) {
            const error = new Error("No user found with given userId.");
            error.statusCode = 404;
            throw error;
        }

        const OTP = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        otpData = OTP;

        const hashedOTP = await bcrypt.hash(OTP, 10);

        const otp = new OTPModel({ userId: user._id, otp: hashedOTP });
        const result = await otp.save();

        await transporter.sendMail({
            to: email,
            from: process.env.SENDER,
            subject: "Reset Password",
            html: `<p>You requested reset password.</p>
                              <p>OTP: ${otpData}</p>`,
        });

        res
            .status(200)
            .json({ message: "OTP has been sent to your registered email." });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.adminOtpVerification = async (req, res, next) => {
    try {
        let { email, otp } = req.body;
        otp = otp.trim().toString();
        console.log(email, otp);
        const user = await AdminLogin.findOne({ email: email });
        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            throw error;
        }
        console.log("user", user);
        const result = await OTPModel.findOne({ userId: user._id });

        if (!result) {
            const error = new Error("Invalid OTP.");
            error.statusCode = 404;
            throw error;
        }
        const isEqual = await bcrypt.compare(otp, result.otp);
        if (!isEqual) {
            const error = new Error("Invalid OTP.");
            error.statusCode = 401;
            throw error;
        }
        await result.remove();
        const token = new Tokens({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        });

        const postToken = await token.save();
        res.status(200).json({
            message: "OTP verified sucessfully.",
            otpToken: postToken.token,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.adminPostNewPassword = async (req, res, next) => {
    try {
        const otpToken = req.body.otpToken;
        const newPassword = req.body.newPassword;
        const email = req.body.email;

        let resetUser;
        const user = await AdminLogin.findOne({ email: email });
        if (!user) {
            const error = new Error("Bad Request");
            error.statusCode = 400;
            throw error;
        } else {
            const result = await Tokens.findOne({
                userId: user._id,
                token: otpToken,
            });
            if (!result) {
                const error = new Error("Bad Request");
                error.statusCode = 400;
                throw error;
            } else {
                await Tokens.findOneAndDelete({ userId: user._id });
                resetUser = user;
                const hashedPassword = await bcrypt.hash(newPassword, 12);
                user.password = hashedPassword;
                await user.save();
                // if (!user.emailVerified) {
                //     let token = await Tokens.findOne({ userId: user._id });
                //     if (!token) {
                //         token = await new Tokens({
                //             userId: user._id,
                //             token: crypto.randomBytes(32).toString("hex"),
                //         }).save();

                //         const url = `${process.env.BASE_URL}/auth/user/${userData.id}/verify/${token.token}`;
                //         await transporter.sendMail({
                //             to: email,
                //             from: process.env.SENDER,
                //             subject: "Email Verification",
                //             html: `<p>Verify email by clicking on the button below.</p>
                //      <a type=button href=${url}>Verify Email</a>`,
                //         });
                //     }

                //     return res
                //         .status(400)
                //         .send({ message: "An Email sent to your account please verify" });
                // }

                const token = jwt.sign(
                    {
                        email: user.email,
                        userId: user._id.toString(),
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "24h" }
                );
                res.status(200).json({
                    token: token,
                    userId: user._id,
                    userName: user.userName,
                    expiresIn: 24 * 60 * 60,
                    userEmail:user.email
                    
                });
            }
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

/*----------------------------------------------------Admin Login--------------------------------------------------------------------- */

exports.adminlogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const userData = await AdminLogin.findOne({ email });
        if (!userData) {
            const error = new Error(" A user with this id could not be found.");
            error.statusCode = 401;
            throw error;
        } else {
            const passwordCompare = await bcrypt.compare(password, userData.password);
            if (!passwordCompare) {
                const error = new Error("Incorrect E-mail address or Password.");
                error.statusCode = 401;
                throw error;
            } else {

                if (userData.status !== "Allow") {
                    const error = new Error(`You don't have access right now.`);
                    error.statusCode = 401;
                    throw error;
                }


                const token = jwt.sign(
                    {
                        email: userData.email,
                        userId: userData._id.toString(),
                    },
                    "HuBneX@4536#WdFt78",
                    { expiresIn: "24h" }
                );





                res.status(200).json({
                    token: token,
                    userId: userData._id,
                    userName: userData.userName,
                    expiresIn: 24 * 60 * 60,
                    userEmail:userData.email
                });
            }
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }

        next(error);
    }
};
/*-------------------------------------------------------- forgot password------------------------------------------------------- */

exports.postResetPassword = async (req, res, next) => {
    try {
        const { email, role } = req.body;
        console.log(email, role);
        let otpData;
        const user = await Users.findOne({ email: email, role: role });

        if (!user) {
            const error = new Error("No user found with given userId.");
            error.statusCode = 404;
            throw error;
        }

        const OTP = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        otpData = OTP;

        const hashedOTP = await bcrypt.hash(OTP, 10);

        const otp = new OTPModel({ userId: user._id, otp: hashedOTP });
        const result = await otp.save();

        await transporter.sendMail({
            to: email,
            from: process.env.SENDER,
            subject: "Reset Password",
            html: `<p>You requested reset password.</p>
                            <p>OTP: ${otpData}</p>`,
        });

        res
            .status(200)
            .json({ message: "OTP has been sent to your registered email." });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.otpVerification = async (req, res, next) => {
    try {
        let { email, otp, role } = req.body;
        otp = otp.trim().toString();

        const user = await Users.findOne({ email: email, role: role });
        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            throw error;
        }

        const result = await OTPModel.findOne({ userId: user._id });

        if (!result) {
            const error = new Error("Invalid OTP.");
            error.statusCode = 404;
            throw error;
        }
        const isEqual = await bcrypt.compare(otp, result.otp);
        if (!isEqual) {
            const error = new Error("Invalid OTP.");
            error.statusCode = 401;
            throw error;
        }
        await result.remove();
        const token = new Tokens({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        });

        const postToken = await token.save();
        res.status(200).json({
            message: "OTP verified sucessfully.",
            otpToken: postToken.token,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.postNewPassword = async (req, res, next) => {
    try {
        const otpToken = req.body.otpToken;
        const newPassword = req.body.newPassword;
        const email = req.body.email;
        const role = req.body.role;
        let resetUser;
        const user = await Users.findOne({ email: email, role: role });
        if (!user) {
            const error = new Error("Bad Request");
            error.statusCode = 400;
            throw error;
        } else {
            const result = await Tokens.findOne({
                userId: user._id,
                token: otpToken,
            });
            if (!result) {
                const error = new Error("Bad Request");
                error.statusCode = 400;
                throw error;
            } else {
                await Tokens.findOneAndDelete({ userId: user._id });
                resetUser = user;
                const hashedPassword = await bcrypt.hash(newPassword, 12);
                user.password = hashedPassword;
                await user.save();
                if (!user.emailVerified) {
                    let token = await Tokens.findOne({ userId: user._id });
                    if (!token) {
                        token = await new Tokens({
                            userId: user._id,
                            token: crypto.randomBytes(32).toString("hex"),
                        }).save();

                        const url = `${process.env.BASE_URL}/auth/user/${userData.id}/verify/${token.token}`;
                        await transporter.sendMail({
                            to: email,
                            from: process.env.SENDER,
                            subject: "Email Verification",
                            html: `<p>Verify email by clicking on the button below.</p>
                   <a type=button href=${url}>Verify Email</a>`,
                        });
                    }

                    return res
                        .status(400)
                        .send({ message: "An Email sent to your account please verify" });
                }

                const token = jwt.sign(
                    {
                        email: user.email,
                        userId: user._id.toString(),
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "24h" }
                );
                res.status(200).json({
                    token: token,
                    userId: user._id,
                    userName: user.fullName.split(" ")[0],
                    expiresIn: 24 * 60 * 60,
                });
            }
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};


