const User = require("../models/User.model");

module.exports = async (req, res) => {
  try {
    const DB = await User.find();
    return res.json(
      DB.map((data) => ({
        _id: data._id,
        username: data.username,
        __v: data.__v,
      }))
    );
  } catch (error) {
    console.error(error);
  }
};
