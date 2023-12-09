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

// API Endpoint
// Root/Default
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// /api/:date? Endpoint
app.get("/api/:date?", (req, res) => {
  let { date } = req.params;

  // If no date is provided, use the current date.
  if (!date) {
    const current = new Date();
    return res.json({
      unix: current.getTime(),
      utc: current.toUTCString(),
    });
  }

  // Check if date is a Unix timestamp (i.e., it's a number)
  if (!isNaN(date)) date = parseInt(date);

  const parsedDate = new Date(date);

  // Check if the date is valid
  if (isNaN(parsedDate.getTime())) {
    return res.json({
      error: "Invalid Date",
    });
  } else {
    return res.json({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString(),
    });
  }
});

// Listen the server to port PORT
app.listen(PORT, () => console.log("Your app running on PORT:", PORT));
