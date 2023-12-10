const User = require("../models/User.model");

module.exports = async (req, res) => {
  const _id = req.params["_id"];
  const { description, duration, date } = req.body;

  try {
    const DB = await User.findById(_id);

    if (!DB) return res.sendStatus(404);

    const ParsedDate = (inputDate) => {
      if (/^\d+$/.test(inputDate)) return new Date(Number(inputDate));
      else return new Date(inputDate);
    };

    await User.findOneAndUpdate(
      {
        _id,
      },
      {
        $push: {
          logs: {
            description,
            duration,
            date: ParsedDate(date).toDateString(),
          },
        },
      },
      {
        new: true,
      }
    );

    return res.json({
      _id,
      description,
      duration,
      date: ParsedDate(date).toDateString(),
    });
  } catch (error) {
    console.error(error);
  }
};
