const User = require("../models/User.model");

module.exports = async (req, res) => {
  const _id = req.params["_id"];
  const { from: fromDate, to: toDate, limit } = req.query;

  try {
    const DB = await User.findById(_id);

    if (!DB) return res.sendStatus(404);

    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    let filteredLog = DB.log.filter((exercise) => {
      const exerciseDate = new Date(exercise.date);
      if (from && to) return exerciseDate >= from && exerciseDate <= to;
      else if (from) return exerciseDate >= from;
      else if (to) return exerciseDate <= to;
      else return true;
    });

    if (limit) filteredLog = filteredLog.slice(0, limit);

    return res.json({
      _id,
      username: DB.username,
      count: filteredLog.length,
      log: filteredLog.map((data) => ({
        description: data.description,
        duration: Number(data.duration),
        date: data.date,
      })),
    });
  } catch (error) {
    console.error(error);
  }
};
