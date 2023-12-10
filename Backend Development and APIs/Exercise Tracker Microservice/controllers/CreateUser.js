const { default: mongoose } = require("mongoose");
const User = require("../models/User.model");

module.exports = async (req, res) => {
  const { username } = req.body;

  try {
    const DB = new User({
      _id: new mongoose.Types.ObjectId(),
      username,
    });
    await DB.save();

    return res.json({
      username,
      _id: DB._id,
    });
  } catch (error) {
    console.error(error);
  }
};
