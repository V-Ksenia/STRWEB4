import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/Auth.js";
import userRoute from "./routes/User.js";
import tourRoute from "./routes/Tour.js";
import orderRoute from "./routes/Order.js";
import reviewRoute from "./routes/Review.js";
import cookieParser from 'cookie-parser';


const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});


app.use(cors({
  origin: "http://localhost:3000", // URL вашего React-приложения
  credentials: true // Для работы с куками
}));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Подключение роутеров
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/tours", tourRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);


app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});


app.listen(8080, () => {
  connect();
  console.log(`Server is running on port 8080.`);
});
