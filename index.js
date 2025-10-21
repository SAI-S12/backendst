import express from "express"
import  router  from "./Router/router.js";
import mongoose from "mongoose";
import cors from "cors"
import helmet from "helmet";
import morgan from "morgan";
import bodyparser from "body-parser"
import dotenv from"dotenv"
const app=express(); 
const port=process.env.PORT || 4000;
dotenv.config()
app.use(cors());
app.use(bodyparser.json())
app.use(express.json())
 // Required for JSON body parsing
app.use(express.urlencoded({ extended: true })); // Optional for form data
 // Allow cross-origin requests
app.use(helmet()); // Security headers
app.use(morgan('dev')); 
mongoose.connect(process.env.MONGOURI)
.then(()=>{
    console.log('====================================');
    console.log("mongodb connected ");
    console.log('====================================');
})
.catch(()=>{
    console.log('====================================');
    console.log("dtabase not connect");
    console.log('====================================');
})
app.use("/call",router)
app.use("/",(req,res)=>{
  res.send("backend activated mana fucker ")
})


app.listen(port,()=>{ 
    console.log("server runinng on port:4000");
})
