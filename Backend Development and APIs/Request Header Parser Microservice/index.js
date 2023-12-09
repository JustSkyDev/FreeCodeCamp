// Main Code index.js

// Call the Express and Express APP
const express = require("express");
const app = express();

// Port
const PORT = process.env.PORT || 3000;

// Enabling the cors
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// Express Static
app.use(express.static("public"));

// Express trust proxy
app.enable("trust proxy"); // to get the original IP

// API Endpoint
// Root/Default
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// /api/:date? Endpoint
app.get("/api/whoami", (req, res) => {
  const ipaddress = req.ip;
  const language = req.headers["accept-language"];
  const software = req.headers["user-agent"];

  return res.json({
    ipaddress,
    language,
    software,
  });
});

// Listen the server to port PORT
app.listen(PORT, () => console.log("Your app running on PORT:", PORT));
