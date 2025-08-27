import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/Auth.js";
import competitionRouter from "./routes/Competition.js";
import userRouter from "./routes/User.js";
import adminRouter from "./routes/Admin.js";
dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/competition", competitionRouter);
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connected");

    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

startServer();
