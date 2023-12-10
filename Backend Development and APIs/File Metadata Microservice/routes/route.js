const express = require("express");
const multer = require("multer");
const FileAnalyse = require("../controllers/FileAnalyse");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/fileanalyse", upload.single("upfile"), FileAnalyse);

module.exports = router;
