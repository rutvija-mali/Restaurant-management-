import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv";
import express from 'express'
import UserRouter from "./routes/User.js";
import OrderRouter from "./routes/Orders.js";
import TableRouter from "./routes/Table.js";
import MenuRouter from "./routes/Menu.js";
import ChefRouter from "./routes/Chef.js";
import  './orderStatusScheduler.js'


dotenv.config({ path: "./.env.development" });

const port = process.env.PORT||5000
const app = express()

app.use(express.json())
const allowedOrigins = ['http://localhost:5173','http://localhost:5174','https://restaurant-management-b6gd.vercel.app','https://restaurant-management-dzmi.vercel.app'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.urlencoded({extended:true}))

app.use('/api/user',UserRouter)
app.use('/api/table',TableRouter)
app.use("/api/orders",OrderRouter)
app.use("/api/menu",MenuRouter)
app.use('/api/chef',ChefRouter)

const connectToMongoDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to mongodb");
        
    } catch (error) {
       console.log(error);
        
    }
}

connectToMongoDb();

app.listen(port,()=>{
  console.log(`App is listening to port ${port}`);
  
})

