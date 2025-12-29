import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USERNAME = process.env.MONGO_USERNAME;
const PASSWORD = process.env.MONGO_PWD;

const Connection = async () => {
  const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@webchat.wznkzht.mongodb.net/?appName=WebChat`;
  try {
    console.log("Connecting to the database...");
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting to the database", error);
  }
};

export default Connection;
