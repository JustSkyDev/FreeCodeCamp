const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const LogsSchema = new mongoose.Schema({
  description: String,
  duration: Number,
  date: String,
});
const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
  },
  date: String,
  duration: Number,
  description: String,
  logs: [LogsSchema],
});

const User = new mongoose.model("UserExercise", UserSchema);

module.exports = User;
