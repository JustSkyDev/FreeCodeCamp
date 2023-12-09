const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use("/public", express.static(`${process.cwd()}/public`));

// API Endpoint
// Root/Default
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
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
