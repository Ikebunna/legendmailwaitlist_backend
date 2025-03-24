import express from "express";
import { createConnection } from "mysql";
import dotenv from 'dotenv';
import authRoutes from "./Routes/authRoutes.js";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';


dotenv.config();

const prisma = new PrismaClient();
const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());  // Initialize cookie parser
app.use(express.json());



export const db = createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})


db.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected...")
        
    }

})

app.use(express.json());
app.use("/api/auth", authRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
