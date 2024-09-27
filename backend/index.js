import express from "express";
import dotenv from "dotenv";
import dbConnect from "./utils/dbConnect.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

//dotenv configurations
dotenv.config({
  path: ".env",
});

//database connection
dbConnect();

//app build
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

//apis
app.use("/api/v1/users", userRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
