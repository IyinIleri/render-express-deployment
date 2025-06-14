require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");
const userRouter = require("./routes/userRoute");


const app = express();
const PORT = 8000

mongoose.connect(process.env.mongoDB_URI)
  .then(()=> console.log("Database connected succesfully"))
  .catch((err)=> console.log(err));

app.use(express.json());
//  consume the route 
app.use("/", userRouter)


app.use(errorHandler);
  app.listen(PORT, ()=> {
    console.log(`App is running on port ${PORT}`)
  })