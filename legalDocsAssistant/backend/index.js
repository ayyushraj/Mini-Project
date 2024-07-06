/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import QuestionsRoute from "./routes/QuestionsRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import ResponseRoute from "./routes/ResponseRoute.js";
import dotenv from "dotenv";

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

const mongoUrl = process.env.MONGOURL;
mongoose.connect(mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use("/questions", QuestionsRoute);
app.use("/auth", AuthRoute);
app.use("/response", ResponseRoute);


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
