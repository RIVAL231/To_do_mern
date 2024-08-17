import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import listRoutes from "./routes/list.js";
import { register } from "./controllers/auth.js";
import mongoose from "mongoose";
dotenv.config();
const app = express();

// Setup CORS to allow requests from your frontend
app.use(
  cors({
    origin: 'https://to-do-mern-frontend-ten.vercel.app', // Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.post("/auth/register", register);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/list", listRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
