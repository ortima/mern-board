import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import transactionRoutes from "./routes/transaction.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api", authRoutes);
app.use("/api", transactionRoutes);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to MERN Store");
});

const startServer = async () => {
  console.log("Starting server...");
  console.log("Connecting to database...");
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

startServer();
