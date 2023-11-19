import mongoose from "mongoose";
import dbConfig from "../../../config/database";

class MongoClient {
  constructor() {
    mongoose.set("strictQuery", false);
  }

  public connect() {
    mongoose.connect(dbConfig.url, () => {
      console.log("Connected to database");
    });
  }

  public async disconnect() {
    await mongoose.connection.close();
  }
}

export default new MongoClient();
