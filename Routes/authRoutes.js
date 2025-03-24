import { Router } from "express";
import { signUp } from "../Controller/authController.js";


const authRoutes = Router();


// Image upload route
// authRoutes.post("/uploads", uploadSingle, uploadImage);


authRoutes.post('/', signUp);


export default authRoutes;