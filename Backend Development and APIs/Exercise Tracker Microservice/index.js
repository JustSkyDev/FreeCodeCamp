const express = require("express");
const cors = require("cors");
const dns = require("dns");
const mongoose = require("mongoose");
const urlParser = require("url");
const routes = require("./routes/route");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb+srv://JustSkyDev001:puk2rnbYwh4sBf3q@elgatedatasbase.mtw7tmb.mongodb.net/UserExercise?retryWrites=true&w=majority";

// Middleware
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/public", express.static(`${process.cwd()}/public`));

// API Endpoint
// Root/Default
app.get("/", (req, res) => res.sendFile(process.cwd() + "/views/index.html"));
app.use("/api", routes);
app.use("/", (_, res) => res.sendStatus(404));

(async () => {
  await mongoose.connect(MONGO_URL);
  await console.log("Database connected");
  await app.listen(PORT, () => console.log("Your app running on PORT:", PORT));
})();
