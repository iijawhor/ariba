import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import { app } from "./app.js";
dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 7000);
    console.log(`Server is runing at port : ${process.env.PORT}`);
  })

  .catch((error) => {
    console.log("Mongo DB connection failed  !! ", error);
  });
