import { DB_NAME } from "../utils/constants.js";
// import mongoose from "mongoose";
// const connectDB = async () => {
//   try {
//     const connectionInstance = await mongoose.connect(
//       `${process.env.MONGODB_URI}/${DB_NAME}`
//     );
//     console.log(
//       `\n MongoDb connected !! DB HOST :${connectionInstance.connection.host}`
//     );
//   } catch (error) {
//     console.log("MONGODB connection error ", error);
//     process.exit(1);
//   }
// };
// export { connectDB };
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(
      `MongoDB connected! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MONGODB connection error:", error.message);
    process.exit(1);
  }
};

export { connectDB };
