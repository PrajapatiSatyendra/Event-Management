const AWS = require("aws-sdk");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require('dotenv').config();




const storage = multer.memoryStorage();
module.exports = multer({ storage: storage });

