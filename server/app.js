require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const eventRoutes = require("./router/event");
const authRoutes = require("./router/auth");
const userRoutes = require("./router/users");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const https = require("https");

const connection = require("./db");
const Grid = require("gridfs-stream");

let gfs, gridFsBucket;
connection();
const conn = mongoose.connection;
conn.once("open", function () {
  // Add this line in the code
  gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "documents",
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("documents");
});

dburl = process.env.MONGODB_URL;

const cors = require("cors");
const corsOptions = {
  //origin: ["https://backend.lucknowjunction.com", "https://lucknowjunction.com"],
  origin: ["http://localhost:5000", "http://localhost:3000"],
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, PUT,POST,DELETE ",
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use("/api/admin", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.use((error, req, res, next) => {
  console.log(error.message);
  const status = error.statusCode || 500;
  if (error.statusCode === 500) {
    error.message;
  }
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(dburl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("your server db  is start bro...🤗🤗🤗🤗");
  });

// https
//   .createServer(options,
//     app
//   )
//   .listen(process.env.PORT || 5000);

app.listen(process.env.PORT, () => {
  console.log(`server is running on the port ${process.env.PORT}....`);
});
