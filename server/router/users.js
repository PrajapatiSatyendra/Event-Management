const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/users");
const USER = require("../model/User");
const TICKETDATA = require("../model/bookedTickets");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

router.post("/checkout", usersControllers.checkout);

router.post('/checkout', usersControllers.checkout);
router.post('/verifyPayment', usersControllers.verifyPayment);
router.get('/getTickets/:order_id', usersControllers.getTickets);

router.get("/tivketbooking/:id", async (req, res) => {
  const id = req.params.id;
  const userID = id;

  try {
    const data = await TICKETDATA.find({ userID }).populate("eventId").exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/ReportData", async (req, res) => {
  try {
    const data = await TICKETDATA.find().populate("eventId").exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/googleSignup", async (req, res) => {
  const { firstName, email } = req.body;
  try {
    const data1 = await USER.findOne({ firstName, email });
    if (data1) {
      const token = jwt.sign(
        {
          email: data1.email,
          userId: data1._id.toString(),
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      res.status(201).json([data1, token]);
    } else {
      const data = new USER({ firstName, email });
      const share = await data.save();
      const token = jwt.sign(
        {
          email: share.email,
          userId: share._id.toString(),
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      res.status(201).json([share, token]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/ManageAllUser", async (req, res) => {
  try {
    const data = await USER.find();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/ManageAllUserDelete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await USER.findByIdAndDelete(id);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const FEEDBACK = require("../model/FeedBack");

router.get("/feedBackData", async (req, res) => {
  try {
    const data = await await FEEDBACK.find().populate("userid").exec();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/feedBackData/:id", async (req, res) => {
  const id = req.params.id;
  const userid = id;
  const { rating, msg } = req.body;
  try {
    const data = new FEEDBACK({ userid, rating, msg, status: false });
    const data1 = await data.save();
    res.status(201).json(data1);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/UpdatefeedBackData/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await FEEDBACK.findByIdAndUpdate(id, { status: true });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const ContactQurey = require("../model/Contact_qurey");

router.get("/contactQurey", async (req, res) => {
  try {
    const contactQureyData = await ContactQurey.find();
    // console.log(contactQureyData);
    res.status(200).json(contactQureyData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.get('/contactQureyMail/:id', async (req, res) => {

//   const id = req.params.id
//   try {
//     const contactQureyMail = await ContactQurey.findById(id)
//     res.status(200).json(contactQureyMail)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })

router.delete("/contactQureydel/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const contactQureyMail = await ContactQurey.findByIdAndDelete(id);
    res.status(200).json({ message: "del" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/contentQureyStatus/:id", async (req, res) => {
  const id = req.params.id;
  //   const { status } = req.body;

  try {
    const ContactQureyd = await ContactQurey.findByIdAndUpdate(
      id,
      { status: "Read" },
      { new: true }
    );
    res.status(200).json(ContactQureyd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/contactQurey", async (req, res, next) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     const error = new Error("Validation failed.");
    //     error.statusCode = 422;
    //     error.data = errors.array();
    //     throw error;
    // }

    const { name, email, message } = req.body;
    const Data = new ContactQurey({
      name,
      email,
      message,
      status: "Unread",
    });
    const saveData = await Data.save();
    res.status(201).json(saveData);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

module.exports = router;
