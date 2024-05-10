import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionIndex: {
    type: Number,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  }
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
