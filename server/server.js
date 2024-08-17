import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import {register} from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";
import user from "./models/user.js";
import listRoutes from "./routes/list.js";
import List from "./models/lists.js";



const app = express();
dotenv.config();


app.use(cors(),
 {
  origin: ["http://localhost:3000", "https://to-do-mern-nine.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE"],
 }

);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/auth/register", register);
app.use("/auth", authRoutes);
app.use("/user",userRoutes);
app.use("/list",listRoutes);


mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log(err);});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


