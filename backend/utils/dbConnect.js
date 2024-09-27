import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({
  path:"./env"
})

const dbConnect = async () => {
  await mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Database has been successfully connected")
  }).catch((error) => {
    console.log("An error has been occured during database connection", error);
  })
};

export default dbConnect;
