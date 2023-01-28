const router = require("express").Router();
const authControllers = require('../controllers/auth');
const { body } = require('express-validator');
const Users = require("../model/User");
const AdminLogin = require('../model/LoginAdmin')
const bcrypt = require('bcrypt')
// *********************************************************************************************//

// user Users

router.put("/checkInWithEmail", [
  body('email')
    .isEmail()
    .withMessage("Please enter a Valid email address.")
    .custom((value, { req }) => {
      return Users.findOne({ email: value, role: req.body.role })
        .then(userDoc => {
          if (userDoc) {
            return Promise.reject("E-mail address already exists.");
          }
        });
    })
    .normalizeEmail(),

], authControllers.checkInWithEmail);

router.put('/signUp', authControllers.signUp);
router.put("/passwordCreation", authControllers.passwordCreation);

router.put("/signupAdminPanel", [
  body('email')
    .isEmail()
    .withMessage("Please enter a Valid email address.")
    .custom((value, { req }) => {
      return AdminLogin.findOne({ email: value })
        .then(userDoc => {
          if (userDoc) {
            return Promise.reject("E-mail address already exists.");
          }
        });
    })
    .normalizeEmail(),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password length must be greater than 5.")
], authControllers.signupAdminPanel);

router.get("/user/:id/verify/:token/", authControllers.getemailVerified);
router.post("/login", authControllers.login);
router.post("/adminLogin", authControllers.adminlogin);
router.post('/postResetPassword', authControllers.postResetPassword);
router.post('/otpVerification', authControllers.otpVerification);
router.post('/postNewPassword', authControllers.postNewPassword);
router.post('/adminPostResetPassword', authControllers.adminPostResetPassword);
router.post('/adminOtpVerification', authControllers.adminOtpVerification);
router.post('/adminPostNewPassword', authControllers.adminPostNewPassword);



router.get("/manageRole", async (req, res, next) => {
  try {
    const data = await AdminLogin.find();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/manageRole/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    await AdminLogin.findByIdAndDelete(id);
    res.status(200).json({ message: "del" });
  } catch (error) {
    next(error);
  }
});


router.put("/manageRole/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await AdminLogin.findById(id);
    // console.log(result, id);
    if (!result) {
      throw new Error("Something went wrong.");
    }
    let status = ((result.status) === "Allow") ? "Block" : "Allow";
    const result_2 = await AdminLogin.findByIdAndUpdate(id, { status: status }, { new: true });
    if (!result_2) {
      throw new Error("Something went wrong.");
    }
    res.status(201).json({ message: "Status updated successfully.", posts: result_2 });
  } catch (error) {
    next(error);
  }

})


router.put("/editManageUser/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const { userName, email, mobile, password } = req.body;
    if (password) {
      const passwordHash = await bcrypt.hash(password, 10);
      const result_2 = await AdminLogin.findByIdAndUpdate(id, { password: passwordHash }, { new: true });
      if (!result_2) {
        throw new Error("something went wrong");
      }
    }

    const result = await AdminLogin.findByIdAndUpdate(id, { userName, email, mobile }, { new: true });
    if (!result) {
      throw new Error("something went wrong");
    }
    res.status(200).json({ message: "Updated successfully", posts: result });
    // console.log(result);
  } catch (error) {
    next(error);
  }
});






module.exports = router;
