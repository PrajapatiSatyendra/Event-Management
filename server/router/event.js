const router = require("express").Router();
const EVENT = require("../model/Event");
//const upload = require("../middlewares/upload");
const upload = require("../middlewares/s3");
const eventsControllers = require("../controllers/events");
const BANNER = require("../model/Banner");
const FooterBANNER = require("../model/footerBanner");
const isAuth = require('../middlewares/is-auth');
const {S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require('dotenv').config();


/**---------------------------------------------------------------------------------- */
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessId = process.env.BUCKET_ACCESS_ID;
const secretAccessKey = process.env.BUCKET_SECRET_ACCESS_KEY;

// Create a client

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessId,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});
// _________________________________create event (post request)___________________________________________
router.post("/createEvent", upload.single("banner"), async (req, res) => {
    const {
        eventName,
        categary,
        eventDate,
        startTime,
        endTime,
        location,
        desc,
        customId,
        status,
        ticketsData,
    } = req.body;
 
    
  

    let a = JSON.parse(ticketsData);
    // console.log(a);
    try {
        if (req.file) {
             let filename = `${Date.now()}-photo-${req.file.originalname}`;
             let params = {
               Bucket: process.env.BUCKET_NAME,
               Key: filename,
               Body: req.file.buffer,
               ContentType: req.file.mimetype,
               ContentEncoding: "base64",
             };

             const command = new PutObjectCommand(params);
             await s3.send(command);
            const data = new EVENT({
                eventName,
                categary,
                eventDate,
                startTime,
                endTime,
                location,
                desc,
                imageFilename:filename,
                status,
                customId,
                trending: false,
            });
            const eventData = await data.save();
          
            a.forEach(async function pushdata(value) {
                eventData.ticket.push({
                    ticketName: value.ticketName,
                    numberOfTickets: value.numberOfTickets,
                    ticketPrice: value.ticketPrice,
                    paymentCurrency: value.paymentCurrency,
                    ticketInfo: value.ticketInfo,
                });
            });
            await eventData.save();
            console.log(eventData);
            res.status(201).json(eventData);
        } else {
            const data = new EVENT({
                eventName,
                categary,
                eventDate,
                startTime,
                endTime,
                location,
                desc,
                status,
                customId,
                trending: false,
            });
            const eventData = await data.save();

            a.forEach(async function pushdata(value) {
                eventData.ticket.push({
                    ticketName: value.ticketName,
                    numberOfTickets: value.numberOfTickets,
                    ticketPrice: value.ticketPrice,
                    paymentCurrency: value.paymentCurrency,
                    ticketInfo: value.ticketInfo,
                });
            });
            await eventData.save();
           
            res.status(201).json(eventData);
        }
        {
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put("/createEvent/:id", upload.single("banner"), async (req, res) => {
    const { id } = req.params;

    const {
        eventName,
        categary,
        eventDate,
        startTime,
        endTime,
        location,
        desc,
        status,
    } = req.body;

    try {
        
        if (req.file) {
             let filename = `${Date.now()}-photo-${req.file.originalname}`;
             let params = {
               Bucket: process.env.BUCKET_NAME,
               Key: filename,
               Body: req.file.buffer,
               ContentType: req.file.mimetype,
               ContentEncoding: "base64",
             };

             const command = new PutObjectCommand(params);
             await s3.send(command);
            const data = await EVENT.findByIdAndUpdate(id, {
                eventName,
                categary,
                eventDate,
                startTime,
                endTime,
                location,
                imageFilename:filename,
                desc,
                banner: req.file.id,
                status,
            });
            const eventData = await data.save();
            res.status(201).json(eventData);
        } else {
            const data = await EVENT.findByIdAndUpdate(id, {
                eventName,
                categary,
                eventDate,
                startTime,
                endTime,
                location,
                desc,
                status,
            });
            const eventData = await data.save();
            res.status(201).json(eventData);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        // console.log(error);
    }
});
router.put(
    "/createEventticketupdate/:id/:EventID",
    upload.single("banner"),
    async (req, res) => {
        const { id, EventID } = req.params;

        const {
            ticketName,
            numberOfTickets,
            ticketPrice,
            paymentCurrency,
            ticketInfo,
        } = req.body;
        // console.log(req.body);
        try {
            const data = await EVENT.findById(EventID);

            removeObjectWithId(data.ticket, id);

            function removeObjectWithId(arr, id) {
                const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

                if (objWithIdIndex > -1) {
                    arr[objWithIdIndex].ticketName = ticketName;
                    arr[objWithIdIndex].numberOfTickets = numberOfTickets;
                    arr[objWithIdIndex].ticketPrice = ticketPrice;
                    arr[objWithIdIndex].paymentCurrency = paymentCurrency;
                    arr[objWithIdIndex].ticketInfo = ticketInfo;
                }
                return arr;
            }

            await data.save();
            res.status(200).json("Successfully Updated");
        } catch (error) {
            res.status(500).json({ message: error.message });
            // console.log(error);
        }
    }
);
/*-------------------------------------------get events by catogories------------------------------------------------------------------- */
router.post("/getEventsByCategories", eventsControllers.getEventsByCategories);
router.get("/getImage/:filename", eventsControllers.getImage);
router.get("/getEventById/:id", eventsControllers.getEventById);
// _________________________________Find all publish events______________________________________________

router.get("/eventDataforTicket", async (req, res) => {
    try {
        const data = await EVENT.find({ status: "publish" })
            .populate("banner")
            .exec();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/eventData", async (req, res) => {
    try {
        const data = await EVENT.find({ status: "publish" });
        // const data = await EVENT.find();

        let a = [];
        for (let x of data) {
            a.push(x.categary);
        }

        const counts = {};

        a.forEach(function (x) {
            counts[x] = (counts[x] || 0) + 1;
        });

        res.status(200).json([counts, data]);

        // res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/eventData/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const data = await EVENT.findById(id).populate([{ path: 'banner' }, { path: 'ticket', populate: { path: 'customersId', model: 'bookedtickets' } }]).exec();

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/findBYCatagiry", async (req, res) => {
    const { categary } = req.body;
    // console.log(req.body);
    try {
        const data = await EVENT.find({ categary });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/deleteEvevnt/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await EVENT.findByIdAndDelete(id);
        res.status(200).json("Successfully Deleted");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete("/deleteEvevntticet/:id/:ids", async (req, res) => {
    const { id, ids } = req.params;
    try {
        const data = await EVENT.findById(id);
        removeObjectWithId(data.ticket, ids);

        function removeObjectWithId(arr, id) {
            const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

            if (objWithIdIndex > -1) {
                arr.splice(objWithIdIndex, 1);
            }
            return arr;
        }
        await data.save();
        res.status(200).json("Successfully Deleted");
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error.message);
    }
});

router.put("/updateTrending/:id", async (req, res) => {
    const { id } = req.params;
    const { trending } = req.body;
  
    try {
        const data = await EVENT.findByIdAndUpdate(id, { trending });
        if (data) {
            res
                .status(200)
                .json(
                    trending === true
                        ? "Successfully Added In trending List"
                        : "Successfully Remove In trending List"
                );
        } else {
            res.status(500).json("some Error");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// _________________________________Find all publish events by categary____________________________________

router.get("/comedyEvent", async (req, res) => {
    try {
        const data = await EVENT.find({ categary: "comedy", status: "publish" });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/treandingEvent", async (req, res) => {
    try {
        const data = await EVENT.find({ status: "publish", trending: true }).populate('banner').exec();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ______________________________________find all draft Events_____________________________________________
router.get("/draftedEvent", async (req, res) => {
    try {
        const data = await EVENT.find({ status: "drafted" });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// _________________________find the ticket Types in particular event(by id) ______________________________

router.get("/findticket/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const data = await EVENT.findById(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// /----***************-----------------**************----------------------------**************----------------
router.put("/eventDataPoditionUpdate/:id", async (req, res) => {
    const id = req.params.id;
    const { customId } = req.body;
    try {
        const data1 = await EVENT.findOne({ customId });
        if (data1) {
            const data2 = await EVENT.findByIdAndUpdate(data1.id, { customId: "z" });
            const data = await EVENT.findByIdAndUpdate(id, { customId });
            res.status(200).json(data);
        } else {
            const data = await EVENT.findByIdAndUpdate(id, { customId });
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/eventData123", async (req, res) => {
    try {
        const data = await EVENT.find({ status: "publish", categary: "123" }).sort(
            "customId"
        );
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// /----***************-----------------**************----------------------------**************----------------
// __________banner__________________________
router.post("/footerbanner", upload.single("footerBanner1"), async (req, res) => {
    try {
         let filename = `${Date.now()}-photo-${req.file.originalname}`;
         let params = {
           Bucket: process.env.BUCKET_NAME,
           Key: filename,
           Body: req.file.buffer,
           ContentType: req.file.mimetype,
           ContentEncoding: "base64",
         };

         const command = new PutObjectCommand(params);
         await s3.send(command);
        if (req.file === undefined) {
            return res.status(400).json({ message: "you must select a file." });
        } else {

            //const data = new FooterBANNER({ footerBanner1: req.file.id });
            const data = new FooterBANNER({ filename:filename });
            const datas = await data.save();
            res.status(201).json(datas);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);
router.post("/banner", upload.single("navbarBanner"), async (req, res) => {
    try {
        let filename = `${Date.now()}-photo-${req.file.originalname}`;
        let params = {
          Bucket: process.env.BUCKET_NAME,
          Key: filename,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
          ContentEncoding: "base64",
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);
        if (req.file === undefined) {
            return res.status(400).json({ message: "you must select a file." });
        } else {

            //const data = new BANNER({ navbarBanner: req.file.id });
            const data = new BANNER({ filename:filename });
            const datas = await data.save();
            console.log(datas);
            res.status(201).json(datas);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
        // console.log(error.message);
    }
}
);

router.get("/banner", async (req, res) => {
    try {
        const data = await BANNER.findOne()
            .populate("navbarBanner")
            .exec();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/footerbanner", async (req, res) => {
    try {
        const data = await FooterBANNER.findOne()
            .populate("footerBanner1")
            .exec();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put("/banner/:id", upload.single("navbarBanner"), async (req, res) => {
    const { id } = req.params


    try {
        let filename = `${Date.now()}-photo-${req.file.originalname}`;
             let params = {
               Bucket: process.env.BUCKET_NAME,
               Key: filename,
               Body: req.file.buffer,
               ContentType: req.file.mimetype,
               ContentEncoding: "base64",
             };

             const command = new PutObjectCommand(params);
             await s3.send(command);
         
        if (!req.file) {
            return res.status(400).json({ message: "you must select a file." });
        } else {

            //const data = await BANNER.findByIdAndUpdate(id, { navbarBanner: req.file.id });
            const data = await BANNER.findByIdAndUpdate(id, {
              filename:filename,
            });
            const datas = await data.save();
            res.status(201).json(datas);
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);



router.put("/footerbanner/:id2", upload.single('footerBanner1'), async (req, res) => {
    const { id2 } = req.params
    try {
          let filename = `${Date.now()}-photo-${req.file.originalname}`;
          let params = {
            Bucket: process.env.BUCKET_NAME,
            Key: filename,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
            ContentEncoding: "base64",
          };

          const command = new PutObjectCommand(params);
          await s3.send(command);
        if (!req.file) {
            console.log("y");
            return res.status(400).json({ message: "you must select a file." });
        } else {

           // const data = await FooterBANNER.findByIdAndUpdate(id2, { footerBanner1: req.file.id });
            const data = await FooterBANNER.findByIdAndUpdate(id2, {
              filename:filename
            });
            const datas = await data.save();
            res.status(201).json(datas);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);



module.exports = router;
