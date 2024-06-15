import "dotenv/config";

import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import lessonRoutes from "./routes/lessons.js";
import userRoutes from "./routes/user.js";

const app = express();

app.use(express.json());

app.use(cors())

app.use((req, res, next) => {
  console.log(`Path:${req.path}`, `using method ${req.method}`);
  next();
});

app.use("/api/lessons", lessonRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    
    app.listen(process.env.PORT, () => {
      console.log("connecting to db and listening port 8085!!!");
    });

  })
  .catch((error)=>{
    console.log(error);
  })


