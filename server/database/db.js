import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USERNAME = process.env.MONGO_USERNAME;
const PASSWORD = process.env.MONGO_PWD;

const Connection = async () => {
  const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@webchat.wznkzht.mongodb.net/webchat?appName=WebChat`;

  try {
    console.log("Connecting to the database...");
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
    });

    console.log("DB NAME:", mongoose.connection.name);
    console.log("DB HOST:", mongoose.connection.host);

    console.log("Database connected successfully:", mongoose.connection.name);
  } catch (error) {
    console.log("Error while connecting to the database", error);
  }
};

export default Connection;
