import express from "express";

import dotenv from "dotenv"
dotenv.config();
import {createServer} from "node:http";//connects express server and socket user
import {Server} from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import cors from "cors";


import userRoutes from "./routes/user.routes.js"
const app = express();




const server=createServer(app);
const io=connectToSocket(server)

app.set("port", (process.env.PORT || 5000))

app.use(
  cors: {
    origin: "*",
    methods: ["GET", "POST","PUT","DELETE"],
    allowedHeaders: ["*"],
    credentials: true
}
  );
  
app.use(express.json({limit:"40kb", extended:true}))
app.use(express.urlencoded({limit:"40kb" , extended:true}))


// routes
app.use("/api/v1/users",userRoutes)




const start=async()=>{
    app.set("Mongo_user")
    const connectDB= await mongoose.connect(process.env.MONGO_CONNECT);
console.log(`Connected DB host : ${connectDB.connection.host}`)
    server.listen(app.get("port"),()=>{
        console.log("Server is running on port 8000");
    })
    
}
start();

