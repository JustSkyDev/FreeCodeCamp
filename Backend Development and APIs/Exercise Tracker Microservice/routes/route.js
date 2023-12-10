const express = require("express");
const CreateUser = require("../controllers/CreateUser");
const GetUser = require("../controllers/GetUser");
const GetLogs = require("../controllers/GetLogs");
const AddExercise = require("../controllers/AddExercise");
const router = express.Router();

router.get("/users", GetUser);
router.get("/users/:_id/logs", GetLogs);
router.post("/users/:_id/exercises", AddExercise);
router.post("/users", CreateUser);

module.exports = router;
