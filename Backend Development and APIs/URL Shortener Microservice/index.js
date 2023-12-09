const express = require("express");
const cors = require("cors");
const dns = require("dns");
const mongoose = require("mongoose");
const urlParser = require("url");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

// Middleware
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/public", express.static(`${process.cwd()}/public`));

const ShortURLSchema = mongoose.Schema({
  url: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  short_number: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
});
const ShortURL = mongoose.model("shorturl", ShortURLSchema);

let currentURLNumber;

// API Endpoint
// Root/Default
app.get("/", (req, res) => res.sendFile(process.cwd() + "/views/index.html"));

// /api/shorturl Endpoint
app.post("/api/shorturl", (req, res) => {
  const url = req.body.url;

  dns.lookup(urlParser.parse(url).hostname, async (err, address) => {
    if (!address) res.json({ error: "invalid url" });

    const currentURLNumberDoc = await ShortURL.find()
      .sort({
        short_number: -1,
      })
      .limit(1);

    if (currentURLNumberDoc[0]) {
      currentURLNumber = currentURLNumberDoc[0].short_number;
    } else {
      currentURLNumber = 0;
    }
    const DB = new ShortURL({
      url,
      short_number: currentURLNumber + 1,
    });

    await DB.save();
    return res.json({
      original_url: url,
      short_url: currentURLNumber + 1,
    });
  });
});

app.get("/api/shorturl/:urlId", async (req, res) => {
  const { urlId } = req.params;
  const DB = await ShortURL.findOne({
    short_number: urlId,
  });

  console.log(DB);
  if (DB) await res.redirect(DB.url);
  else res.sendStatus(404);
});

(async () => {
  await mongoose.connect(MONGO_URL);
  await console.log("Database connected");
  await app.listen(PORT, () => console.log("Your app running on PORT:", PORT));
})();
