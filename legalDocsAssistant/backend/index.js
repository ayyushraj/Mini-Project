/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import getQuestionsRoute from "./routes/getQuestions.js";


const app = express();
app.use(cors());
app.use(express.json());

const mongoUrl = `mongodb+srv://commonUser:OpmJ5VkbcM9xEQcO@cluster0.sqtcm42.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use("/getQuestions", getQuestionsRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
