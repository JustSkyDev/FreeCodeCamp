const express = require("express");
const cors = require("cors");
const routes = require("./routes/route");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/public", express.static(`${process.cwd()}/public`));

// API Endpoint
// Root/Default
app.get("/", (req, res) => res.sendFile(process.cwd() + "/views/index.html"));
app.use("/api", routes);
app.use("/", (_, res) => res.sendStatus(404));

app.listen(PORT, () => console.log("Your app running on PORT:", PORT));
