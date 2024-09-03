import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from 'body-parser'
import AdminRoute from "./router/AdminRoute.js";
import VehicalRoute from "./router/VehicleRouter.js"
import ServiceRoute from "./router/ServiceRoute.js";
import ItemRoute from './router/ItemRoute.js'



dotenv.config()

const app = express()
const port = process.env.PORT || 8000
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));



app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true // Allow cookies and authorization headers with credentials
  }));
  

const corsOption = {
    origin:true
}

app.listen(port,()=>{
    console.log('server is running '+port)
})

//database connection
const URL = process.env.MONGO_URL;


mongoose.connect(URL, {
 
}); 

const connection = mongoose.connection;
connection.once("open", () =>{
    console.log("MongoDb connection sucessfull");
})


//routes

app.use('/admins', AdminRoute)
app.use('/vehical', VehicalRoute)
app.use('/service', ServiceRoute)
app.use('/item', ItemRoute)





