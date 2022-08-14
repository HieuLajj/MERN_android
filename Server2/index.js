const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
require('./models/db');
const router = require("express").Router();

app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan("common"));
const User = require('./models/user')
const userRoute = require("./routes/user_route");
const expenseRoute = require("./routes/expense_route")
const chatRoute = require("./routes/chatRoutes")
const messageRoute = require("./routes/messageRoutes")
//require('./models/User');
dotenv.config();

app.use(express.json());
app.get('/',(req,res)=>{
  res.json({success: true, message:" Welcome to backend zone!"});
})



// const test = async (email,password)=>{
//   const user = await User.findOne({email:email});
//   if (!user) {
//     throw new CustomError.UserNotFound();
//   }
//   const result = await user.comparePassword(password);
//   console.log(result);
// }
// test('laivanhieu@gmail.com','12112000');


//ROUTER
app.use("/laihieu/user",userRoute);
app.use("/laihieu/expense",expenseRoute);
app.use("/laihieu/chat",chatRoute);
app.use("/laihieu/message",messageRoute);



// app.post('/create-ser',userController.add_user);
app.listen(8000,()=>{
    console.log("Server is running...");
})