const Events = require('../model/Event');
const connection = require("../db");
const Grid = require("gridfs-stream");
const mongoose = require('mongoose');
require("../model/documents.files");

let gfs, gridFsBucket;
connection();

const conn = mongoose.connection;
conn.once("open", function () {
  gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "documents",
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("documents");
});

exports.getEventsByCategories = async (req, res, next) => {
  try {
    const { category } = req.body;
    const data = await Events
      .find({ status: "publish", categary: category })
      .sort("customId")
      .populate('banner')
      .exec();

    if (!data) {
      const error = new Error("No events found for this category!");
      error.statusCode = 404;
      throw error;
    }
    console.log(data);
    res.status(200).json({ message: "fetched successfully", data: data });
  } catch (error) {
    next(error);
  }
};


exports.getImage = async (req, res, next) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gridFsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    res.send("not found");
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Events.findById(id)
      .populate([
        { path: "banner" },
        {
          path: "ticket",
          populate: { path: "customersId", model: "bookedtickets" },
        },
      ])
      .exec();

    if (!data) {
      const error = new Error("No event found for this id!");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "fetched successfully", data: data });
  } catch (error) {
    next(error);
  }
};